import constants from './constants'
var rules = {};

rules.register = {
  email: {
    notEmpty: true,
    isEmail: true,
    errorMessage: 'Email is required.'
  },
  password: {
    notEmpty: true,
    matches: {
      options: ['^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+])[A-Za-z\\d][A-Za-z\\d!@#$%^&*()_+]{6,20}$', 'i']
    },
    errorMessage: 'Invalid password, Password must contains  Number, Special Char, Uppercase and Lowercase and also have length between 6-20 chars.'
  }
};

rules.login = {
  email: "required|email",
  password: ["required", "regex:" + '^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+])[A-Za-z\\d][A-Za-z\\d!@#$%^&*()_+]{6,20}$']
}

rules.password = {
  password: {
    notEmpty: true,
    matches: {
      options: ['^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+])[A-Za-z\\d][A-Za-z\\d!@#$%^&*()_+]{6,20}$', 'i']
    },
    errorMessage: 'Invalid password, Password must contains  Number, Special Char, Uppercase and Lowercase and also have length between 6-20 chars.'
  }
}




rules.createPassword = {
  password: ["required", "regex:" + '^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+])[A-Za-z\\d][A-Za-z\\d!@#$%^&*()_+]{6,20}$']
  
}


module.exports.rules = rules