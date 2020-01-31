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
    // sort runs for each team and calculate sum for each team
    for (let team of standings) {
        team.runs.sort((run1, run2) => compareByScoreAndTime(run1, run2));
        team.score = 0;
        team.time = 0;
        for (let i=0; i<numberOfRunsToCount; i++) {
            team.score += team.runs[i].score;
            team.time += team.runs[i].time;
        }
    }

    // sort teams
    standings.sort((team1, team2) => compareByScoreAndTime(team1, team2))

    // save rank
    let rank = 1;
    for (let i=0; i<standings.length; i++) {
        if (i > 0 && compareByScoreAndTime(standings[i], standings[i-1]) !== 0) {
            rank = i+1;
        }
        standings[i].rank = rank;
    }

    return standings;
};

let compareByScoreAndTime = function (run1, run2) {
    // sort from best/highest to worst: -1 if run1 is better, +1 if worse
    if (run1.score > run2.score) {
        return -1;
    } else if (run1.score < run2.score) {
        return 1;
    } else if (run1.time < run2.time) {
        return -1;
    } else if (run1.time > run2.time) {
        return 1;
    } else {
        return 0;
    }
};
