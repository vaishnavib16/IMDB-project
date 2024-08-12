const mongoose=require("mongoose");
const schema= mongoose.Schema;

const actorSchema= new schema({
    name:{
        type:String,
        required:true,     
        unique: true    

    },
    gender:{
        type:String,
        required:true,       
    },
    age:{
        type:String,
        required: true
    },    
    bio:{
        type:String,
        
    },
    role:{
        type:Number,
        default:0
    } 
    
}, {timestamps : true})

module.exports=mongoose.model("actor",actorSchema);