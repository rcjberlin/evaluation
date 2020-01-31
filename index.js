const fetchData = require("./fetchData.js");
const standings = require("./standings.js");
const fileExport = require("./fileExport.js");

const RUN_IDS_ENTRY = ["Arena A", "Arena B", "3"];
const RUN_IDS_LINE = ["Arena C", "Arena D", "3"];

const FILENAME_ENTRY = "standingsEntry";
const FILENAME_LINE = "standingsLine";

fetchData.fetchAllData()
.then(([{teamsEntry, teamsLine}, {runsEntry, runsLine}]) => {
    let standingsEntry = standings.initializeStandings(teamsEntry, RUN_IDS_ENTRY);
    standingsEntry = standings.insertRunsIntoStandings(standingsEntry, runsEntry);
    standingsEntry = standings.calculateTotalScoreAndCreateRanking(standingsEntry, 2);
    let tableEntry = standings.getTable(standingsEntry, RUN_IDS_ENTRY);
    fileExport.saveAsJSON(tableEntry, FILENAME_ENTRY);
    fileExport.saveAsCSV(tableEntry, FILENAME_ENTRY);

    let standingsLine = standings.initializeStandings(teamsLine, RUN_IDS_LINE);
    standingsLine = standings.insertRunsIntoStandings(standingsLine, runsLine);
    standingsLine = standings.calculateTotalScoreAndCreateRanking(standingsLine, 2);
    let tableLine = standings.getTable(standingsLine, RUN_IDS_LINE);
    fileExport.saveAsJSON(tableLine, FILENAME_LINE);
    fileExport.saveAsCSV(tableLine, FILENAME_LINE);
});
