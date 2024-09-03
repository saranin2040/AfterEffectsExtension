function performe(data) {
    try {

        var compId = parseInt(data.compId, 10);

        var comp = app.project.itemByID(compId);


        setTextLayerValue(comp, data.layerName, data.newValue,data.font);
        return true;
    } catch (error) {
        return "Error: " + error.message;
    }
}

function setTextLayerValue(comp, layerName, newValue,font) {
    try {
        var layer = comp.layer(layerName);
        if (layer != null && layer.property("Source Text") != null) {
            var textProp = layer.property("Source Text");
            var textDocument = textProp.value;  // Получаем текущий TextDocument
            
            textDocument.text = newValue;      // Устанавливаем новый текст

            if (font != null && font !== undefined && font !== "")
            {
                textDocument.font = font;  
            }

            textProp.setValue(textDocument); 
        } else {
            return "Error: Layer not found or does not contain text.";
        }
    } catch (error) {
        return "Error: " + error.message;
    }
}


