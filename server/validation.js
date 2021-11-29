const joi = require('@hapi/joi');

    const adminregistervalidation = data => {

    const schemaadmin = joi.object({
        admin_email : joi.string().min(6).required().email(),
        admin_username : joi.string().min(6).required(),
        admin_nama : joi.string().min(6).required(),
        admin_pwd : joi.string().min(6).required(),
        admin_isactive : joi.boolean().required()
    });

    return schemaadmin.validate(data);

    //const {error} = schema.validate(req.body);
    //if(error) return res.status(400).send(error.details[0].message);
};

const adminloginvalidation = data => {

    const schemaadmin = joi.object({
        admin_email : joi.string().min(6).required().email(),
        admin_pwd : joi.string().min(6).required()
    });

    return schemaadmin.validate(data);

    //const {error} = schema.validate(req.body);
    //if(error) return res.status(400).send(error.details[0].message);
};

module.exports.adminregistervalidation = adminregistervalidation;
module.exports.adminloginvalidation = adminloginvalidation;

