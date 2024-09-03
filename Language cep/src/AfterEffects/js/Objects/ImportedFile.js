class ImportOptions {
    constructor(sequence = false, forceAlphabetical = false,sequenceDontImportAlpha = false, sequenceStartTime = 0, selectedLayer = null, importAsTimeRemapping = false, layerID = null, isSelected = false) {
        this.sequence = sequence;
        this.forceAlphabetical = forceAlphabetical;
        this.sequenceDontImportAlpha = sequenceDontImportAlpha;
        this.sequenceStartTime = sequenceStartTime;
        this.selectedLayer = selectedLayer;
        this.importAsTimeRemapping = importAsTimeRemapping;
        this.layerID = layerID;
        this.isSelected = isSelected;
    }
}

export default ImportOptions;