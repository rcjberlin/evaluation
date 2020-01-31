const fetch = require("node-fetch");
const config = require("./config.js");


const URL_TEAMS = "https://rcjberlin.github.io/rcj-dss/competitions.json";
const URL_RUNS = "https://rcj.pythonanywhere.com/api/v1/get_runs";

const COMPETITION_ID_ENTRY = "2020-berlin-entry";
const COMPETITION_ID_LINE = "2020-berlin-line";

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
        return {
            teamsEntry: json.entry.teams,
            teamsLine: json.line.teams
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