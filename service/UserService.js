'use strict';
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectId = require('mongodb').ObjectID;



/**
 * Create user
 * This can only be done by the logged in user.
 *
 * body AddUserRequest Created user object
 * returns User
 **/
exports.createUser = function (body) {
  console.log("create user")
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("inRangeDb");
      dbo.collection("users").insertOne(body, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        console.log("response : " + res.ops[0]);
        db.close();
        resolve(res.ops[0]);
      });
    });

    //     var examples = {};
    //     examples['application/json'] = {
    //   "emails" : [ "jaga@gmail.com", "test@gmail.com" ],
    //   "firstName" : "firstName",
    //   "lastName" : "lastName",
    //   "mobileNumbers" : [ "mobileNumbers", "mobileNumbers" ],
    //   "dob" : "2000-01-23T04:56:07.000+00:00",
    //   "permissions" : [ {
    //     "name" : "name",
    //     "permission" : "permission",
    //     "id" : "id"
    //   }, {
    //     "name" : "name",
    //     "permission" : "permission",
    //     "id" : "id"
    //   } ],
    //   "rating" : 0.80082819046101150206595775671303272247314453125,
    //   "userType" : "userType",
    //   "userId" : "userId",
    //   "businesses" : {
    //     "imgUrl" : "imgUrl",
    //     "catId" : "catId",
    //     "rating" : 6.02745618307040320615897144307382404804229736328125,
    //     "subCatId" : "subCatId",
    //     "name" : "name"
    //   }
    // };
    // if (Object.keys(examples).length > 0) {
    //   resolve(examples[Object.keys(examples)[0]]);
    // } else {
    //   resolve();
    // }
  });
}


/**
 * Delete user
 * This can only be done by the logged in user.
 *
 * auth_Token String 
 * userId String The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteUser = function (auth_Token, userId) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


/**
 * Get user by user name
 * 
 *
 * auth_Token String 
 * userId String The id that needs to be fetched.
 * returns User
 **/
exports.getUserByName = function (userId) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("inRangeDb");
      var request = {
        _id: userId
      };
      dbo.collection("users").find(request).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
        var i;
        for(i = 0; i < result.length; i++){
          result[i].id = result[i]._id;
      }
        resolve(result)
      });
    });
    // var examples = {};
    // examples['application/json'] = {
    //   "emails": ["emails", "emails"],
    //   "firstName": "firstName",
    //   "lastName": "lastName",
    //   "mobileNumbers": ["mobileNumbers", "mobileNumbers"],
    //   "dob": "2000-01-23T04:56:07.000+00:00",
    //   "permissions": [{
    //     "name": "name",
    //     "permission": "permission",
    //     "id": "id"
    //   }, {
    //     "name": "name",
    //     "permission": "permission",
    //     "id": "id"
    //   }],
    //   "rating": 0.80082819046101150206595775671303272247314453125,
    //   "userType": "userType",
    //   "userId": "userId",
    //   "businesses": {
    //     "imgUrl": "imgUrl",
    //     "catId": "catId",
    //     "rating": 6.02745618307040320615897144307382404804229736328125,
    //     "subCatId": "subCatId",
    //     "name": "name"
    //   }
    // };
    // if (Object.keys(examples).length > 0) {
    //   resolve(examples[Object.keys(examples)[0]]);
    // } else {
    //   resolve();
    // }
  });
}


/**
 * Updated user
 * This can only be done by the logged in user.
 *
 * auth_Token String 
 * userId String name that need to be updated
 * body AddUserRequest Updated user object
 * no response value expected for this operation
 **/
exports.updateUser = function (auth_Token, userId, body) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}

/**
 * Updated user
 * This can only be done by the logged in user.
 *
 * auth_Token String 
 * userId String name that need to be updated
 * body AddUserRequest Updated user object
 * no response value expected for this operation
 **/
exports.updateLoc = function (userId, body) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
    var dbo = db.db("inRangeDb");
    dbo.collection("users").updateOne({
      _id: ObjectId(userId)
    }, 
    {$set: {
      location: body.location
    }},{ upsert: false }, function (err, res) {
      if (err) throw err;
      console.log("response : " + res);
      resolve(res)
    });
  });
});
}


/**
 * Updated user
 * This can only be done by the logged in user.
 *
 * auth_Token String 
 * userId String name that need to be updated
 * body AddUserRequest Updated user object
 * no response value expected for this operation
 **/
exports.providerList = function (userId, body) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
    var dbo = db.db("inRangeDb");
    dbo.collection("users").find({
      type: "provider"
    },{firstName: true, mobileNumbers: false, emails:false}).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      var i;
      for(i = 0; i < result.length; i++){
        result[i].id = result[i]._id;
    }
      var response = {
        "users": result,
        "meta" : {
          "code":200,
          "message":"success"
        }
      }
      resolve(response)
    });
  });
});
}