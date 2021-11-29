module.exports = (mongoose) => {


    const employeeschema = new mongoose.Schema(
        {
            employee_email : String,
            employee_username : String,
            employee_nama: String,
            employee_pwd: String,
            employee_foto: String,
            employee_isactive:Boolean,
            isAdmin :{
                type : Boolean,
                default : true
            }   
        }
    )
 
    
    employeeschema.method("toJSON",function(){
        const {__v, _id, ...object} = this.toObject()
        object.id = _id
        return object
    })

    const employee = mongoose.model("employees",employeeschema)
    return employee
}