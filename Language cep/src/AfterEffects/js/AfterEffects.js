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

    async findCompositionByName(compName)
    {
        const launchScript = new LaunchScript();

        const data = {
            compName: compName,
        };

        return await launchScript.startArgReturn(data,ScriptsPaths.startArgReturn.findCompositionByName);
    }

    async beginUndoGroup(nameGroup)
    {
        const launchScript = new LaunchScript();

        const data = {
            nameGroup: nameGroup,
        };

        return await launchScript.startArgReturn(data,ScriptsPaths.startArgReturn.beginUndoGroup);
    }

    async endUndoGroup()
    {
        const launchScript = new LaunchScript();

        return await launchScript.startVoidReturn(ScriptsPaths.startVoidReturn.endUndoGroup);
    }

    async getCurrentComposition()
    {
        const launchScript = new LaunchScript();

        return await launchScript.startVoidReturn(ScriptsPaths.startVoidReturn.getCurrentComposition);
    }

    async importFile(filePath)
    {
        const launchScript = new LaunchScript();

        const data = {
            filePath: filePath,
        };

        return await launchScript.startArgReturn(data,ScriptsPaths.startArgReturn.importFile);
    }

    async addLayerToComposition(compId,idItem,startTime,inPoint,endTime)
    {
        const launchScript = new LaunchScript();

        const data = {
            compId:compId,
            idItem: idItem,
            startTime:startTime,
            inPoint: inPoint,
            endTime:endTime,
        };

        return await launchScript.startArgReturn(data,ScriptsPaths.startArgReturn.addLayerToComposition);
    }

    async getDurationFile(idItem)
    {
        const launchScript = new LaunchScript();

        const data = {
            idItem: idItem,
        };

        return await launchScript.startArgReturn(data,ScriptsPaths.startArgReturn.getDurationFile);
    }

    async duplicateComposition(compId,name)
    {
        const launchScript = new LaunchScript();

        const data = {
            compId: compId,
            name: name,
        };

        return await launchScript.startArgReturn(data,ScriptsPaths.startArgReturn.duplicateComposition);
    }

    async getStartTime(compId,idItem)
    {
        const launchScript = new LaunchScript();

        const data = {
            compId: compId,
            idItem: idItem,
        };

        return await launchScript.startArgReturn(data,ScriptsPaths.startArgReturn.getStartTime);
    }

    async openCompositionInViewer(compId)
    {
        const launchScript = new LaunchScript();

        const data = {
            compId: compId,
        };

        return await launchScript.startArgReturn(data,ScriptsPaths.startArgReturn.openCompositionInViewer);
    }

    async setTextLayerValue(compId, layerName, newValue,font)
    {
        const launchScript = new LaunchScript();

        const data = {
            compId: compId,
            layerName:layerName,
            newValue: newValue,
            font: font,
        };

        return await launchScript.startArgReturn(data,ScriptsPaths.startArgReturn.setTextLayerValue);
    }

    async setKeyScaleAnimation(compId, itemId,valueX,valueY, time,easeInS,easeInIn,easeOutS,easeOutIn)
    {
        const launchScript = new LaunchScript();

        const data = {
            compId: compId,
            itemId:itemId,
            valueX: valueX,
            valueY: valueY,
            time: time,
            easeInS: easeInS,
            easeInIn: easeInIn,
            easeOutS: easeOutS,
            easeOutIn: easeOutIn,
        };

        return await launchScript.startArgReturn(data,ScriptsPaths.startArgReturn.setKeyScaleAnimation);
    }

    async setKeyPostionAnimation(compId,itemId,valueX,valueY,time)
    {
        const launchScript = new LaunchScript();

        const data = {
            compId: compId,
            itemId:itemId,
            valueX: valueX,
            valueY: valueY,
            time: time,
        };

        return await launchScript.startArgReturn(data,ScriptsPaths.startArgReturn.setKeyPostionAnimation);
    }

    async setKeyRotationAnimation(compId,itemId,value,time,easeIn,easeOut)
    {
        const launchScript = new LaunchScript();

        const data = {
            compId: compId,
            itemId:itemId,
            value: value,
            time: time,
            easeIn: easeIn,
            easeOut: easeOut,
        };

        return await launchScript.startArgReturn(data,ScriptsPaths.startArgReturn.setKeyRotationAnimation);
    }
}

module.exports = AfterEffects;