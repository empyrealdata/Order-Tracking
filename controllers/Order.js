'use strict';

var utils = require('../utils/writer.js');
var Order = require('../service/OrderService');
var Account = require('../service/AccountService');

module.exports.newOrder = function newOrder (req, res, next) {
  var auth_Token = req.swagger.params['auth_Token'].value;
  var body = req.swagger.params['body'].value;
  Account.checkAuth(auth_Token)
  .then(function (authResponse) {
    if (authResponse) {
      Order.newOrder(body)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
    }
  })
};

module.exports.deleteOrder = function deleteOrder (req, res, next) {
  var auth_Token = req.swagger.params['auth_Token'].value;
  var orderId = req.swagger.params['orderId'].value;
  Order.deleteOrder(auth_Token,orderId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getOrderById = function getOrderById (req, res, next) {
  var auth_Token = req.swagger.params['auth_Token'].value;
  var orderId = req.swagger.params['orderId'].value;
  Order.getOrderById(auth_Token,orderId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listOfOrders = function listOfOrders (req, res, next) {
  var auth_Token = req.swagger.params['auth_Token'].value;
  var body = req.swagger.params['body'].value;
  Order.listOfOrders(auth_Token,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateOrder = function updateOrder (req, res, next) {
  var auth_Token = req.swagger.params['auth_Token'].value;
  var orderId = req.swagger.params['orderId'].value;
  var body = req.swagger.params['body'].value;
  Order.updateOrder(auth_Token,orderId,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
