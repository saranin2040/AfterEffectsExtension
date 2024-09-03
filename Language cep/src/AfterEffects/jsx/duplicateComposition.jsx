function performe(data) {
    try {
        //alert(data.compId);
        //alert(data.name);
        return duplicateComposition(data);
    } catch (error) {
        return "Error: " + error.message;
    }
}

function duplicateComposition(data) {
    try {
        // Проверка наличия ключа compId в переданных данных
        //alert(parseInt(data.compId, 10));
        if (!data.compId) {
            return "Error: compId is missing";
        }


        var compId = parseInt(data.compId, 10);
        var comp = app.project.itemByID(compId);

        // Проверка, что композиция с указанным ID существует и является композицией
        if (!(comp && comp instanceof CompItem)) {
            return "Error: Composition with the given ID not found";
        }

        // Дублирование композиции
        var duplicatedComp = comp.duplicate();

        duplicatedComp.name = data.name;
        return duplicatedComp.id;
    } catch (error) {
        return "Error: " + error.message;
    }
}
