const fetchData = require("./fetchData.js");
const { Standings } = require("./standings.js");
const fileExport = require("./fileExport.js");

const RUN_IDS_ENTRY = ["Arena A", "Arena B", "3"];
const RUN_IDS_LINE = ["Arena C", "Arena D", "3"];

const FILENAME_ENTRY = "standingsEntry";
const FILENAME_LINE = "standingsLine";

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

// TODO: add/update instead of overwrite
fileExport.saveAsJSON({
    line: (new Date()).getTime(),
    lineEntry: (new Date()).getTime(),
    maze: 1583068739191,
    mazeEntry: 1583068739191
}, "_lastUpdate");
