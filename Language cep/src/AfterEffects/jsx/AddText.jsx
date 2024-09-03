function performe() {
    var comp = app.project.activeItem;

    text=hui;

    $.writeln("dodik");

    if (comp && comp instanceof CompItem) {
        var textLayer = comp.layers.addText(text);
        textLayer.name = "hui";
    } else {
        alert("No active composition found.");
    }

    return true;
}