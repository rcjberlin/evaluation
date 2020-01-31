const fetchData = require("./fetchData.js");
const standings = require("./standings.js");

const RUN_IDS_ENTRY = ["Arena A", "Arena B", "3"];
const RUN_IDS_LINE = ["Arena C", "Arena D", "3"];

fetchData.fetchAllData()
.then(([{teamsEntry, teamsLine}, {runsEntry, runsLine}]) => {
    let standingsEntry = standings.initializeStandings(teamsEntry, RUN_IDS_ENTRY);
    standingsEntry = standings.insertRunsIntoStandings(standingsEntry, runsEntry);
    standingsEntry = standings.calculateTotalScoreAndCreateRanking(standingsEntry, 2);

    let standingsLine = standings.initializeStandings(teamsLine, RUN_IDS_LINE);
    standingsLine = standings.insertRunsIntoStandings(standingsLine, runsLine);
    standingsLine = standings.calculateTotalScoreAndCreateRanking(standingsLine, 2);
    
    // TODO: write/export
});
