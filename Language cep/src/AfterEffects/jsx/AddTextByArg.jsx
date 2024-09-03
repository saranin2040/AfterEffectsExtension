function performe(data) {
    var parsedData = JSON.parse(data); // Парсинг данных в ExtendScript
    var comp = app.project.activeItem;
    if (comp && comp instanceof CompItem) {
        var textLayer = comp.layers.addText(parsedData.text);
        textLayer.name = parsedData.layerName;
    } else {
        alert("No active composition found.");
    }

    return true;
}

