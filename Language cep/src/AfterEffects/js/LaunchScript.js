 class LaunchScript {

    async startVoidNull(scriptPath) {

        const csInterface = new CSInterface();
        const scriptPathImproved = csInterface.getSystemPath(SystemPath.EXTENSION) + "/src/AfterEffects/jsx/"+scriptPath;
        csInterface.evalScript('$.evalFile("' + scriptPathImproved + '")');
    }
    async startArgNull(data,scriptPath)
    {
        const csInterface = new CSInterface();
        const scriptPathImproved = csInterface.getSystemPath(SystemPath.EXTENSION) + "/src/AfterEffects/jsx/"+scriptPath;

        const jsonData = JSON.stringify(data);

        const script = `
            var data = '${jsonData}';
            $.evalFile("${scriptPathImproved}");
            performe(data);
        `;
        
        csInterface.evalScript(script);
    }

    async startVoidReturn(scriptPath)
    {
        try {
            const result = await this.#startVoidReturn2(scriptPath);
            console.log("Result from script without args:", result);
            return result;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    }

    async startArgReturn(data,scriptPath)
    {
        try {
            const result = await this.#startArgReturn2(data,scriptPath);
            console.log("Result from script without args:", result);
            return result;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    }


    #startVoidReturn2(scriptPath) {
        const csInterface = new CSInterface();
        const scriptPathImproved = csInterface.getSystemPath(SystemPath.EXTENSION) + "/src/AfterEffects/jsx/" + scriptPath;

        return new Promise((resolve, reject) => {
            csInterface.evalScript('$.evalFile("' + scriptPathImproved + '")', function(result) {
                if (result !== "EvalScript error.") {
                    resolve(result); 
                } else {
                    reject("Error executing script"); 
                }
            });
        });
    }

    // Метод для запуска скрипта с аргументами и возврата значения
    #startArgReturn2(data, scriptPath) {
        const csInterface = new CSInterface();
        const scriptPathImproved = csInterface.getSystemPath(SystemPath.EXTENSION) + "/src/AfterEffects/jsx/" + scriptPath;

        const jsonData = JSON.stringify(data);

        const script = `
            var data = ${JSON.stringify(jsonData)};
            data = JSON.parse(data);
            $.evalFile("${scriptPathImproved}");
            var result = performe(data); // Получаем значение из скрипта
            result;
        `;

        return new Promise((resolve, reject) => {
            csInterface.evalScript(script, function(result) {
                if (result !== "EvalScript error.") {
                    resolve(result); // Возвращаем результат через Promise
                } else {
                    reject("Error executing script"); // Обрабатываем ошибку
                }
            });
        });
    }

}

module.exports = LaunchScript;