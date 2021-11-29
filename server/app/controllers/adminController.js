const db = require('../models')
const admin = db.admins
const  verify = require('../routes/verifyToken')

  //validation
  const joi = require('@hapi/joi');

  const schema ={
      admin_username : joi.string().min(6).required(),
      admin_email : joi.string().min(6).required().email(),
      admin_pwd : joi.string().min(6).required()
      
  }






exports.findAll=(req,res) => {
    admin.find()
    .then((result)=>{
        res.send(result)
      }).catch((err)=>{
        res.status(500).send({
            message:err.message
        })
      });
}

/*exports.create=(req,res) => {
  //validate 1st
  const validate = joi.validate(req.body,schema);
  res.send(validate);
  const adminpost = new admin({
    admin_email: req.body.admin_email,
    admin_username : req.body.admin_username,
    admin_nama : req.body.admin_nama,
    admin_pwd:req.body.admin_pwd,
    admin_foto:req.body.admin_foto,
    admin_isactive:req.body.admin_isactive ? req.body.admin_isactive : false
  })

  adminpost.save(adminpost)
  .then((result)=>{
    res.send(result)
  }).catch((err)=>{
    res.status(409).send({
        message:err.message
    })
  });
}
*/
exports.findOne = (req,res) => {
  
  const id = req.params.id

  admin.findById(id)
  .then((result)=>{
    res.send(result)
  }).catch((err)=>{
    res.status(409).send({
        message:err.message
    })
  });
}

exports.update= (req,res) =>{
  const id = req.params.id

  admin.findByIdAndUpdate(id,req.body)
  .then((result)=>{
    if(!result){
      res.status(404).send({
        message : "Not Found"
      })
    } 
    res.send({
      message : "updated"
    })

  })
  
  .catch((err)=>{
    res.status(409).send({
        message:err.message
    })
  });
}

exports.delete= (req,res) =>{
  const id = req.params.id

  admin.findByIdAndRemove(id)
  .then((result)=>{
    if(!result){
      res.status(404).send({
        message : "Not Found"
      })
    } 
    res.send({
      message : "Deleted"
    })

  })
  
  .catch((err)=>{
    res.status(409).send({
        message:err.message
    })
  });
}





