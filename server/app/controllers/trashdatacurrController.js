const db = require('../models')
const trashdatacurr = db.trashdatacurrs

exports.findAll=(req,res) => {
    trashdatacurr.find()
    .then((result)=>{
        res.send(result)
      }).catch((err)=>{
        res.status(500).send({
            message:err.message
        })
      });
}

exports.create=(req,res) => {
  const trashcurrpost = new trashdatacurr({
    tempat_sampah_data_id : req.body.tempat_sampah_data_id,
    tempat_sampah_gpslocation : {
        lon : req.body.tempat_sampah_gpslocation.lon,
        lat : req.body.tempat_sampah_gpslocation.lat 
    },
    tempat_sampah_currentcapacity : req.body.tempat_sampah_currentcapacity,
    tempat_sampah_currentlevel : req.body.tempat_sampah_currentlevel,
}

)


  trashcurrpost.save(trashcurrpost)
  .then((result)=>{
    res.send(result)
  }).catch((err)=>{
    res.status(409).send({
        message:err.message
    })
  });
}

exports.findOne = (req,res) => {
  
  const id = req.params.id

  trashdatacurr.findById(id)
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

  trashdatacurr.findByIdAndUpdate(id,req.body)
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

  trashdatacurr.findByIdAndRemove(id)
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



