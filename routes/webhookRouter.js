const express = require('express');
const bodyParser = require('body-parser');
const webhookRouter  = express.Router();
var releases = require('../public/javascripts/fetcher');


webhookRouter.use(bodyParser.json());

webhookRouter.route('/')
.post((req, res, next) => {
  if(req.body.result.action == 'default') {
    response = "This is a sample response from your webhook!" //Default response from the webhook to show it's working

    res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
    res.send(JSON.stringify({ "speech": response, "displayText": response
    //"speech" is the spoken version of the response, "displayText" is the visual version
    }));
  }else{
    projectId = req.body.result.parameters.projectId;
    // console.log(`Request body details ${JSON.stringify(req.body)}`);
    releases.fetch(projectId).then((regressionSuites)=>{
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json');
      var regressionList = JSON.parse(regressionSuites).map(a=> a.name)
      res.send(JSON.stringify({"speech": regressionList.toString(), "displayText": regressionList.toString()}));
    }, (err)=>next(err))
    .catch((error)=>next(error));
  // }else{
  //   var error = new Error('Unble to get the response');
  //   error.statusCode = 403;
  //   return next(error);
  }
}, (err)=>next(err))

module.exports = webhookRouter;
