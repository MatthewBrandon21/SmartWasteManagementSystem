module.exports = (mongoose) => {


    const trashdataschema = new mongoose.Schema(
        {
            tempat_sampah_jenis : String,
            tempat_sampah_name : String,
            tempat_sampah_location : String,
            tempat_sampah_region : String,
            tempat_sampah_maxcapacity : Number,
            tempat_sampah_totalcapacitythismonth : Number,
            tempat_sampah_isfull : Boolean
        },
    ); 
 
   

    trashdataschema.method("toJSON",function(){
        const {__v, _id, ...object} = this.toObject()
        object.id = _id
        return object
    })

    const trashdata = mongoose.model("trashdatas",trashdataschema)
    return trashdata
}