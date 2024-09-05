//import { AfterEffects } from "../../../../AfterEffects/js/AfterEffects";

const AfterEffects = require("C:/Program Files (x86)/Common Files/Adobe/CEP/extensions/Language cep/src/AfterEffects/js/AfterEffects");
const fs = require('fs');
const path = require('path');

 class BusinessLogic {


    findFolder(basePath, nameFolder) {
        console.log("basePath: "+basePath);
        try {
            const items = fs.readdirSync(basePath);
            
            console.log(items);
            
            for (let item of items) {
                const itemPath = path.join(basePath, item);
                console.log("номер: "+item);
                console.log("путь: "+itemPath);
                console.log(item.toLowerCase()+" vs "+nameFolder);

                
                // Проверяем, является ли элемент папкой и называется ли она "Audio"
                if (fs.statSync(itemPath).isDirectory() && item === nameFolder) {
                    return itemPath;  // Возвращаем полный путь к папке Audio
                }
            }
    
            // Если папка не найдена
            return null;
        } catch (error) {
            console.error("Error:", error.message);
            return null;
        }
    }

    pasteLanguagesMaterials(workFolderPath) 
    {
        var audioFiles;

        const translations = this.#getTranslations('C:\\Users\\aldan\\AppData\\Local\\Programs\\Python\\Python312\\saves\\translations.json');

      //  const audioFolder = path.join(workFolderPath, 'Audio');
        const audioFolder = this.findFolder(workFolderPath, 'Audio');

        const picturesFolder = path.join(workFolderPath, 'Pictures');
        
        const mainAudioFile = path.join(audioFolder, 'English.mp3');
        
        this.#validityCheck(translations,audioFolder,picturesFolder,mainAudioFile);
        

        audioFiles = fs.readdirSync(audioFolder).filter(file => {
            return file.match(/\.(wav|mp3)$/i) && file !== "English.mp3";
        });
        

        if (audioFiles.length === 0) {
            throw new Error("No.. noooo... NOOOOOOOOO!!!! THESE AUDIO FILES dont exist in the 'Audio' folder, brooo");
        }
        
        this.#pasteLanguagesMaterials_exAsync(audioFiles,translations,audioFolder,picturesFolder,mainAudioFile);
    }

    async #pasteLanguagesMaterials_exAsync(audioFiles,translations,audioFolder,picturesFolder,mainAudioFile)
    {
        const ae = new AfterEffects();

        var compId;
        

        var translateComp = await ae.findCompositionByName(this.compositions.translateComp);
        var translationHitLeft = await ae.findCompositionByName(this.compositions.translationHitLeft);
        
        if (!translateComp) {
            throw new Error("I donna want to swear on you:( But you forgot add 'Translation scene' ;( im sorry, my friend");
        }

        await ae.beginUndoGroup(this.undoGroups.buildLanguageVideo);

        compId = await ae.getCurrentComposition();

        if (compId===null)
        {
            alert("you're high on marijuana, you want to generate a video on nothing WITHOUT SELECTING a COMPOSITION!!!!!");
            await ae.endUndoGroup();
            return;
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        
        // Пример использования:
        shuffleArray(audioFiles);
        

        let currentTime = 0;
        for (let i = 0; i < audioFiles.length; i++) {
            const audioFile = path.join(audioFolder, audioFiles[i]);
            const audioFileName = path.basename(audioFile, path.extname(audioFile));

            // Импорт и добавление English.wav
            const importedMainAudio = await ae.importFile(mainAudioFile);//+\
            const englishDuration = await ae.getDurationFile(importedMainAudio);
            var startTime_ImportedMainAudioLayer = currentTime;

            var importedMainAudioLayer = await ae.addLayerToComposition(compId, importedMainAudio, currentTime,currentTime,currentTime+englishDuration);


            var startPositionAnimation = currentTime + englishDuration;
            var endPositionAnimation = startPositionAnimation+0.5;
            currentTime += englishDuration + 0.5;
            

            const importedAudio = await ae.importFile(audioFile);
            const audioDuration = await ae.getDurationFile(importedAudio);

            var importedAudioLayer = await ae.addLayerToComposition(compId, importedAudio, currentTime,currentTime,currentTime+audioDuration);
            
            
            currentTime += audioDuration;

        // // Дублирование композиции Translate Scene
            

            const newComp = await ae.duplicateComposition(translateComp,`Translate Scene ${audioFileName}`);
            
            const newCompLayer = await ae.addLayerToComposition(compId, newComp, startTime_ImportedMainAudioLayer, startTime_ImportedMainAudioLayer, currentTime);
            await ae.setKeyPostionAnimation(compId,newCompLayer,1850,400,startPositionAnimation);
            await ae.setKeyPostionAnimation(compId,newCompLayer,145,400,endPositionAnimation);
            await ae.setKeyScaleAnimation(compId,newCompLayer,197,197,0,0,33,0,33);

        // // Обновление текстовых слоев в дублированной композиции
            await ae.openCompositionInViewer(newComp);
            await ae.setTextLayerValue(newComp, "top left", "English",null);
            await ae.setTextLayerValue(newComp, "top right", audioFileName,null);
            await ae.setTextLayerValue(newComp, "bottom left", translations["English"],null);
            await ae.setTextLayerValue(newComp, "bottom right", translations[audioFileName],this.fonts[audioFileName]);

            await ae.openCompositionInViewer(compId);

            var startTransition = startTime_ImportedMainAudioLayer - 0.36;
            await ae.addLayerToComposition(compId, translationHitLeft, startTransition,startTransition,startTransition+1.63);


            // Импорт и добавление соответствующего изображения
            const correspondingImageFile = path.join(picturesFolder, `${audioFileName}.png`);
            const infMusic = this.#getMusic(audioFileName);
            
            if (fs.existsSync(correspondingImageFile)) {
                const correspondingImage = await ae.importFile(correspondingImageFile);
                const correspondingImageLayer = await ae.addLayerToComposition(compId, correspondingImage, currentTime, currentTime,currentTime+5);
                
                
              //  alert(6);
                await ae.setKeyScaleAnimation(compId,correspondingImageLayer,250,250,currentTime,0,16,2.5,53);
                await ae.setKeyScaleAnimation(compId,correspondingImageLayer,100,100,currentTime+3,2.5,42,0,16);
                await ae.setKeyRotationAnimation(compId,correspondingImageLayer,this.#getRandomAngle(),currentTime,16,53);
                await ae.setKeyRotationAnimation(compId,correspondingImageLayer,0,currentTime+3,43,16);
                
                

                const music = await ae.importFile(infMusic.pathToFile);
                await ae.addLayerToComposition(compId, music, currentTime-infMusic.startTime, currentTime,currentTime+5);


                currentTime += 5;
            }
        }

        await ae.endUndoGroup();

        alert("cooooooooooooooooooooooooooool: ");

        //await ae.addText();
    }

    async #pasteEachByEachLanguagesMaterials_exAsync(audioFiles,translations,audioFolder,picturesFolder,mainAudioFile)
    {


        const basePath = "C:\\Users\\aldan\\AppData\\Local\\Programs\\Python\\Python312\\saves\\huy\\";

        const paths = {
            Afrikaans: `${basePath}Afrikaans.mp3`,
            Albanian: `${basePath}Albanian.mp3`,
            Amharic: `${basePath}Amharic.mp3`,
            Arabic: `${basePath}Arabic.mp3`,
            Azerbaijani: `${basePath}Azerbaijani.mp3`,
            Bangla: `${basePath}Bangla.mp3`,
            Bosnian: `${basePath}Bosnian.mp3`,
            Burmese: `${basePath}Burmese.mp3`,
            Catalan: `${basePath}Catalan.mp3`,
            Chinese: `${basePath}Chinese.mp3`,
            Croatian: `${basePath}Croatian.mp3`,
            Czech: `${basePath}Czech.mp3`,
            Danish: `${basePath}Danish.mp3`,
            Dutch: `${basePath}Dutch.mp3`,
            English: `${basePath}English.mp3`,
            Estonian: `${basePath}Estonian.mp3`,
            Filipino: `${basePath}Filipino.mp3`,
            Finnish: `${basePath}Finnish.mp3`,
            French: `${basePath}French.mp3`,
            Georgian: `${basePath}Georgian.mp3`,
            German: `${basePath}German.mp3`,
            Greek: `${basePath}Greek.mp3`,
            Hebrew: `${basePath}Hebrew.mp3`,
            Hindi: `${basePath}Hindi.mp3`,
            Hungarian: `${basePath}Hungarian.mp3`,
            Icelandic: `${basePath}Icelandic.mp3`,
            Indonesian: `${basePath}Indonesian.mp3`,
            Irish: `${basePath}Irish.mp3`,
            Italian: `${basePath}Italian.mp3`,
            Japanese: `${basePath}Japanese.mp3`,
            Kannada: `${basePath}Kannada.mp3`,
            Kazakh: `${basePath}Kazakh.mp3`,
            Khmer: `${basePath}Khmer.mp3`,
            Korean: `${basePath}Korean.mp3`,
            Latin: `${basePath}Latin.mp3`,
            Latvian: `${basePath}Latvian.mp3`,
            Lithuanian: `${basePath}Lithuanian.mp3`,
            Malay: `${basePath}Malay.mp3`,
            Maltese: `${basePath}Maltese.mp3`,
            Marathi: `${basePath}Marathi.mp3`,
            Mongolian: `${basePath}Mongolian.mp3`,
            Nepali: `${basePath}Nepali.mp3`,
            Norwegian: `${basePath}Norwegian.mp3`,
            Persian: `${basePath}Persian.mp3`,
            Polish: `${basePath}Polish.mp3`,
            Portuguese: `${basePath}Portuguese.mp3`,
            Romanian: `${basePath}Romanian.mp3`,
            Russian: `${basePath}Russian.mp3`,
            Serbian: `${basePath}Serbian.mp3`,
            Sinhala: `${basePath}Sinhala.mp3`,
            Slovak: `${basePath}Slovak.mp3`,
            Slovenian: `${basePath}Slovenian.mp3`,
            Spanish: `${basePath}Spanish.mp3`,
            Sundanese: `${basePath}Sundanese.mp3`,
            Swahili: `${basePath}Swahili.mp3`,
            Sweden: `${basePath}Sweden.mp3`,
            Tamil: `${basePath}Tamil.mp3`,
            Telugu: `${basePath}Telugu.mp3`,
            Thai: `${basePath}Thai.mp3`,
            Turkish: `${basePath}Turkish.mp3`,
            Ukrainian: `${basePath}Ukrainian.mp3`,
            Urdu: `${basePath}Urdu.mp3`,
            Uzbek: `${basePath}Uzbek.mp3`,
            Vietnamese: `${basePath}Vietnamese.mp3`,
            Welsh: `${basePath}Welsh.mp3`
        };



        const translations2 = this.#getTranslations('C:\\Users\\aldan\\AppData\\Local\\Programs\\Python\\Python312\\saves\\cool.json');

        var compId;

        const ae = new AfterEffects();

        var translateComp = await ae.findCompositionByName(this.compositions.translateComp);
        var translationHitLeft = await ae.findCompositionByName(this.compositions.translationHitLeft);
        

        if (!translateComp) {
            alert("Translate Scene composition not found.");
            return;
        }

        await ae.beginUndoGroup(this.undoGroups.buildLanguageVideo);

        compId = await ae.getCurrentComposition();

        if (compId===null)
        {
            alert("you're high on marijuana, you want to generate a video on nothing WITHOUT SELECTING a COMPOSITION!!!!!");
            await ae.endUndoGroup();
            return;
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        
        // Пример использования:
        shuffleArray(audioFiles);
        

        let currentTime = 0;
        for (let i = 0; i < audioFiles.length; i++) {
            const audioFile = path.join(audioFolder, audioFiles[i]);
            const audioFileName = path.basename(audioFile, path.extname(audioFile));

            // Импорт и добавление English.wav
            const importedMainAudio = await ae.importFile(paths[audioFileName]);//+\
            const englishDuration = await ae.getDurationFile(importedMainAudio);
            var startTime_ImportedMainAudioLayer = currentTime;

            var importedMainAudioLayer = await ae.addLayerToComposition(compId, importedMainAudio, currentTime,currentTime,currentTime+englishDuration);

             

            //alert("importedMainAudioLayer = "+importedMainAudioLayer);


            //alert("currentTime: "+currentTime);

            var startPositionAnimation = currentTime + englishDuration;
            var endPositionAnimation = startPositionAnimation+0.5;
            currentTime += englishDuration + 0.5;
            

            const importedAudio = await ae.importFile(audioFile);
            const audioDuration = await ae.getDurationFile(importedAudio);

            var importedAudioLayer = await ae.addLayerToComposition(compId, importedAudio, currentTime,currentTime,currentTime+audioDuration);
            
            
            currentTime += audioDuration;

        // // Дублирование композиции Translate Scene
            

            const newComp = await ae.duplicateComposition(translateComp,`Translate Scene ${audioFileName}`);
            
            const newCompLayer = await ae.addLayerToComposition(compId, newComp, startTime_ImportedMainAudioLayer, startTime_ImportedMainAudioLayer, currentTime);
            await ae.setKeyPostionAnimation(compId,newCompLayer,1850,400,startPositionAnimation);
            await ae.setKeyPostionAnimation(compId,newCompLayer,145,400,endPositionAnimation);
            await ae.setKeyScaleAnimation(compId,newCompLayer,197,197,0,0,33,0,33);

        // // Обновление текстовых слоев в дублированной композиции
            await ae.openCompositionInViewer(newComp);
            await ae.setTextLayerValue(newComp, "top left", "English",null);
            await ae.setTextLayerValue(newComp, "top right", audioFileName,null);
            await ae.setTextLayerValue(newComp, "bottom left", translations2[audioFileName],null);
            await ae.setTextLayerValue(newComp, "bottom right", translations[audioFileName],"Times New Roman");

            await ae.openCompositionInViewer(compId);


            


            // Импорт и добавление соответствующего изображения
            const correspondingImageFile = path.join(picturesFolder, `${audioFileName}.png`);
          //  const infMusic = this.#getMusic(audioFileName);
            
            if (fs.existsSync(correspondingImageFile)) {
                const correspondingImage = await ae.importFile(correspondingImageFile);
                const correspondingImageLayer = await ae.addLayerToComposition(compId, correspondingImage, currentTime, currentTime,currentTime+5);
                
                
              //  alert(6);
                await ae.setKeyScaleAnimation(compId,correspondingImageLayer,250,250,currentTime,0,16,2.5,53);
                await ae.setKeyScaleAnimation(compId,correspondingImageLayer,100,100,currentTime+3,2.5,42,0,16);
                await ae.setKeyRotationAnimation(compId,correspondingImageLayer,this.#getRandomAngle(),currentTime,16,53);
                await ae.setKeyRotationAnimation(compId,correspondingImageLayer,0,currentTime+3,43,16);
                
                

               // const music = await ae.importFile(infMusic.pathToFile);
               // await ae.addLayerToComposition(compId, music, currentTime-infMusic.startTime, currentTime,currentTime+5);


                currentTime += 5;
            }




        }

        await ae.endUndoGroup();

        alert("cooooooooooooooooooooooooooool: ");

        //await ae.addText();
    }

    #getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    #getMusic(audioFileName)
    {
        try {
            // Путь к папке с музыкой
            const baseDir = "X:/All/7. Work/Laungige Amir/music";
            const targetFolder = path.join(baseDir, audioFileName);
    
            // Проверяем, существует ли папка
            if (!fs.existsSync(targetFolder)) {
                throw new Error(`Folder ${audioFileName} not found.`);
            }
    
            // Путь к файлу timecode.json
            const timecodePath = path.join(targetFolder, "timecode.json");
    
            // Проверяем, существует ли файл timecode.json
            if (!fs.existsSync(timecodePath)) {
                throw new Error(`timecode.json not found in ${targetFolder}.`);
            }
    
            // Чтение и парсинг файла timecode.json
            const timecodeData = JSON.parse(fs.readFileSync(timecodePath, 'utf8'));
    
            // Выбираем случайный ключ из timecode.json
            const keys = Object.keys(timecodeData);
            const randomKey = this.#getRandomElement(keys);
    
            // Выбираем случайное значение из массива для выбранного ключа
            const startTime = this.#getRandomElement(timecodeData[randomKey]);
    
            // Поиск файла с названием randomKey в папке audioFileName
            const files = fs.readdirSync(targetFolder);
            const matchingFiles = files.filter(file => path.parse(file).name === randomKey);
    
            if (matchingFiles.length === 0) {
                throw new Error(`File with name ${randomKey} not found in ${targetFolder}.`);
            }
    
            // Берем первый найденный файл (можно изменить логику, если нужно иначе)
            const selectedFile = matchingFiles[0];
            const pathToFile = path.join(targetFolder, selectedFile);
    
            // Возвращаем объект с данными
            return {
                pathToFile: pathToFile,
                startTime: startTime
            };
    
        } catch (error) {
            console.error("Error:", error.message);
            return null;
        }
    }


    #getRandomAngle() {
        return Math.random() < 0.5 ? 7.5 : -7.5;
    }


    #validityCheck(translations,audioFolder,picturesFolder,mainAudioFile)
    {
        if (!translations) {
            throw new Error("Bruh, either English.wav is not there or translations.json is not there. I dont know, but I guess it is translations.json");
        }

        if (audioFolder=== null || !fs.existsSync(audioFolder) || !fs.existsSync(picturesFolder)) {
            throw new Error("duuuude, both 'Audio' and 'Pictures' folders must exist in the selected directory, okay?");
        }

        if (!fs.existsSync(mainAudioFile)) {
            throw new Error("Bruh, either English.wav is not there or translations.json is not there. I dont know, but I guess it is English.wav");
        }
    }

    #getTranslations(filePath)
    {
        try {
            console.log("Starting loadTranslations function");
            
            // Проверяем, существует ли файл
            if (fs.existsSync(filePath)) {
                console.log("Translations file found");
    
                // Читаем файл
                const fileContent = fs.readFileSync(filePath, 'utf8');
                console.log("File read successfully");
                
                // Парсинг JSON содержимого
                const translations = JSON.parse(fileContent);
                console.log("Parsed translations: ", translations);
    
                return translations;
            } else {
                console.log("Translations file not found at: " + filePath);
                return null;
            }
        } catch (e) {
            console.error("Error in loadTranslations: " + e.toString());
            return null;
        }
    }

    undoGroups =  Object.freeze({
        buildLanguageVideo:"Import Audio, Compositions, and PNGs",
    });

    fonts = Object.freeze({
        Amharic:"AbyssinicaSIL-Regular",
        Georgian: "Helvetica-Regular",
        Korean: "MaplestoryOTFLight"
    });

    compositions = Object.freeze({
        translationHitLeft:"transition hit left",
        translateComp: "Translate Scene"
    });

}

module.exports = BusinessLogic;

