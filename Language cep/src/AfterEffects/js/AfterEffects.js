//import { LaunchScript } from "./LaunchScript";
//import { ScriptsPaths } from './ScriptsPaths';

const LaunchScript = require("C:/Program Files (x86)/Common Files/Adobe/CEP/extensions/Language cep/src/AfterEffects/js/LaunchScript");
const ScriptsPaths = require("C:/Program Files (x86)/Common Files/Adobe/CEP/extensions/Language cep/src/AfterEffects/js/ScriptsPaths");

 class AfterEffects {

    addText() {
        const launchScript = new LaunchScript();


        launchScript.startVoidNull(ScriptsPaths.addText);

        const data = {
            text: "Hello from CEP!",
            layerName: "My Custom Layer"
        };

        launchScript.startArgNull(data,ScriptsPaths.addTextByArg);
        
        console.log("You have catched me, Creeper 228");
    }

    alert()
    {
        const launchScript = new LaunchScript();
        launchScript.startVoidNull(ScriptsPaths.alert);
    }
}

module.exports = AfterEffects;