# rcjberlin - evaluation
1. Fetch runs from API (see https://github.com/rcjberlin/rcj-server)
2. Calculate standings
3. Export to CSV and JSON

This repository includes the code to create the standings but it will also include the live-results.
The results will be pushed during competition to make them available for further use via GitHub Pages on https://rcjberlin.github.io/evaluation/results.

## setup
Since the API is restricted to authorized users, you need to specify your credentials in _config.js_:
```
module.exports = {
    username: "username",
    password: "mypassword",
}
```

Install all required packages with `npm install` and start the script with `node index.js`.
