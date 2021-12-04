const fetch = require("node-fetch");
const config = require("./config.js");


const URL_TEAMS = `${config.rcj_server_hostname}/schedule/json/teams.json`;
const URL_RUNS = `${config.rcj_server_hostname}/api/v1/get_runs`;

const COMPETITION_ID_ENTRY = `${config.competition}-line-entry`;
const COMPETITION_ID_LINE = `${config.competition}-line`;

exports.fetchAllData = function () {
    return Promise.all([
        fetchTeams(),
        fetchRuns()
    ]);
};

let fetchTeams = function () {
    return fetch(URL_TEAMS, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((json) => {
        const teamsEntry = [], teamsLine = [];
        for (const teamObj of json) {
            if (teamObj.competition === "line-entry") {
                teamsEntry.push(teamObj.name);
            } else if (teamObj.competition === "line") {
                teamsLine.push(teamObj.name);
            }
        }
        return {
            teamsEntry,
            teamsLine
        };
    });
};

let fetchRuns = function () {
    return fetch(URL_RUNS, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + encodeBase64(config.username + ":" + config.password)
        }
    })
    .then((response) => response.json())
    .then((json) => {
        return {
            runsEntry: json.runs.filter(filterRunsEntry),
            runsLine: json.runs.filter(filterRunsLine)
        };
    });
};

let filterRunsEntry = function (run) {
    return run.competition === COMPETITION_ID_ENTRY;
};

let filterRunsLine = function (run) {
    return run.competition === COMPETITION_ID_LINE;
};

let encodeBase64 = function (text) {
    return Buffer.from(text).toString('base64');
};