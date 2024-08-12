const mongoose=require("mongoose");
const schema= mongoose.Schema;
const crypto = require("crypto");

const { v4: uuidv4 } = require('uuid');

const userSchema= new schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,   
        unique: true    
    },
    encry_password: {
        type: String,
        required: true
      },
    salt: String,  
    role:{
        type:Number,
        default:0
    }   
}, {timestamps : true})


userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  });


userSchema.methods={
    authenticate: function(plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
      },
    securePassword: function(plain_password){
        if(!plain_password){
            return ""
        }
        try {
            return crypto
            .createHmac("sha256",this.salt)
            .update(plain_password)
            .digest("hex")
            
        } catch (error) {
            return "";
        }
    }
}

module.exports=mongoose.model("User",userSchema);