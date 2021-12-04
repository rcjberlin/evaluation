const fetchData = require("./fetchData.js");
const { Standings } = require("./standings.js");
const fileExport = require("./fileExport.js");

const RUN_IDS_ENTRY = ["A", "B", "3"];
const RUN_IDS_LINE = ["C", "D", "3"];

const FILENAME_ENTRY = "standingsEntry";
const FILENAME_LINE = "standingsLine";
const FILENAME_LAST_UPDATE = "_lastUpdate";

function calculate() {
    console.log("Calculate standings...");
    fetchData.fetchAllData()
    .then(([{teamsEntry, teamsLine}, {runsEntry, runsLine}]) => {
        let standingsEntry =  new Standings(teamsEntry, RUN_IDS_ENTRY, runsEntry, 2);
        let tableEntry = standingsEntry.getStandingsAsTable();
        fileExport.saveAsJSON(tableEntry, FILENAME_ENTRY);
        fileExport.saveAsCSV(tableEntry, FILENAME_ENTRY);
        
        let standingsLine = new Standings(teamsLine, RUN_IDS_LINE, runsLine, 2);
        let tableLine = standingsLine.getStandingsAsTable();
        fileExport.saveAsJSON(tableLine, FILENAME_LINE);
        fileExport.saveAsCSV(tableLine, FILENAME_LINE);
    });
    
    fileExport.saveAsJSON({
        ...fileExport.readJSON(FILENAME_LAST_UPDATE),
        line: (new Date()).getTime(),
        lineEntry: (new Date()).getTime(),
    }, FILENAME_LAST_UPDATE);
}

if (require.main === module) {
    calculate();
} else {
    module.exports = calculate;
}
