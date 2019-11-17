'use strict';
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
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
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("inRangeDb");
      var request = {
        _id: ObjectId(jobId)
      };
      dbo.collection("jobs").remove(request, function (err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result));
        db.close();
        resolve(result)
      });
    });
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
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("inRangeDb");
      var request = {
        _id: ObjectId(jobId)
      };
      dbo.collection("jobs").find(request).toArray(function (err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result));
        db.close();
        resolve(result)
      });
    });
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
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("inRangeDb");
      dbo.collection("jobs").find(body).toArray(function (err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result));
        db.close();
        resolve(result)
      });
    });
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
// exports.newjob = function(auth_Token,body) {
//   return new Promise(function (resolve, reject) {
//     MongoClient.connect(url, function (err, db) {
//       if (err) throw err;
//       var dbo = db.db("inRangeDb");
//       dbo.collection("jobs").insertOne(body, function (err, res) {
//         if (err) throw err;
//         console.log("1 document inserted");
//         console.log("response : " + res.ops[0]);
//         db.close();
//         resolve(res.ops[0]);
//       });
//     });
//   });
// }


exports.newjob = function(auth_Token,body) {
return new Promise(function (resolve, reject) {
  MongoClient.connect(url, function (err, db) {
  var dbo = db.db("inRangeDb");
  dbo.collection("jobs").updateOne({
    "consumerInfo.consumerId": body.consumerInfo.consumerId,
    "providerInfo.providerId": body.providerInfo.providerId
  }, 
  {$set: {
    consumerInfo: body.consumerInfo,
    providerInfo: body.providerInfo,
    isExplored: body.isExplored
  },$push: {
    conversations: body.conversation,
  },
},{ upsert: true }, function (err, res) {
    if (err) throw err;
    // console.log("response : " + res);
    // resolve(res)
    var request = {
      "consumerInfo.consumerId": body.consumerInfo.consumerId,
      "providerInfo.providerId": body.providerInfo.providerId
    };
    dbo.collection("jobs").find(request).toArray(function (err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result));
      db.close();
      var i;
      for(i = 0; i < result.length; i++){
        result[i].id = result[i]._id;
    }
      if(result.length > 0){
      resolve(result[0])
      }else{
        result()
      }
    });
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


/**
 * Get user by user name
 * 
 *
 * auth_Token String 
 * jobId String The name that needs to be fetched. Use user1 for testing. 
 * returns Job
 **/
exports.chatHistory = function(providerId,customerId) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("inRangeDb");
      var request = {
        "consumerInfo.consumerId": customerId,
        "providerInfo.providerId": providerId
      };
      dbo.collection("jobs").findOne(request, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result));
        db.close();
        if(result){
          result.id = result._id;
          }
        resolve(result)
      });
    });
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
exports.myChats = function(userid) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("inRangeDb");
      var request = {$or :[
        {"consumerInfo.consumerId": userid},
        {"providerInfo.providerId": userid}
      ]
      };
      dbo.collection("jobs").find(request).toArray(function (err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result));
        db.close();
        var i;
        for(i = 0; i < result.length; i++){
          result[i].id = result[i]._id;
      }
      var response = {
        "chatResponses":result
      }
        resolve(response)
      });
    });
  });
}