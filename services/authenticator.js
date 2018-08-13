/**
 * Created by rameshkedlaya on 16/08/17.
 */

import responseManager from '../services/responseManager';
import AppError from '../utils/appError';
import jwt from 'jsonwebtoken';
import consts from '../utils/constants';
import TokenExpiredError from './../node_modules/jsonwebtoken/lib/TokenExpiredError';

import adminModel from '../models/Admin';


var env = process.env.NODE_ENV || "development";
var config = require('../config/config.json')[env];
var errors = require('../config/errors.json');

class Authenticator {
  async authenticateAdmin(req, res, next) {

    var authorization = req.headers['authorization'];
    var optional_auth = req.optional_authentication === true;

    if (!authorization) {
      if (optional_auth == false) {
        var error = errors["NO_AUTH_HEADER"];
        var err = new AppError(error.code, error.message, error.responseCode);
        return responseManager.sendErrorResponse(res, err);
      } else {
        return next();
      }
    }
    
    var [token_holder, access_token] = authorization.split(' ');
    if (token_holder !== "Bearer") {
      var error = errors["INVALID_AUTH_HEADER"];
      var err = new AppError(error.code, error.message, error.responseCode);
      return responseManager.sendErrorResponse(res, err);
    }
    
    try {
      var decoded = jwt.verify(access_token, config.jwt_secret);

    } catch (err) {

      
      if (err instanceof TokenExpiredError) {
        var error = errors["ACCESS_TOKEN_EXPIRED"];
        var err = new AppError(error.code, error.message, error.responseCode);
        return responseManager.sendErrorResponse(res, err);
      } else {
        var error = errors["INVALID_ACCESS_TOKEN"];
        var err = new AppError(error.code, error.message, error.responseCode);
        return responseManager.sendErrorResponse(res, err);
      }
    }
    
    if (!decoded) {
      var error = errors["INVALID_ACCESS_TOKEN"];
      var err = new AppError(error.code, error.message, error.responseCode);
      return responseManager.sendErrorResponse(res, err);
    }
    
    var admin_id = decoded.id;

    try {
      const admin = await adminModel.findOne({_id: admin_id});

        if (!admin) {
          const error = errors["INVALID_ACCESS_TOKEN"];
          var err = new AppError(error.code, error.message, error.responseCode);
          return responseManager.sendErrorResponse(res, err);
        }
        // console.log("1234",admin)
        // console.log("1234",decoded)
        if (admin.jwtVersion != decoded.version) {
          var error = errors["INVALID_ACCESS_TOKEN"];
          var err = new AppError(error.code, error.message, error.responseCode);
          return responseManager.sendErrorResponse(res, err);
        }
        
        // console.log("1234555")
        
        // console.log("12345t364756856")
        
        req.admin = admin;
        
        return next()
    } catch(err) {
      // console.log("errrrrrrpppppppppppppppppp", err)
      return responseManager.sendErrorResponse(res, err);
    }
  }
  
  
  
  
 
  
}

var authenticator = new Authenticator();
export default authenticator;