'use strict';

var utils = require('../utils/writer.js');
var Job = require('../service/JobService');

module.exports.deleteJob = function deleteJob (req, res, next) {
  var auth_Token = req.swagger.params['auth_Token'].value;
  var jobId = req.swagger.params['jobId'].value;
  Job.deleteJob(auth_Token,jobId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getjobById = function getjobById (req, res, next) {
  var auth_Token = req.swagger.params['auth_Token'].value;
  var jobId = req.swagger.params['jobId'].value;
  Job.getjobById(auth_Token,jobId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listOfjobs = function listOfjobs (req, res, next) {
  var auth_Token = req.swagger.params['auth_Token'].value;
  var body = req.swagger.params['body'].value;
  Job.listOfjobs(auth_Token,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.newjob = function newjob (req, res, next) {
  var body = req.swagger.params['body'].value;
  Job.newjob("",body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateJob = function updateJob (req, res, next) {
  var auth_Token = req.swagger.params['auth_Token'].value;
  var jobId = req.swagger.params['jobId'].value;
  var body = req.swagger.params['body'].value;
  Job.updateJob(auth_Token,jobId,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.chatHistory = function chatHistory (req, res, next) {
  var providerId = req.swagger.params['providerId'].value;
  var customerId = req.swagger.params['customerId'].value;
  Job.chatHistory(providerId,customerId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.myChats = function myChats (req, res, next) {
  var userid = req.swagger.params['userid'].value;
  Job.myChats(userid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};