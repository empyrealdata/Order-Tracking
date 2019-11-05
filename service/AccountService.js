'use strict';


/**
 * Change Password
 * This can only be done by the logged in user.
 *
 * userId String userId fetched respective user
 * auth_Token String 
 * body ChangePasswordRequest Change User Password
 * returns Meta
 **/
exports.changePassword = function(userId,auth_Token,body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "code" : 0,
  "message" : "message"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
exports.forgetpassword = function(mobileNumber,auth_Token,body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "code" : 0,
  "message" : "message"
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
exports.loginUser = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "schema" : {
    "code" : 0,
    "message" : "message"
  },
  "authToken" : "authToken",
  "loggedMno" : "loggedMno",
  "loggeduserId" : "loggeduserId",
  "user_schema" : {
    "emails" : [ "emails", "emails" ],
    "firstName" : "firstName",
    "lastName" : "lastName",
    "mobileNumbers" : [ "mobileNumbers", "mobileNumbers" ],
    "dob" : "2000-01-23T04:56:07.000+00:00",
    "permissions" : [ {
      "name" : "name",
      "permission" : "permission",
      "id" : "id"
    }, {
      "name" : "name",
      "permission" : "permission",
      "id" : "id"
    } ],
    "rating" : 0.80082819046101150206595775671303272247314453125,
    "userType" : "userType",
    "userId" : "userId",
    "businesses" : {
      "imgUrl" : "imgUrl",
      "catId" : "catId",
      "rating" : 6.02745618307040320615897144307382404804229736328125,
      "subCatId" : "subCatId",
      "name" : "name"
    }
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Logs out current logged in user session
 * 
 *
 * auth_Token String 
 * returns Meta
 **/
exports.logoutUser = function(auth_Token) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "code" : 0,
  "message" : "message"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

