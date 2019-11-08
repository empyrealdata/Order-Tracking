'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');
var Account = require('../service/AccountService');

module.exports.createUser = function createUser(req, res, next) {
  var body = req.swagger.params['body'].value;
  console.log("conttroller user");
  Account.checkAccount(body.mobileNumbers[0])
    .then(function (response) {
      if (!response) {
        User.createUser(body)
          .then(function (createResponse) {
            Account.addAccount(createResponse.mobileNumbers[0], createResponse._id)
            var successResponse = {
              "meta": {
                "code": 200,
                "messge": "successfully added"
              },
              user: createResponse
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

module.exports.deleteUser = function deleteUser(req, res, next) {

  console.log("deleteUser user");
  var auth_Token = req.swagger.params['auth_Token'].value;
  var userId = req.swagger.params['userId'].value;
  User.deleteUser(auth_Token, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserByName = function getUserByName(req, res, next) {
  console.log("getUserByName user");
  var auth_token = req.swagger.params['auth_Token'].value;
  var userId = req.swagger.params['userId'].value;
  Account.checkAuth(auth_token)
  .then(function(getUserResponse){
  User.getUserByName(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
  })
};

module.exports.updateUser = function updateUser(req, res, next) {
  console.log("updateUser user");
  var auth_Token = req.swagger.params['auth_Token'].value;
  var userId = req.swagger.params['userId'].value;
  var body = req.swagger.params['body'].value;
  User.updateUser(auth_Token, userId, body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
