function performe(data) {
    try {
        var importOptions = new ImportOptions(new File(data.filePath));
        if (importOptions.canImportAs(ImportAsType.FOOTAGE)) {
            var importedFile = app.project.importFile(importOptions);
            return importedFile.id; // Возвращаем объект FootageItem
        } else {
            return "Error: File cannot be imported as footage.";
        }
    } catch (e) {
        return "Error: " + e.message;
    }
}