// import { ActionListener } from "../ActionListener/ActionListener";
// import { BusinessLogic } from "../../../BusinessLogic/js/BusinessLogic";
// import { ClickOnButtonMainController } from "../ActionListener/ClickOnButtonMainController";


const ActionListener = require("C:/Program Files (x86)/Common Files/Adobe/CEP/extensions/Language cep/src/main/languagecep/Controller/javascript/ActionListener/ActionListener");
const BusinessLogic = require("C:/Program Files (x86)/Common Files/Adobe/CEP/extensions/Language cep/src/main/languagecep/BusinessLogic/js/BusinessLogic");
const ClickOnButtonMainController = require("C:/Program Files (x86)/Common Files/Adobe/CEP/extensions/Language cep/src/main/languagecep/Controller/javascript/ActionListener/ClickOnButtonMainController");

document.addEventListener('DOMContentLoaded', () => {


    

    function asActionListener(instance) {
        if (!(instance instanceof ActionListener)) {
            throw new TypeError("Instance is not of type ActionListener.");
        }
        return {
            actionPerformed: instance.actionPerformed.bind(instance)
        };
    }

    const bc = new BusinessLogic();



//     if (window.cep && window.cep.node && window.cep.node.require) {

//         const fs = window.cep.node.require('fs');
//         const readline = window.cep.node.require('readline');
        

// } else {
//     console.error('CEP environment is not available. Please make sure the extension is running inside an Adobe application.');
//     bc.alert();
//}

    
//const fs = require('fs');
//alert(fs);
    //bc.alert();

    const actionListeners = {
        startRender: asActionListener(new ClickOnButtonMainController(bc)),
    };

   // const clickOnButtonMainController = new ClickOnButtonMainController();


    try{
        document.getElementById('greetButton').addEventListener('click', () => actionListeners.startRender.actionPerformed());
    }
    catch(e)
    {
        alert(e);
    }
    
});

//<script src="../../../../../dist/MainPage.js"></script> 