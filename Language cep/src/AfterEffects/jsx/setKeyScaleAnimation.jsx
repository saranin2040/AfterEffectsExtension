function performe(data) {
    try {


      //  alert("man "+data.itemId);

        var compId = parseInt(data.compId, 10);
        var itemId = parseInt(data.itemId, 10);

        var valueX = parseFloat(data.valueX);
        var valueY = parseFloat(data.valueY);
        var time = parseFloat(data.time);
        var easeInS = parseFloat(data.easeInS);
        var easeInIn = parseFloat(data.easeInIn);

        var easeOutS = parseFloat(data.easeOutS);
        var easeOutIn = parseFloat(data.easeOutIn);


        var comp = app.project.itemByID(compId);

        if (!(comp instanceof CompItem)) {
            return "Error: Активный элемент не является композицией.";
        }
        
        //var layer = comp.layer(itemId);
        var layer = findLayerByID(comp, itemId);
       // alert("man2 "+layer.name);
        if (!layer) {
            return "Error: Слой с указанным itemId не найден.";
        }

        if (layer) 
        {
            var scaleProp = layer.property("ADBE Transform Group").property("ADBE Scale");
            var keyIndex = scaleProp.addKey(time);
            
            scaleProp.setValueAtKey(keyIndex, [valueX, valueY]);

            scaleProp.setInterpolationTypeAtKey(keyIndex, KeyframeInterpolationType.BEZIER, KeyframeInterpolationType.BEZIER);

            easeIn = new KeyframeEase(easeInS, easeInIn);
            easeOut = new KeyframeEase(easeOutS, easeOutIn);

            scaleProp.setTemporalEaseAtKey(keyIndex, [easeIn,easeIn,easeIn], [easeOut,easeOut,easeOut]);

        } else {
            return "Error: Layer with itemId " + itemId + " not found.";
        }
    } catch (error) {
        return "Error: " + error.message;
    }
}


function findLayerByID(comp, layerID) {
    for (var i = 1; i <= comp.numLayers; i++) {
        var layer = comp.layer(i);
        if (layer.id === layerID) {
            return layer;
        }
    }
    return null; // Если слой с таким ID не найден
}

