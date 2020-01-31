exports.initializeStandings = function (listOfTeamnames, runIds) {
    let standings = [];
    for (let i=0; i<listOfTeamnames.length; i++) {
        standings.push({
            rank: null,
            teamname: listOfTeamnames[i],
            score: null,
            time: null,
            runs: []
        });
        for (let j=0; j<runIds.length; j++) {
            standings[i].runs.push({
                id: runIds[j],
                score: null,
                time: null
            });
        }
    }
    return standings;
};

exports.insertRunsIntoStandings = function (standings, runs) {
    for (let run of runs) {
        let team = standings.find((team) => team.teamname === run.teamname);
        if (team) {
            // correct team in standings found, now find correct run in standings (by id)
            // try to find by round first, otherwise by arena
            let runStanding = team.runs.find((runStanding) => runStanding.id == run.round) ||
                                team.runs.find((runStanding) => runStanding.id == run.arena);
            if (runStanding) {
                runStanding.score = run.score;
                runStanding.time = run.time_duration;
                console.log("inserted");
            } else {
                console.log("couldn't match to run in standings: ", run);
            }
        } else {
            console.log("teamname not found in standings: ", run);
        }
    }
    return standings;
};

exports.calculateTotalScoreAndCreateRanking = function (standings, numberOfRunsToCount) {
    // sort runs by score and time (https://stackoverflow.com/a/979289)
    return standings;
};