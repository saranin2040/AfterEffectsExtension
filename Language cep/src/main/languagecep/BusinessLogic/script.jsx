{
    function selectFolderAndImportFiles() {
        // Helper function to trim strings
        function trimString(str) {
            return str.replace(/^\s+|\s+$/g, '');
        }
    
    function delay(ms) {
    var start = new Date().getTime();
    while (new Date().getTime() - start < ms) {
        // Busy-wait loop to create a delay
    }
}

function findCompByName(name) {
    for (var i = 1; i <= app.project.items.length; i++) {
        var item = app.project.items[i];
        if (item instanceof CompItem && item.name === name) {
            return item;
        }
    }
    return null;
}

                // Load translations from file
       function loadTranslations(filePath) {
    try {
        $.writeln("Starting loadTranslations function");
        var file = new File(filePath);
        var translations = {};

        if (file.exists) {
            $.writeln("Translations file found");
            var opened = file.open("r");
            if (opened) {
                $.writeln("File opened successfully");
                var fileContent = file.read();
                
                // Парсинг JSON содержимого
                translations = JSON.parse(fileContent);
                
                $.writeln("Parsed translations: " + JSON.stringify(translations));
                
                file.close();
                $.writeln("File closed successfully");
            } else {
                $.writeln("Failed to open file");
            }
        } else {
            $.writeln("Translations file not found at: " + filePath);
        }
        
        return translations;
    } catch (e) {
        $.writeln("Error in loadTranslations: " + e.toString());
        return null;
    }
}


        // Create UI
        var win = new Window("palette", "Select Folder and Import Files", undefined);
        win.orientation = "column";
        win.alignChildren = ["fill", "fill"];
        
        // Select Folder Button
        var selectFolderBtn = win.add("button", undefined, "Select Folder");
        
        // Add event listener to the button
        selectFolderBtn.onClick = function() {
//================================================================================================================
            var selectedFolder = Folder.selectDialog("Select a folder containing 'Audio' and 'Pictures' folders");
            if (selectedFolder) {
                var audioFolder = new Folder(selectedFolder.fsName + "/Audio");
                var picturesFolder = new Folder(selectedFolder.fsName + "/Pictures");

                if (audioFolder.exists && picturesFolder.exists) {
                    var englishAudioFile = new File(audioFolder.fsName + "/English.wav");
                    var translations = loadTranslations("C:/Users/aldan/AppData/Local/Programs/Python/Python312/saves/translations.jsx");

                    if (englishAudioFile.exists && translations) {
                        var translateComp = findCompByName("Translate Scene");
                        if (translateComp instanceof CompItem) {
                            var audioFiles = audioFolder.getFiles(function(file) {
                                return file instanceof File && file.name != "English.wav" && file.name.match(/\.(wav|mp3)$/i);
                            });

                            if (audioFiles.length > 0) {
                                app.beginUndoGroup("Import Audio, Compositions, and PNGs");
                                var comp = app.project.activeItem;
                                if (comp instanceof CompItem) {
                                    var currentTime = 0;
                                    for (var i = 0; i < audioFiles.length; i++) {
                                        // Import and add English.wav
                                        var englishImportOptions = new ImportOptions(englishAudioFile);
                                        var importedEnglishAudio = app.project.importFile(englishImportOptions);
                                        var englishLayer = comp.layers.add(importedEnglishAudio);
                                        englishLayer.startTime = currentTime;
                                        
                                        var englishDuration = importedEnglishAudio.duration;
                                        currentTime += englishDuration;

                                        // Add 0.3 seconds gap
                                        currentTime += 0.3;
                                        
                                        // Import and add current audio file
                                        var audioFile = audioFiles[i];
                                        var audioImportOptions = new ImportOptions(audioFile);
                                        var importedAudio = app.project.importFile(audioImportOptions);
                                        var audioLayer = comp.layers.add(importedAudio);
                                        audioLayer.startTime = currentTime;
                                        
                                        var audioDuration = importedAudio.duration;
                                        currentTime += audioDuration;
                                        
                                        // Duplicate Translate Scene composition
                                        var audioFileName = audioFile.name.replace(/\.(wav|mp3)$/, "");
                                        var countryName = audioFileName;
                                        var newComp = translateComp.duplicate();
                                        newComp.name = "Translate Scene " + countryName;
                                        var newCompLayer = comp.layers.add(newComp);
                                        newCompLayer.startTime = englishLayer.startTime;
                                        newCompLayer.outPoint = currentTime;
                                        
                                        // Edit duplicated composition
					newComp.openInViewer(); 
                                        var textLayers = newComp.layers;
                                        for (var j = 1; j <= textLayers.length; j++) {
                                            var layer = textLayers[j];
                                            if (layer instanceof TextLayer) {
                                                if (layer.name === "top left") {
                                                    layer.property("Source Text").setValue("English");
                                                } else if (layer.name === "top right") {
                                                    layer.property("Source Text").setValue(countryName);
                                                } else if (layer.name === "bottom left") {
                                                    layer.property("Source Text").setValue(translations["English"]);
                                                } else if (layer.name === "bottom right") {
                                                    layer.property("Source Text").setValue(translations[countryName]);
                                                }
                                            }
                                        }

					comp.openInViewer(); 

                                        // Import and add corresponding image file
                                        var correspondingImageFile = new File(picturesFolder.fsName + "/" + audioFile.name.replace(/\.(wav|mp3)$/, ".png"));
                                        if (correspondingImageFile.exists) {
                                            var imageImportOptions = new ImportOptions(correspondingImageFile);
                                            var importedImage = app.project.importFile(imageImportOptions);
                                            var imageLayer = comp.layers.add(importedImage);
                                            imageLayer.startTime = currentTime;
                                            imageLayer.outPoint = currentTime + 5; // 5 seconds duration for image
                                            currentTime += 5;
                                        }
                                   // return;
                                   delay(1); //=)Repetur
                                    }
                                } else {
                                    alert("Please select a composition first.");
                                }
                                app.endUndoGroup();
                            } else {
                                alert("No audio files found in the 'Audio' folder.");
                            }
                        } else {
                            alert("Translate Scene composition not found.");
                        }
                    } else {
                        alert("English.wav or translations not found.");
                    }
                } else {
                    alert("Both 'Audio' and 'Pictures' folders must exist in the selected directory.");
                }
            } else {
                alert("No folder selected.");
            }
        };
//================================================================================================================   
        win.center();
        win.show();

    }



    selectFolderAndImportFiles();
}
