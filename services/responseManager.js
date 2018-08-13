const env = process.env.NODE_ENV || "development";

import AppError from '../utils/appError';

class ResponseManager {
  sendErrorResponse(res, err) {
    let response = {};
    console.log(err, err instanceof AppError, err.constructor);
    if (err instanceof AppError) {
      res.status(err.responseCode);
      // res.header("Content-Type", "application/json");
      response = {
        code: err.code,
        message: err.message,
        data: null
      };
      
      if (err.errorInfo && err.errorInfo.length > 0) {
        response.errorInfo = [];
        let errInfo = err.errorInfo;
        for (let error of errInfo) {
          response.errorInfo.push({
            param: error.param,
            message: error.msg
          });
        }
      }
      
    } else {
      //Errors not defined in errors.json
      res.status(500);
      // res.header("Content-Type", "application/json");
      
      if (env == 'production') {
        err = 'Internal Server Error';
      }
      
      response = {
        code: 500,
        message: err,
        data: null
      };
    }
    
    
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', 0);
    // res.header('Content-Language', res.getLocale());
    res.send(response);
  }
  
  sendSuccessResponse(res, data, message, options) {
    options = options || {};
    let responseCode = options.responseCode ? options.responseCode : 200;
    res.status(responseCode);
    // res.header("Content-Type", "application/json");
    
    let response = {
      code: 0,
      data: data,
      message: message ? message : "Success"
    };
    
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', 0);
    // res.header('Content-Language', res.getLocale());
    
    let additional_headers = options.headers;
    additional_headers = additional_headers || {};
    
    for (let header_key in additional_headers) {
      res.header(header_key, additional_headers[header_key]);
    }
    
    res.send(response);
  }
}

let responseManager = new ResponseManager();

export default responseManager;