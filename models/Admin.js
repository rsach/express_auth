
const _ = require('lodash');
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  phone: {
    type: Number,
    default: null
    //unique: true
  },
  password: {
    type: String,
    //select:false
  },
  jwtVersion: {
    type: Number,
    default: 0
  }
  
  
}, {
  timestamps: {
    createdAt: 'createdTime',
    updatedAt: 'updatedTime'
  },
  id: false,
  toJSON: {
    getters: true,
    virtuals: true
  },
  toObject: {
    getters: true,
    virtuals: true
  },
});

AdminSchema.plugin(mongoosePaginate);

AdminSchema.methods.toJSON = function () {
  var admin = this;
  var adminObject = admin.toObject();
  
  return _.pick(adminObject, ['_id', 'name', 'email', 'phone', 'jwtVersion']);
};//

AdminSchema.statics.createAdmin = async function (data) {
  try {
    var admin = new this(data);
    let adminData = await admin.save();
    return adminData;
  }
  catch (e) {
    throw e;
  }
};


const Admin = mongoose.model('Admin', AdminSchema);


module.exports = Admin