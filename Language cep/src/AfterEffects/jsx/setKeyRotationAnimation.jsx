function performe(data) {
    try {


        

        var compId = parseInt(data.compId, 10);

        var itemId = parseInt(data.itemId);
        var value = parseFloat(data.value);
        var time = parseFloat(data.time);

        var easeIn = parseFloat(data.easeIn);
        var easeOut = parseFloat(data.easeOut);


        var comp = app.project.itemByID(compId);

        

        if (comp && comp instanceof CompItem) {
            var layer = findLayerByID(comp, itemId);
            if (layer) {
                var rotationProp = layer.property("ADBE Transform Group").property("ADBE Rotate Z");

                // Добавляем ключевой кадр в указанное время
                var keyIndex = rotationProp.addKey(time);

                // Устанавливаем значение ключевого кадра
                rotationProp.setValueAtKey(keyIndex, value); // Здесь значение вращения должно быть числом
                // Устанавливаем тип интерполяции как Bezier
                rotationProp.setInterpolationTypeAtKey(keyIndex, KeyframeInterpolationType.BEZIER, KeyframeInterpolationType.BEZIER);

                // Создаем объекты KeyframeEase для входящего и исходящего влияния




                var easeIn1 = new KeyframeEase(0, easeIn);
                var easeOut1 = new KeyframeEase(0, easeOut);

                // Применяем easing к ключевому кадру
                rotationProp.setTemporalEaseAtKey(keyIndex, [easeIn1], [easeOut1]);

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
