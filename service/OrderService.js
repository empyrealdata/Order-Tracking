'use strict';


/**
 * Add Order
 * This can only be done by the logged in user.
 *
 * auth_Token String 
 * body Order Order object
 * no response value expected for this operation
 **/
exports.newOrder = function(body) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("inRangeDb");
      dbo.collection("orders").insertOne(body, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        console.log("response : " + res.ops[0]);
        db.close();
        resolve(res.ops[0]);
      });
    });
  });
}


/**
 * Delete Order
 * This can only be done by the logged in user.
 *
 * auth_Token String 
 * orderId String The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteOrder = function(auth_Token,orderId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get user by user name
 * 
 *
 * auth_Token String 
 * orderId String The name that needs to be fetched. Use user1 for testing. 
 * returns Order
 **/
exports.getOrderById = function(auth_Token,orderId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "petId" : 6,
  "quantity" : 1,
  "id" : 0,
  "shipDate" : "2000-01-23T04:56:07.000+00:00",
  "complete" : false,
  "status" : "placed"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * List of Orders
 * This can only be done by the logged in user.
 *
 * auth_Token String 
 * body Order Order filter
 * no response value expected for this operation
 **/
exports.listOfOrders = function(auth_Token,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Updated Order
 * This can only be done by the logged in user.
 *
 * auth_Token String 
 * orderId String name that need to be updated
 * body Order Updated Order object
 * no response value expected for this operation
 **/
exports.updateOrder = function(auth_Token,orderId,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

