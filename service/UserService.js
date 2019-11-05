'use strict';


/**
 * Create user
 * This can only be done by the logged in user.
 *
 * body User Created user object
 * no response value expected for this operation
 **/
exports.createUser = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
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
exports.deleteUser = function(auth_Token,userId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get user by user name
 * 
 *
 * auth_Token String 
 * userId String The name that needs to be fetched. Use user1 for testing. 
 * returns User
 **/
exports.getUserByName = function(auth_Token,userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
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
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Updated user
 * This can only be done by the logged in user.
 *
 * auth_Token String 
 * userId String name that need to be updated
 * body User Updated user object
 * no response value expected for this operation
 **/
exports.updateUser = function(auth_Token,userId,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

