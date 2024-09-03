function performe(data) {
    try {

//alert("idItem: " + data.idItem);
        var compId = parseInt(data.compId, 10);
        var idItem = parseInt(data.idItem, 10);


//alert("idItem: " + idItem);
        var comp = app.project.itemByID(compId);

        var foundLayer = findLayerByID(comp, idItem);

       // alert("Layer duration: " + foundLayer.startTime + " seconds");

        return foundLayer.startTime;

    } catch (error) {

        return "Error: "+error.message;
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
