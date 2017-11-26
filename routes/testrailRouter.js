const express = require('express');
const bodyParser = require('body-parser');
const testrailRouter  = express.Router();
var releases = require('../public/javascripts/fetcher');


testrailRouter.use(bodyParser.json());

testrailRouter.route('/:project_id')
.get((req, res, next) => {
  releases.fetch(req.params.project_id).then((regressionSuites)=>{
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json');
    var regressionList = JSON.parse(regressionSuites).map(a=> a.name)
    res.json(regressionList);
  }, (err)=>next(err))
  .catch((error)=>next(error));
})



module.exports = testrailRouter;
