exports.Standings = class {
    constructor (listOfTeamnames, runIds, runs, numberOfRunsToCount) {
        this.standings = [];
        this.listOfTeamnames = listOfTeamnames;
        this.runIds = runIds;
        this.runs = runs;
        this.numberOfRunsToCount = numberOfRunsToCount;

        this.initializeStandings();
        this.insertRunsIntoStandings();
        this.calculateTotalScoreAndCreateRanking();
    }

    initializeStandings () {
        this.standings = [];
        for (let i=0; i<this.listOfTeamnames.length; i++) {
            this.standings.push({
                rank: null,
                teamname: this.listOfTeamnames[i],
                score: null,
                time: null,
                runs: []
            });
            for (let j=0; j<this.runIds.length; j++) {
                this.standings[i].runs.push({
                    id: this.runIds[j],
                    score: null,
                    time: null
                });
            }
        }
    }

    insertRunsIntoStandings () {
        for (let run of this.runs) {
            let team = this.standings.find((team) => team.teamname === run.teamname);
            if (team) {
                // correct team in standings found, now find correct run in standings (by id)
                // try to find by round first, otherwise by arena
                let runStanding = team.runs.find((runStanding) => runStanding.id == run.round) ||
                                    team.runs.find((runStanding) => runStanding.id == run.arena);
                if (runStanding) {
                    runStanding.score = run.score;
                    runStanding.time = run.time_duration;
                } else {
                    console.log("couldn't match to run in standings: ", run);
                }
            } else {
                console.log("teamname not found in standings: ", run);
            }
        }
    }

    calculateTotalScoreAndCreateRanking () {
        this.calculateScoreForEachTeam();
        this.sortTeamsByScore();
        this.setRankForEachTeam();
    }

    calculateScoreForEachTeam () {
        for (let team of this.standings) {
            team.runs.sort((run1, run2) => compareByScoreAndTime(run1, run2));
            team.score = 0;
            team.time = 0;
            for (let i=0; i<this.numberOfRunsToCount; i++) {
                team.score += team.runs[i].score;
                team.time += team.runs[i].time;
            }
        }
    }

    sortTeamsByScore () {
        this.standings.sort((team1, team2) => compareByScoreAndTime(team1, team2));
    }

    setRankForEachTeam () {
        let rank = 1;
        for (let i=0; i<this.standings.length; i++) {
            if (i > 0 && compareByScoreAndTime(this.standings[i], this.standings[i-1]) !== 0) {
                rank = i+1;
            }
            this.standings[i].rank = rank;
        }
    }


    getStandingsAsTable () {
        let table = [];

        table.push(["#","Team","Punktzahl","Zeit"]);
        for (let runId of this.runIds) {
            table[0].push("Punkte ("+String(runId).slice(-1)+")");
            table[0].push("Zeit ("+String(runId).slice(-1)+")");
        }

        for (let team of this.standings) {
            table.push([
                team.rank,
                team.teamname,
                team.score,
                team.time
            ]);
            for (let runId of this.runIds) {
                let run = team.runs.find((run) => run.id === runId);
                table[table.length-1].push(run.score);
                table[table.length-1].push(run.time);
            }
        }

        return table;
    }
}

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
