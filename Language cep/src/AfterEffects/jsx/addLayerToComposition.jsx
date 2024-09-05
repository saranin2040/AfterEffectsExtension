function performe(data) {
    try {
        var compId = parseInt(data.compId, 10);
        var idItem = parseInt(data.idItem, 10); // Преобразуем строку idItem в целое число
        var startTime = parseFloat(data.startTime);
        var inPoint = parseFloat(data.inPoint);
        var endTime = parseFloat(data.endTime);

        var comp = app.project.itemByID(compId);
        // Если композиция найдена, добавляем слой с аудио
        if (comp || comp instanceof CompItem) {

            //alert("nice: "+currentTime);
            return addLayerToComposition(comp, idItem, startTime,inPoint,endTime);
        } else {
            // Вы можете добавить обработку ошибки, если композиция не найдена
            //alert("vhvhvhv it is not composition");
        }

    } catch (error) {

        return "Error: "+error.message;
    }
}

// Функция, которая добавляет слой с аудио в композицию
function addLayerToComposition(comp, idItem, startTime,inPoint,endTime) {

    var item = app.project.itemByID(idItem);


    if (item) {
        // Добавляем слой с аудио в композицию
        var layer = comp.layers.add(item);

        // Устанавливаем время старта слоя
        layer.startTime = startTime;
        layer.inPoint = inPoint;
        //alert("layer.id = "+layer.id);
        layer.outPoint = endTime;

        if (layer.canSetCollapseTransformation) {
            layer.collapseTransformation = true;  // Включаем "Collapse Transformations" (солнышко)
        }

        return layer.id;
    } else {
        // Вы можете добавить обработку ошибки, если аудиофайл не найден
         alert("Аудиофайл с таким ID не найден.");
    }
}