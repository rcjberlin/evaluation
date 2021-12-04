const express = require("express");
const config = require("./config.js");
const calculateStandings = require("./calc");
const app = express();
app.use(express.json());

const TOKEN_TYPE = "Bearer";
app.use((req, res, next) => {
  if (req.url === "/") {
    return res.json({
      successful: true,
      message: "Service running",
    });
  }
  try {
    if (
      req.headers.authorization.startsWith(TOKEN_TYPE + " ") &&
      config.accepted_auth_tokens.includes(
        req.headers.authorization.slice(TOKEN_TYPE.length + 1)
      )
    ) {
      return next();
    } else {
      throw new Error("");
    }
  } catch {
    return res.status(401).json({
      successful: false,
      message: "Unauthorized",
    });
  }
});

app.post("/calc", (_req, res) => {
  try {
    runFunctionAtMostOncePerInterval(calculateStandings, config.calc_interval);
  } catch {}
  res.status(200).json({
    successful: true,
    message: "Calculating standings...",
  });
});

function now() {
  return Math.floor(Date.now() / 1000);
}
// calculate standings once when starting server (might have been offline some time)
calculateStandings();
let lastExecution = now();
let alreadyScheduled = false;
function runFunctionAtMostOncePerInterval(func, intervalInSeconds = 60) {
  if (alreadyScheduled) {
    // execution already scheduled, will happen shortly
  } else if (now() - lastExecution > intervalInSeconds) {
    // last execution happened already some time ago -> execute directly
    func();
    lastExecution = now();
  } else {
    // wait some time before executing function
    alreadyScheduled = true;
    setTimeout(() => {
      func();
      lastExecution = now();
      alreadyScheduled = false;
    }, Math.max(1, 1000 * (intervalInSeconds - (now() - lastExecution))));
  }
}

app.listen(config.port, () => {
  console.log(
    `rcjberlin-evaluation listening at port http://localhost:${config.port}`
  );
});
