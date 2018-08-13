const validator = require('validatorjs')
module.exports = {
  /*
   validate Function to validate the input object or input parameters,
   if any parameter will not validate the rule it will throw the error,
   */
  validate(rulesObj) {
    return (req, res, next) => {
      // Validating Input
      // console.log("req---",rulesObj)
      let params = req.params
      if (req.method == 'GET') {
        params = req.query
      } else if (req.method == 'POST') {
        params = req.body
      }
      const validation = new validator(params, rulesObj)
      
      if (validation.fails()) {
        // Validating fails
        console.log("22222222222222222222222222222222", validation.errors)
        const errorObj = validation.errors.all()
        return res.status(400).send({
          reply: errorObj[Object.keys(errorObj)[0]][0]
        })
      } else {
        return next()
      }
    }
  },
  validateOthers (data, rulesObj) {
    const validation = new validator(data, rulesObj)
    
    if (validation.fails()) {
      // Validating fails
      console.log("22222222222222222222222222222222", validation.errors)
      const errorObj = validation.errors.all()
      return false;
    } else {
      return true;
    }
  }
}

