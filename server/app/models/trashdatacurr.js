const db = require('../models')
const trashdata = db.trashdatas

module.exports = (mongoose) => {


    const trashdatacurrschema = new mongoose.Schema(
        {
            tempat_sampah_data_id : String ,
            tempat_sampah_gpslocation : {
                lon : Number,
                lat : Number
                
            },
            tempat_sampah_currentcapacity : Number,
            tempat_sampah_currentlevel : Number,
        },
        {
            timestamps:{
                createdAt : 'created_at',
                updatedAt : 'updated_at'
            }
        }
    ); 
 
   

    trashdatacurrschema.method("toJSON",function(){
        const {__v, _id, ...object} = this.toObject()
        object.id = _id
        return object
    })

    const trashdatacurr = mongoose.model("trashdatacurrs",trashdatacurrschema)
    return trashdatacurr
}