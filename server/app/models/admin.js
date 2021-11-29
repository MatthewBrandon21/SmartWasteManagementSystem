
module.exports = (mongoose) => {


    const adminschema = new mongoose.Schema(
        {
            admin_email : {
                type : String,
                required : true,
                min : 6,
                max : 255
            },
            admin_username : {
                type : String,
                required : true,
                min : 8,
                max : 1000
            },
            admin_nama: {
                type : String,
                required:true,
                min : 6,
                max : 1000
            },
            admin_pwd:{
                type : String,
                required:true,
                min : 6,
                max : 1024
            },
            admin_isactive:Boolean,
            isAdmin :{
                type : Boolean,
                default : true
            }   
        }
    )
 
    
    adminschema.method("toJSON",function(){
        const {__v, _id, ...object} = this.toObject()
        object.id = _id
        return object
    })

    const admin = mongoose.model("admins",adminschema)
    return admin
}