function performe(data) {
    try {

        var compId = parseInt(data.compId, 10);

        var itemId = parseInt(data.itemId);
        var valueX = parseFloat(data.valueX);
        var valueY = parseFloat(data.valueY);
        var time = parseFloat(data.time);


        var comp = app.project.itemByID(compId);

        

        if (comp && comp instanceof CompItem) {
            var layer = findLayerByID(comp, itemId);
            if (layer) {
                var positionProp = layer.property("ADBE Transform Group").property("ADBE Position");
                
                // Add keyframe at the specified time
                var keyIndex = positionProp.addKey(time);
                
                // Set the keyframe value
                positionProp.setValueAtKey(keyIndex, [valueX, valueY]);

                // Set interpolation to Bezier
                positionProp.setInterpolationTypeAtKey(keyIndex, KeyframeInterpolationType.BEZIER, KeyframeInterpolationType.BEZIER);

                var easeIn = new KeyframeEase(0, 33);
                var easeOut = new KeyframeEase(0, 33);
                
                // Apply easing
                positionProp.setTemporalEaseAtKey(keyIndex, [easeIn], [easeOut]);
                
            } else {
                return "Error: Layer with itemId " + itemId + " not found.";
            }
        } else {
            return "Error: Active composition not found.";
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


// Важно: функции не нужно вызывать. Их можно использовать после добавления в проект.
