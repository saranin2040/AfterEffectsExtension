const fs = require('fs');
const path = require('path');

class AfterEffects {
    // Заготовка для методов, которые вы должны будете реализовать в классе
    loadTranslations(filePath) { /* ... */ }
    findCompositionByName(name) { /* ... */ }
    importFile(filePath) { /* ... */ }
    addLayerToComposition(comp, layer, startTime = 0, endTime = null) { /* ... */ }
    duplicateComposition(comp) { /* ... */ }
    setTextLayerValue(comp, layerName, text) { /* ... */ }
    addImageLayer(comp, imagePath, startTime, duration) { /* ... */ }
    beginUndoGroup(name) { /* ... */ }
    endUndoGroup() { /* ... */ }
    getCurrentComposition() { /* ... */ }
    openCompositionInViewer(comp) { /* ... */ }
    alert(message) { /* ... */ }
}

function selectFolderDialog(prompt) {
    const selectedFolder = path.resolve(prompt); // Замените на ваш диалог выбора папки
    if (fs.existsSync(selectedFolder) && fs.lstatSync(selectedFolder).isDirectory()) {
        return selectedFolder;
    }
    return null;
}

function processAfterEffectsProject() {
    const ae = new AfterEffects();

    // 1. Выбор папки пользователем
    const selectedFolder = selectFolderDialog("Select a folder containing 'Audio' and 'Pictures' folders");
    if (!selectedFolder) {
        ae.alert("No folder selected.");
        return;
    }

    // 2. Проверка существования папок Audio и Pictures
    const audioFolder = path.join(selectedFolder, 'Audio');
    const picturesFolder = path.join(selectedFolder, 'Pictures');

    if (!fs.existsSync(audioFolder) || !fs.existsSync(picturesFolder)) {
        ae.alert("Both 'Audio' and 'Pictures' folders must exist in the selected directory.");
        return;
    }

    // 3. Чтение перевода и загрузка аудио
    const englishAudioFile = path.join(audioFolder, 'English.wav');
    const translations = ae.loadTranslations("C:/Users/aldan/AppData/Local/Programs/Python/Python312/saves/translations.jsx");

    if (!fs.existsSync(englishAudioFile) || !translations) {
        ae.alert("English.wav or translations not found.");
        return;
    }

    // 4. Поиск композиции Translate Scene
    const translateComp = ae.findCompositionByName("Translate Scene");
    if (!translateComp) {
        ae.alert("Translate Scene composition not found.");
        return;
    }

    // 5. Обработка всех аудиофайлов
    const audioFiles = fs.readdirSync(audioFolder).filter(file => {
        return file.match(/\.(wav|mp3)$/i) && file !== "English.wav";
    });

    if (audioFiles.length === 0) {
        ae.alert("No audio files found in the 'Audio' folder.");
        return;
    }

    ae.beginUndoGroup("Import Audio, Compositions, and PNGs");
    const comp = ae.getCurrentComposition();
    if (!comp) {
        ae.alert("Please select a composition first.");
        ae.endUndoGroup();
        return;
    }

    let currentTime = 0;
    for (let i = 0; i < audioFiles.length; i++) {
        const audioFile = path.join(audioFolder, audioFiles[i]);

        // Импорт и добавление English.wav
        const importedEnglishAudio = ae.importFile(englishAudioFile);
        ae.addLayerToComposition(comp, importedEnglishAudio, currentTime);

        const englishDuration = importedEnglishAudio.duration;
        currentTime += englishDuration + 0.3;

        // Импорт и добавление текущего аудиофайла
        const importedAudio = ae.importFile(audioFile);
        ae.addLayerToComposition(comp, importedAudio, currentTime);

        const audioDuration = importedAudio.duration;
        currentTime += audioDuration;

        // Дублирование композиции Translate Scene
        const audioFileName = path.basename(audioFile, path.extname(audioFile));
        const newComp = ae.duplicateComposition(translateComp);
        newComp.name = `Translate Scene ${audioFileName}`;
        ae.addLayerToComposition(comp, newComp, currentTime - audioDuration, currentTime);

        // Обновление текстовых слоев в дублированной композиции
        ae.openCompositionInViewer(newComp);
        ae.setTextLayerValue(newComp, "top left", "English");
        ae.setTextLayerValue(newComp, "top right", audioFileName);
        ae.setTextLayerValue(newComp, "bottom left", translations["English"]);
        ae.setTextLayerValue(newComp, "bottom right", translations[audioFileName]);

        ae.openCompositionInViewer(comp);

        // Импорт и добавление соответствующего изображения
        const correspondingImageFile = path.join(picturesFolder, `${audioFileName}.png`);
        if (fs.existsSync(correspondingImageFile)) {
            ae.addImageLayer(comp, correspondingImageFile, currentTime, 5);
            currentTime += 5;
        }
    }

    ae.endUndoGroup();
}
