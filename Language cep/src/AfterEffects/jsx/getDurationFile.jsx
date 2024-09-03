function performe(data) {
    try {
        var idItem = parseInt(data.idItem, 10);

        var layer = app.project.itemByID(idItem);


       // alert("Layer duration: " + layer.duration + " seconds");

        return layer.duration;

    } catch (error) {

        return "Error: "+error.message;
    }
}