//import { AfterEffects } from "../../../../AfterEffects/js/AfterEffects";

const AfterEffects = require("C:/Program Files (x86)/Common Files/Adobe/CEP/extensions/Language cep/src/AfterEffects/js/AfterEffects");
const fs = require('fs');
const path = require('path');

 class BusinessLogic {

    pasteLanguagesMaterials(workFolderPath) 
    {
        var audioFiles;

        const translations = this.#getTranslations('C:\\Users\\aldan\\AppData\\Local\\Programs\\Python\\Python312\\saves\\translations.json');

        const audioFolder = path.join(workFolderPath, 'Audio');
        const picturesFolder = path.join(workFolderPath, 'Pictures');
        
        const mainAudioFile = path.join(audioFolder, 'English.wav');

        audioFiles = fs.readdirSync(audioFolder).filter(file => {
            return file.match(/\.(wav|mp3)$/i) && file !== "English.wav";
        });
        
        if (!this.#validityCheck(audioFiles,translations,audioFolder,picturesFolder,mainAudioFile)) { return; }

        
        this.#pasteLanguagesMaterials_exAsync(audioFiles,translations,audioFolder,picturesFolder,mainAudioFile);



        
        
    }

    async #pasteLanguagesMaterials_exAsync(audioFiles,translations,audioFolder,picturesFolder,mainAudioFile)
    {
        const ae = new AfterEffects();

        if (ae.findCompositionByName(this.translateComp)) {
            alert("Translate Scene composition not found.");
            return;
        }

        await ae.addText();
    }


    #validityCheck(audioFiles,translations,audioFolder,picturesFolder,mainAudioFile)
    {
        if (audioFiles.length === 0) {
            alert("No.. noooo... NOOOOOOOOO!!!! THESE AUDIO FILES dont exist in the 'Audio' folder, brooo");
            return false;
        }

        if (!translations) {
            alert("Bruh, either English.wav is not there or translations.json is not there. I dont know, but I guess it is translations.json");
            return false;
        }

        if (!fs.existsSync(audioFolder) || !fs.existsSync(picturesFolder)) {
            alert("duuuude, both 'Audio' and 'Pictures' folders must exist in the selected directory, okay?");
            return false;
        }

        if (!fs.existsSync(mainAudioFile)) {
            ae.alert("Bruh, either English.wav is not there or translations.json is not there. I dont know, but I guess it is English.wav");
            return false;
        }

        return true;
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

    translateComp = "Translate Scene";

}

module.exports = BusinessLogic;

