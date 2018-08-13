import adminModel from '../models/Admin';


import appHelper from '../utils/appHelper';




import consts from '../utils/constants';

import bcrypt from 'bcryptjs';

import app_helper from '../utils/appHelper';






import jwt from 'jsonwebtoken';

var env = process.env.NODE_ENV || "development";
var config = require('../config/config.json')[env];

class AdminManager {

  
  async register(data) {
    try {

      if (!data.email) {
        var err = app_helper.get_app_error_object('INVALID_REQUEST_DATA');
        err.message = 'Email is mandatory';
        throw (err);
      }

      if (!data.password || data.password.length < 6) {
        var err = app_helper.get_app_error_object('INVALID_REQUEST_DATA');
        err.message = 'A password of minimum six characters is required';
        throw (err);
      }

      let status = await this.checkEmailIsFree(data.email);

      let hashed_password = await bcrypt.hash(data.password, consts.USER_PASSWORD_SALT_ROUNDS);

      const user_data = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: hashed_password
      }

      let user = adminModel.createAdmin(user_data);



     
      return user;
      

    } catch(e) {
      throw e;
    }
  }
  
  //Todos : Modify according to role and access rights


  
  
  
  async login(data) {
    try {

      const user = await adminModel.findOne({email: data.email});
      if (!user) {
        const err = app_helper.get_app_error_object('INVALID_CREDENTIALS');
        throw err;
      }
      const passwordHash = user.password;
      console.log(user);

      const match = await bcrypt.compare(data.password, passwordHash);

      if (!match) {
        const err = app_helper.get_app_error_object('INVALID_CREDENTIALS');
        throw err;
      }
      const token = this.generateAuthToken(user);
      return {access_token: token, user: user.toJSON()};

    } catch(e) {
      throw e;
    }

  }
  
  
  
  
 
  
  
  
  async checkEmailIsFree(email) {
    try {
      const user =  await adminModel.findOne({email: email});
      console.log(user)
      if (user) {
        const err = appHelper.getAppErrorObject('EMAIL_ADDR_USE')
        throw err;
      }
      return true;
    } catch(e) {
      throw e;
    }
    
  }
  
 
 
  
  
  generateAuthToken(admin) {
    var data = {
      id: admin._id,
      version: admin.jwtVersion,
      type: 'admin'
    };
    
    var options = {
      expiresIn: '30d'
    };
    
    var token = jwt.sign(data, config.jwt_secret, options);
    return token;
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  async findUsers(admin, extraFilters = {}) {
    
    let pageParams = {};
    let dateParams = {};
    let where = {};
    
    for (var key in extraFilters) {
      let filterValue = extraFilters[key];
      switch (key) {
        case 'page':
          pageParams['page'] = filterValue;
          break;
        
        case 'limit':
          pageParams['limit'] = filterValue;
          break;
        // 'name', 'email', 'phone', 'city', 'work', 'startTime', 'phase', 'leads', 'state', 'all', 'fromDate', 'toDate'
        case 'id':
          where['_id'] = filterValue;
          break;
          
        
          
      }
    }
    
    
    
    let users = await adminModel.find(where);
    return users;
  }
  
  async getUserById(id) {
    let user = await adminModel.findOne({_id: id});
    return user;
  }
  
  
}

var adminManager = new AdminManager();
export default adminManager;