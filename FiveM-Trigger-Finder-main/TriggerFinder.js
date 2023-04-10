// This was made by: nodemon
// And forked/Edited by: XxpichoclesxX#0427

const fs = require("fs");
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const settings = {
    search: ["TriggerServerEvent", "TriggerEvent"],
    params: ["money", "jail", "reward", "venomadmin:setmoney", "esx_illegal_drugs:startHarvestCoke", "YachtRob:AddReward", "esx_vangelico_robbery:gioielli", "esx_drugs:startHarvestAcid", "core_credits:addWinning", "core_credits:taskCompleted", "lester:vendita", "esx:giveInventoryItem", "houseRobberies:giveMoney", "atmRob:server:CompletedRob", "qb-taco:server:reward:money", "esx:spawnVehicle", "esx_status:set", "esx:triggerServerCallback", "qb-clothes:saveOutfit", "esx_license:removeLicense", "74863eff-cfa2-4060-878a-a9ba91c44f31", "74863eff-cfa2-4060-878a-a9ba91c44f31","b1e85c84-9a50-4e1a-ae47-0f53281af4eb", "52cbdfa5-4594-47c5-a87d-a4f6c2c5990e", "52cbdfa5-4594-47c5-a87d-a4f6c2c5990e", "2ce16fdd-7c59-403b-ab13-90059169384f", "d132cac6-dade-44ad-b571-970afa0bc9dd", "FiveEye-cdFiveEye-09FiveEye-01FiveEye-48FiveEye-87FiveEye-21FiveEye-b9FiveEye-c8FiveEye-92FiveEye-a6FiveEye-e7FiveEye-7cFiveEye-42FiveEye-59FiveEye-f9FiveEye-34FiveEye-70FiveEye-76FiveEye-d0FiveEye-b1FiveEye-c9FiveEye-fcFiveEye-5bFiveEye-1cFiveEye-9dFiveEye-9bFiveEye-edFiveEye-91FiveEye-e8FiveEye-b8FiveEye-c5FiveEye-0eFiveEye-5a", "FiveEye-cdFiveEye-09FiveEye-01FiveEye-48FiveEye-2aFiveEye-4cFiveEye-e5FiveEye-c8FiveEye-c7FiveEye-95FiveEye-73FiveEye-66FiveEye-ddFiveEye-94FiveEye-45FiveEye-29FiveEye-00FiveEye-a7FiveEye-83FiveEye-12FiveEye-50FiveEye-c1FiveEye-f5FiveEye-efFiveEye-2dFiveEye-fdFiveEye-46FiveEye-8bFiveEye-7bFiveEye-81FiveEye-04FiveEye-b6", "FiveEye-cdFiveEye-09FiveEye-01FiveEye-48FiveEye-2aFiveEye-4cFiveEye-e5FiveEye-c8FiveEye-c7FiveEye-95FiveEye-73FiveEye-66FiveEye-ddFiveEye-94FiveEye-45FiveEye-29FiveEye-00FiveEye-a7FiveEye-83FiveEye-12FiveEye-50FiveEye-c1FiveEye-f5FiveEye-efFiveEye-2dFiveEye-fdFiveEye-46FiveEye-8bFiveEye-7bFiveEye-81FiveEye-04FiveEye-b6", "17mov_Garbage:UpdateServerPartyBagsCounter", "esx_ambulancejob:rehamzavive", "esx_policejob:requestarrest"],
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
