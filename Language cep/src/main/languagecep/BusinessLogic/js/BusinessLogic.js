import { AfterEffects } from "../../../../AfterEffects/js/AfterEffects";

export class BusinessLogic {

    pasteLanguagesMaterials() 
    {
        const afterEffects = new AfterEffects();




        //var webpack = require('webpack');
        var path = require('path');
        var fs = require('fs');

       // fs.mkdirSync("C:/r/poop", { recursive: true });




        afterEffects.alert();

        // // Путь к файлу
        const filePath = 'C:\\Users\\aldan\\AppData\\Local\\Programs\\Python\\Python312\\saves\\translations.txt';

        // Чтение файла
        // fs.readFile(filePath, 'utf8', (err, data) => {
        //     if (err) {
        //         console.error(`Error reading file: ${err.message}`);
        //         return;
        //     }

        //     // Разделение содержимого на строки и получение первой строки
        //     const lines = data.split('\n');
        //     const firstLine = lines[0].trim();

        //     console.log(`First line of the file: ${firstLine}`);
        // })


        //const fontlist = require('../../../../../node_modules/font-list');

        const translations = this.#getTranslations("C:/Users/aldan/AppData/Local/Programs/Python/Python312/saves/translations.jsx");

        
        afterEffects.addText();
    }

    #getTranslations(filePath)
    {

    }

    alert(){
        const afterEffects = new AfterEffects();
        afterEffects.alert();
    }
}