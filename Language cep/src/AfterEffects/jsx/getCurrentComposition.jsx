function performe()
{
    var comp = app.project.activeItem;
    if (comp instanceof CompItem) {
        return comp.id; // Возвращаем активную композицию
    } else {
        return null; // Возвращаем null, если активного элемента нет или он не является композицией
    }
}