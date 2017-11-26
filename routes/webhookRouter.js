const express = require('express');
const bodyParser = require('body-parser');
const webhookRouter  = express.Router();
var releases = require('../public/javascripts/fetcher');


webhookRouter.use(bodyParser.json());

webhookRouter.route('/')
.post((req, res, next) => {
  if(res) {
    response = "This is a sample response from your webhook!" //Default response from the webhook to show it's working

    res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
    res.send(JSON.stringify({ "speech": response, "displayText": response
    //"speech" is the spoken version of the response, "displayText" is the visual version
    }));
  }else{
    var error = new Error('You are not allowed to delete other than own comments');
    error.statusCode = 403;
    return next(error);
  }
}, (err)=>next(err))

module.exports = webhookRouter;
