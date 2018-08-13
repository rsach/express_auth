import validator from '../utils/validator.js'
import adminManager from '../services/adminManager.js'
import responseManager from '../services/responseManager.js'

class AdminController {
  register(req, res) {
    adminManager.register(req.body).then(admin => {
      return responseManager.sendSuccessResponse(res, admin, "admin_register_success");
    }).catch(function (err) {
      return responseManager.sendErrorResponse(res, err);
    });
  }
  
  
  
  login(req, res) {
    adminManager.login(req.body).then(admin => {
      return responseManager.sendSuccessResponse(res, admin, "admin_login_success");
    }).catch(function (err) {
      return responseManager.sendErrorResponse(res, err);
    });
  }
  
  
  
  
  
  
  



  getUsers(req, res) {
    adminManager.findUsers(req.admin).then(admin => {
      return responseManager.sendSuccessResponse(res, admin, "user_fetch_success");
    }).catch(err => {
      return responseManager.sendErrorResponse(res, err);
    })
  }
  
  
  
  
  
  
  
  
  
 
  
  
  
}

var adminController = new AdminController();
export default adminController;