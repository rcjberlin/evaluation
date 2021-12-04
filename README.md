# rcjberlin - evaluation

1. Fetch runs from API (see https://github.com/rcjberlin/rcj-server)
2. Calculate standings
3. Export to CSV and JSON

This repository includes the code to create the standings but it will also include the live-results.
The results will be pushed during competition to make them available for further use via GitHub Pages on https://rcjberlin.github.io/evaluation/results.

## setup

Since the API is restricted to authorized users, you need to specify your credentials in _config.js_.
Additionally, some constants are configured there.
```js
module.exports = {
    username: "username",
    //password: require("./config.secret.ignore").password,
    password: "mypassword",
    rcj_server_hostname: "http://localhost:5000",
    competition: "2022-berlin",
}
```

Install all required packages with `npm install` and start the script with `node index.js`.
