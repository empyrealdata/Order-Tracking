'use strict';

var utils = require('../utils/writer.js');
var Account = require('../service/AccountService');
var User = require('../service/UserService');

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


module.exports.registerAccount = function registerAccount (req, res, next) {
  var body = req.swagger.params['body'].value;
  console.log("conttroller user");
  Account.checkAccount(body.user.mobileNumbers[0])
    .then(function (response) {
      if (!response) {
        User.createUser(body.user)
          .then(function (createResponse) {
            Account.registerAccount(body, createResponse._id)
            var successResponse = {
              "meta": {
                "code": 200,
                "messge": "successfully added"
              },
              registerResponse: createResponse
            }
            var examples = {};
            examples['application/json'] = successResponse
            utils.writeJson(res, examples[Object.keys(examples)[0]]);
          })
          .catch(function (response) {
            utils.writeJson(res, response);
          });
      }
      else {
        var failResponse = {
          "meta": {
            "code": 405,
            "messge": "user already exists"
          }
        }
        utils.writeJson(res, failResponse);
      }
    })
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
      var examples = {};
      if (Object.keys(response).length > 0) {
        User.getUserByName(response[Object.keys(response)[0]].userid)
        .then(function(getUserResponse){
        response[Object.keys(response)[0]].user = getUserResponse[0]
          utils.writeJson(res, response[Object.keys(response)[0]]);
        })
        .catch(function (response) {
          utils.writeJson(res, response);
        });
      } else {
        var examples = {};
        examples['application/json'] = {
          "meta": {
            "code": 405,
            "message": "invalid username and password"
          },
        }
        if (Object.keys(examples).length > 0) {
          resolve(examples[Object.keys(examples)[0]]);
        } else {
          resolve();
        }
        utils.writeJson(res, response);
      }
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
