const fetch = require("node-fetch");
const config = require("./config.js");

let encodeBase64 = function (text) {
    return Buffer.from(text).toString('base64');
};


const url = "https://rcj.pythonanywhere.com/api/v1/get_runs";

fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + encodeBase64(config.username + ":" + config.password)
    }
})
.then((response) => response.json())
.then(json => {
    console.log(json);
})
.catch((error) => {
    console.log(error);
});