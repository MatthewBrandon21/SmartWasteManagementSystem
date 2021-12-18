const joi = require("@hapi/joi");

const userregistervalidation = (data) => {
  const schemauser = joi.object({
    user_email: joi.string().required().email(),
    user_username: joi.string().required(),
    user_nama: joi.string().required(),
    user_phonenum: joi.number().required(),
    user_address: joi.string().required(),
    user_pwd: joi.string().required(),
    user_isAdmin: joi.boolean(),
    user_isactive: joi.boolean(),
  });

  return schemauser.validate(data);

  //const {error} = schema.validate(req.body);
  //if(error) return res.status(400).send(error.details[0].message);
};

const userloginvalidation = (data) => {
  const schemauser = joi.object({
    user_email: joi.string().min(6).required().email(),
    user_pwd: joi.string().min(6).required(),
  });

  return schemauser.validate(data);

  //const {error} = schema.validate(req.body);
  //if(error) return res.status(400).send(error.details[0].message);
};

module.exports.userregistervalidation = userregistervalidation;
module.exports.userloginvalidation = userloginvalidation;
