function performe(data) {
    try {

        var compId = parseInt(data.compId, 10);

        var comp = app.project.itemByID(compId);


        comp.openInViewer(); 
        return true;
    } catch (e) {
        return "Error: " + e.message;
    }
}
