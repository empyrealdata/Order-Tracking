'use strict';
var MongoClient = require('mongodb').MongoClient;
var randomstring = require('randomstring');
var url = "mongodb://localhost:27017/";


/**
 * Delete Job
 * This can only be done by the logged in user.
 *
 * auth_Token String 
 * jobId String The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteJob = function(auth_Token,jobId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get user by user name
 * 
 *
 * auth_Token String 
 * jobId String The name that needs to be fetched. Use user1 for testing. 
 * returns Job
 **/
exports.getjobById = function(auth_Token,jobId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "status" : "status"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * List of jobs
 * This can only be done by the logged in user.
 *
 * auth_Token String 
 * body Job job filter
 * no response value expected for this operation
 **/
exports.listOfjobs = function(auth_Token,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Add Job
 * This can only be done by the logged in user.
 *
 * auth_Token String 
 * body LoginRequest Job object
 * no response value expected for this operation
 **/
exports.newjob = function(auth_Token,body) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("inRangeDb");
      dbo.collection("jobs").insertOne(body, function (err, res) {
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
 * Updated Job
 * This can only be done by the logged in user.
 *
 * auth_Token String 
 * jobId String name that need to be updated
 * body Job Updated Job object
 * no response value expected for this operation
 **/
exports.updateJob = function(auth_Token,jobId,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}















