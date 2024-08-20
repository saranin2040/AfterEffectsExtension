//import { LaunchScript } from "./LaunchScript";
//import { ScriptsPaths } from './ScriptsPaths';

const LaunchScript = require("C:/Program Files (x86)/Common Files/Adobe/CEP/extensions/Language cep/src/AfterEffects/js/LaunchScript");
const ScriptsPaths = require("C:/Program Files (x86)/Common Files/Adobe/CEP/extensions/Language cep/src/AfterEffects/js/ScriptsPaths");

 class AfterEffects {

    async addText() {
        const launchScript = new LaunchScript();

        var popik = await launchScript.startVoidReturn(ScriptsPaths.startVoidReturn.test);

        console.log("your message"+popik);

        // launchScript.startVoidNull(ScriptsPaths.addText);

        // const data = {
        //     text: "Hello from CEP!",
        //     layerName: "My Custom Layer"
        // };

        // launchScript.startArgNull(data,ScriptsPaths.addTextByArg);
        
        console.log("You have catched me, Creeper 228");
    }

    async findCompositionByName(nameComp)
    {
        const launchScript = new LaunchScript();

        const data = {
                text: "tuz life",
                layerName: "My Custom Layer"
            };

        var popik2 = await launchScript.startArgReturn(data,ScriptsPaths.startArgReturn.test);

        console.log("your message twice: "+popik2);
    }
}

module.exports = AfterEffects;