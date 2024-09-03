function performe(data) {

    var compName = data.compName;

    var numItems = app.project.numItems;

    // Проходим через все элементы проекта
    for (var i = 1; i <= numItems; i++) {
        var item = app.project.item(i);
        // Проверяем, является ли элемент композицией и имеет ли он заданное название
        if (item instanceof CompItem && item.name === compName) {
            return item.id; // Композиция найдена
        }
    }

    return false; 
}