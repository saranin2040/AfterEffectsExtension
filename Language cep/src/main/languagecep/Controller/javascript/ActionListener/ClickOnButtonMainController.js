//import { ActionListener } from "./ActionListener";
const ActionListener = require("C:/Program Files (x86)/Common Files/Adobe/CEP/extensions/Language cep/src/main/languagecep/Controller/javascript/ActionListener/ActionListener");

 class ClickOnButtonMainController extends ActionListener {


    constructor(bc)
    {
        super(bc);

    }

    actionPerformed() 
    {
        try{

        var sourceFolderPath;
        const folderInput = document.getElementById('folderInput');

        if (folderInput.files.length > 0) {

            sourceFolderPath = path.dirname(folderInput.files[0].path);
        } else {
            console.log("No folder selected.");
        }

        this.getBc().pasteLanguagesMaterials(sourceFolderPath);

        console.log("Im so beautiful! :)");

        }
        catch(e)
        {
            alert(e);
        }
    }
}

module.exports = ClickOnButtonMainController;


