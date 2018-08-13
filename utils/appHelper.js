

// require('dotenv').load();

// var env = process.env.NODE_ENV || "development";



var errors = require('../config/errors.json');

import AppError from '../utils/appError';

class AppHelper {
  constructor() {
    console.log(this.get_app_error_object('INVALID_REQUEST_DATA'))
  }
  get_app_error_object(error_string) {
    var error = errors[error_string];
    if (!error) {
      error = {
        code: 2000,
        message: error_string || 'Bad Request',
        responseCode: 400
      };
    }
    var err_obj = new AppError(error.code, error.message, error.responseCode);
    return err_obj;
  }

  
  getAppErrorObject(error_string) {
    var error = errors[error_string];
    if (!error) {
      error = {
        code: 2000,
        message: error_string || 'Bad Request',
        responseCode: 400
      };
    }
    var err_obj = new AppError(error.code, error.message, error.responseCode);
    return err_obj;
  }
  
 
  
  
  
  
  
  
  
  
  
  
  
}

var app_helper = new AppHelper();
export default app_helper;