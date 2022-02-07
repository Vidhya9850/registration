const mongoose = require("mongoose");


const studentSchema = new mongoose.Schema({
    firstname : {
        type:String,
        required:true
    },
    lastname: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    gender: {
        type:String,
        required:true
    },  
    phone: {
        type:Number,
        required:true,
        unique:true
    },
    age: {
        type:Number,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    confirmpassword: {
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
    
})

// generating tokens 
studentSchema.methods.generateAuthToken = async function(){
   try {
       console.log(this._id);
       const token = jwt.sign({_id:this._id.toString()}, "mynameisvinodbahadurthapayoutuber");
       this.tokens = this.tokens.concat({token:token})
       await this.save();
       return token;
   } catch (error) {
       res.send("the error part" + error);
       console.log("the error part" + error);
   }
}



// now we need to create a collections

const Register = new mongoose.model("Register", studentSchema);

module.exports = Register;