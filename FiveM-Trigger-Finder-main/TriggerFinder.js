const fs = require("fs");
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const settings = {
    search: ["TriggerServerEvent", "TriggerEvent"],
    params: ["money", "jail", "reward", "venomadmin:setmoney", "esx_illegal_drugs:startHarvestCoke", "YachtRob:AddReward", "esx_vangelico_robbery:gioielli", "esx_drugs:startHarvestAcid", "core_credits:addWinning", "core_credits:taskCompleted", "lester:vendita", "esx:giveInventoryItem", "houseRobberies:giveMoney", "atmRob:server:CompletedRob", "qb-taco:server:reward:money"],
    events: {
        'chat:init':  "cool event that is ya" // to do??? would be cool idk
    }
};

(async () => {
    const serverDir = await question("Search Directory? ");
    console.log("Server Directory: " + serverDir);
    console.log("Searching...");

    try {
        const files = getFilesFromDir(serverDir, [".js", ".lua"]);
        const itemsFound = [];
        for (let file of files) {
            const fileData = await fs.readFileSync(file, { encoding: "utf-8" });
    
            for (let searchField of settings.search) {
                if (fileData.includes(searchField)) {
                    const split = fileData.split("\n");
                    for (let i = 0; i < split.length; i++) {
                        var regExp = /\TriggerServerEvent([^)]+)\)/g;
                        var matches = regExp.exec(split[i]);
                        if (matches) {
                            let common = false;
                            for (commonParam of settings.params) {
                                if (matches[0].includes(commonParam)) common = true;
                            };

                            if (!itemsFound.map((e) => e.lineTxt).includes(matches[0])) itemsFound.push({ lineNum: i + 1, common: common, lineTxt: matches[0] });
                        };
                    };
                };
            };
        };
        

        console.log(`\n\n${itemsFound.length} item's were found!`);
    
        for (let item of itemsFound) {
            console.log(`${item.lineTxt} was found on line ${item.lineNum}`);
        };

        console.log(`\n\n${itemsFound.filter((a) => a.common == true ).length} common item's were found!`);
        for (let item of itemsFound.filter((a) => a.common == true )) {
            console.log(`${item.lineTxt} was found on line ${item.lineNum}`);
        };
        await question("Press any key to exit... ");
        process.exit();
    } catch (error) {
        console.log(error);
    }
})();

// some code i stole from google
function getFilesFromDir(dir, fileTypes) {
    let filesToReturn = [];
    function walkDir(currentPath) {
        let files = fs.readdirSync(currentPath);
        for (let i in files) {
            let curFile = path.join(currentPath, files[i]);      
            if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) != -1) {
                filesToReturn.push(curFile);
            } else if (fs.statSync(curFile).isDirectory()) {
                walkDir(curFile);
            };
        };
    };

    walkDir(dir);
    return filesToReturn; 
}

// more code i stole from google
function question(q , cb) {
    let response;

    rl.setPrompt(q);
    rl.prompt();

    return new Promise((resolve , reject) => {
        rl.on('line', (userInput) => {
            response = userInput;
            resolve(response);
        });

        rl.on('close', () => {
            resolve(response);
        });
    });
};