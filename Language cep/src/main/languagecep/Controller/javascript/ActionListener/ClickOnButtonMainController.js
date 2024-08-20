import { ActionListener } from "./ActionListener";


export class ClickOnButtonMainController extends ActionListener {


    constructor(bc)
    {
        super(bc);
    }

    actionPerformed() 
    {
        this.getBc().pasteLanguagesMaterials();

        console.log("Im so beautiful! :)");
    }
}


