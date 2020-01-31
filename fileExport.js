const fs = require("fs");

const PATH = "results/";

exports.saveAsJSON = function (standings, name) {
    let data = {
        standings: standings,
        lastUpdate: (new Date()).getTime()
    }
    let content = JSON.stringify(data); //, null, 2);
    //content = content.replace(/\}\]\},/g, "}]},\n"); // insert a line-break after each team
    saveFile(PATH + name + ".json", content);
};

exports.saveAsCSV = function (standings, name, runIds) {
    // TODO
};

let saveFile = function (filename, content) {
    fs.writeFile(filename, content, "utf8", (err) => {
        if (err) {
            console.log("Error occurred while saving " + filename);
            console.log(err);
            return;
        }
    });
};