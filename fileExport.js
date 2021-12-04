const fs = require("fs");

const PATH = "results/";

exports.saveAsJSON = function (table, name) {
    let content = JSON.stringify(table); //, null, 2);
    //content = content.replace(/\}\]\},/g, "}]},\n"); // insert a line-break after each team
    saveFile(PATH + name + ".json", content);
};

exports.saveAsCSV = function (table, name) {
    let csv = "";
    for (let row of table) {
        for (let i=0; i<row.length; i++) {
            csv += (i === 0 ? "" : ";") + "\"" + String(row[i]).replace(/\"/g, "\"\"") + "\"";
        }
        csv += "\n";
    }
    saveFile(PATH + name + ".csv", csv)
};

let saveFile = function (filename, content) {
    fs.writeFile(filename, content, "utf8", (err) => {
        if (err) {
            console.log("Error occurred while saving " + filename);
            console.log(err);
            return;
        }
        console.log("Wrote successfully to " + filename);
    });
};

exports.readJSON = function (name) {
    const fileContent = fs.readFileSync(PATH + name + ".json", "utf-8");
    try {
        return JSON.parse(fileContent);
    } catch {
        return {};
    }
};
