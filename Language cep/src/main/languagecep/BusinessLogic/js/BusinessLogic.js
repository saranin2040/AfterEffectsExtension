//import { AfterEffects } from "../../../../AfterEffects/js/AfterEffects";

const AfterEffects = require("C:/Program Files (x86)/Common Files/Adobe/CEP/extensions/Language cep/src/AfterEffects/js/AfterEffects");
const fs = require('fs');
const path = require('path');

 class BusinessLogic {

    pasteLanguagesMaterials(workFolderPath) 
    {
        const afterEffects = new AfterEffects();
        const translations = this.#getTranslations('C:\\Users\\aldan\\AppData\\Local\\Programs\\Python\\Python312\\saves\\translations.json');


        


        console.log(workFolderPath);

        
        afterEffects.addText();
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
}

module.exports = BusinessLogic;

