'use strict';
var MongoClient = require('mongodb').MongoClient;
var randomstring = require('randomstring');
var url = "mongodb://localhost:27017/";
/**
 * Check Account
 *
 * mobileNumber String Mobilenumber fetched respective user
 * body ForgotPasswordRequest Forget User Password
 **/
exports.checkAccount = function (mobileNumber) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("inRangeDb");
      var request = {
        userid: mobileNumber
      };
      dbo.collection("accounts").find(request).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
        resolve(result.length != 0)
      });
    });
  });
}


/**
 * Add Account
 *
 * mobileNumber String Mobilenumber fetched respective user
 * body ForgotPasswordRequest Forget User Password
 **/
exports.addAccount = function (mobileNumber, userId) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("inRangeDb");

      var request = {
        "mno": mobileNumber,
        "userid": userId,
        "password": randomstring.generate(12),
        "isTempPwd": true
      };
      dbo.collection("accounts").insertOne(request, function (err, res) {
        if (err) throw err;
        console.log("response : " + res.ops[0]);
        db.close();
        resolve(res.ops[0]);
      });
    });
  });
}

/**
 * Change Password
 * This can only be done by the logged in user.
 *
 * userId String userId fetched respective user
 * auth_Token String 
 * body ChangePasswordRequest Change User Password
 * returns Meta
 **/
exports.changePassword = function (userId, auth_Token, body) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
    var dbo = db.db("inRangeDb");
    dbo.collection("accounts").updateOne({
      mno: userId,
      password: body.oldPassword
    }, 
    {$set: {
      password: body.newPassword,
      isTempPwd: false
    }},{ upsert: true }, function (err, res) {
      if (err) throw err;
      console.log("response : " + res);
    });
  });
});
}


/**
 * Forget Password
 * This can only be done by the logged in user.
 *
 * mobileNumber String Mobilenumber fetched respective user
 * auth_Token String 
 * body ForgotPasswordRequest Forget User Password
 * returns Meta
 **/
exports.forgetpassword = function (mobileNumber, auth_Token, body) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "code": 0,
      "message": "message"
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Logs user into the system
 * 
 *
 * body LoginRequest Created user object
 * returns LoginResponse
 **/
exports.checkAuth = function (auth_token) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      var dbo = db.db("inRangeDb");
      var request = {
        auth: auth_token
      };
      dbo.collection("session").find(request).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        if (result.length > 0) {
          resolve(result.length)
        }
        db.close();
      });
    });

    // var examples = {};
    // examples['application/json'] = {
    //   "schema": {
    //     "code": 0,
    //     "message": "message"
    //   },
    //   "authToken": "authToken",
    //   "loggedMno": "loggedMno",
    //   "loggeduserId": "loggeduserId",
    //   "user_schema": {
    //     "emails": ["emails", "emails"],
    //     "firstName": "firstName",
    //     "lastName": "lastName",
    //     "mobileNumbers": ["mobileNumbers", "mobileNumbers"],
    //     "dob": "2000-01-23T04:56:07.000+00:00",
    //     "permissions": [{
    //       "name": "name",
    //       "permission": "permission",
    //       "id": "id"
    //     }, {
    //       "name": "name",
    //       "permission": "permission",
    //       "id": "id"
    //     }],
    //     "rating": 0.80082819046101150206595775671303272247314453125,
    //     "userType": "userType",
    //     "userId": "userId",
    //     "businesses": {
    //       "imgUrl": "imgUrl",
    //       "catId": "catId",
    //       "rating": 6.02745618307040320615897144307382404804229736328125,
    //       "subCatId": "subCatId",
    //       "name": "name"
    //     }
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
 * Logs user into the system
 * 
 *
 * body LoginRequest Created user object
 * returns LoginResponse
 **/
exports.loginUser = function (body) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      var dbo = db.db("inRangeDb");
      var request = {
        mno: body.mobileNumber,
        password: body.password
      };
      dbo.collection("accounts").find(request).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        var examples = {};
        if (result.length > 0) {
          var authToken = randomstring.generate(24)
          examples['application/json'] = {
            "meta": {
              "code": 200,
              "message": "login success"
            },
            "userid": result[0].userid,
            "auth_token": authToken
          }
          var query = { mno: { $gt: body.mobileNumber } }
          var obj = {
            _id: body.mobileNumber,
            datetime: new Date(),
            "userid": result[0].userid,
            auth: authToken
          }
          dbo = db.db("inRangeDb");
          //   db.getCollectionNames().find 
          //   db.collectionNames("session", function(err, names) {
          //     if(names.length > 0){
          //       var updateres = dbo.collection("session").updateOne(query, obj, true);
          //     }else{
          //       dbo.collection("session").insertOne(request);
          //     }
          // });

          dbo.collection("session").deleteOne({ _id: body.mobileNumber });
          dbo.collection("session").insertOne(obj);
        }
        db.close();
        resolve(examples)
      });
    });

    // var examples = {};
    // examples['application/json'] = {
    //   "schema": {
    //     "code": 0,
    //     "message": "message"
    //   },
    //   "authToken": "authToken",
    //   "loggedMno": "loggedMno",
    //   "loggeduserId": "loggeduserId",
    //   "user_schema": {
    //     "emails": ["emails", "emails"],
    //     "firstName": "firstName",
    //     "lastName": "lastName",
    //     "mobileNumbers": ["mobileNumbers", "mobileNumbers"],
    //     "dob": "2000-01-23T04:56:07.000+00:00",
    //     "permissions": [{
    //       "name": "name",
    //       "permission": "permission",
    //       "id": "id"
    //     }, {
    //       "name": "name",
    //       "permission": "permission",
    //       "id": "id"
    //     }],
    //     "rating": 0.80082819046101150206595775671303272247314453125,
    //     "userType": "userType",
    //     "userId": "userId",
    //     "businesses": {
    //       "imgUrl": "imgUrl",
    //       "catId": "catId",
    //       "rating": 6.02745618307040320615897144307382404804229736328125,
    //       "subCatId": "subCatId",
    //       "name": "name"
    //     }
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
 * Logs out current logged in user session
 * 
 *
 * auth_Token String 
 * returns Meta
 **/
exports.logoutUser = function (auth_Token) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "code": 0,
      "message": "message"
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

