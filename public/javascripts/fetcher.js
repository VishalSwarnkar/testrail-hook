// var fetch = require('promise-path').fetch
var request = require('request-promise');
var url = "https://bbcpodtest.testrail.com/index.php?/api/v2/get_plans/"

function clone (data) {
  return JSON.parse(JSON.stringify(data))
}

function getData(project_id) {
  console.log(url+project_id);
  return request({
        encoding: 'utf8',
        uri: url+project_id,
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + new Buffer(username + ':' + apikey).toString('base64')
        },
        setTimeout: 1000
    });

}

module.exports = {
  fetch: getData
}
