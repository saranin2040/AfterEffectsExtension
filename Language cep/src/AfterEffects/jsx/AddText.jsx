function performe(text) {
    var comp = app.project.activeItem;

    $.writeln("dodik");

    if (comp && comp instanceof CompItem) {
        var textLayer = comp.layers.addText(text);
        textLayer.name = "hui";
    } else {
        alert("No active composition found.");
    }
}

performe("Hello, After Effects!");