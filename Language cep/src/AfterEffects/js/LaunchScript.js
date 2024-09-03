 class LaunchScript {

    async startVoidReturn(scriptPath)
    {
        try {
            const result = await this.#startVoidReturn2(scriptPath);
            console.log("Result from script without args:", result);

            if (result=="null")
            {
                return null;
            }

            if (result=="true")
            {
                return true;
            }

            if (result=="false")
            {
                return false;
            }

            if (!isNaN(result)) {
                let result2 = Number(result);
                return result2;
            } 
    
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
            console.log("Result from script with args:", result);

            if (result=="null")
            {
                return null;
            }

            if (result=="true")
            {
                return true;
            }

            if (result=="false")
            {
                return false;
            }

            if (!isNaN(result)) {
                let result2 = Number(result);
                return result2;
            } 

            return result;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    }


    #startVoidReturn2(scriptPath) {
        const csInterface = new CSInterface();
        const scriptPathImproved = csInterface.getSystemPath(SystemPath.EXTENSION) + "/src/AfterEffects/jsx/" + scriptPath;

        const script = `
        $.evalFile("${scriptPathImproved}");
        var result = performe(); // Получаем значение из скрипта
        result;
        `;


        return new Promise((resolve, reject) => {
            csInterface.evalScript(script, function(result) {
                if (result !== "EvalScript error." && !result.startsWith("Error:")) {
                    resolve(result); 
                } 
                else if (result.startsWith("Error:"))
                {
                    reject(result);
                }
                else {
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
                if (result !== "EvalScript error." && !result.startsWith("Error:")) {
                    resolve(result); // Возвращаем результат через Promise
                } 
                else if (result.startsWith("Error:"))
                {
                    reject(result);
                }
                else {
                    reject("Error executing script"); // Обрабатываем ошибку
                }
            });
        });
    }

}

module.exports = LaunchScript;