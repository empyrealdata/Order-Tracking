'use strict';

var utils = require('../utils/writer.js');
var Account = require('../service/AccountService');

module.exports.changePassword = function changePassword (req, res, next) {
  var userId = req.swagger.params['userId'].value;
  var auth_Token = req.swagger.params['auth_Token'].value;
  var body = req.swagger.params['body'].value;
  Account.changePassword(userId,auth_Token,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.forgetpassword = function forgetpassword (req, res, next) {
  var mobileNumber = req.swagger.params['mobileNumber'].value;
  var auth_Token = req.swagger.params['auth_Token'].value;
  var body = req.swagger.params['body'].value;
  Account.forgetpassword(mobileNumber,auth_Token,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.loginUser = function loginUser (req, res, next) {
  var body = req.swagger.params['body'].value;
  Account.loginUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.logoutUser = function logoutUser (req, res, next) {
  var auth_Token = req.swagger.params['auth_Token'].value;
  Account.logoutUser(auth_Token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
