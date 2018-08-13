import promised_request from 'request-promise-native';

class RESTAPICaller {
  execute(method, uri, headers, params, options = {}) {
    method = method.toUpperCase();
    
    var request_options = {
      method: method,
      uri: uri,
      json: true,
      headers: headers,
      simple: false, //reject only on tech error
      resolveWithFullResponse: true
    };
    
    if (options.auth) {
      request_options.auth = options.auth;
    }
    
    console.log("Making", method, " Request to ", uri, 'with params', params);
    
    if (method == 'GET' || method == 'HEAD' || method == 'DELETE') {
      request_options.qs = params;
    } else {
      request_options.body = params;
    }
    
    if (options.sendAsFormData) {
      delete options.body;
      request_options.form = params;
    }
    
    return new Promise((resolve, reject) => {
      promised_request(request_options)
        .then(function (response) {
          console.log("API CALL RES", response);
          resolve(response);
        })
        .catch(function (err) {
          console.log("API CALL ERROR", err);
          reject('REQUEST_FAILED');
        });
    });
  }
  
  
}

var rac = new RESTAPICaller();
export default rac;