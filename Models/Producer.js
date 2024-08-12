const mongoose=require("mongoose");
const schema= mongoose.Schema;

const producerSchema= new schema({
    name:{
        type:String,
        required:true,    
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
    }  , 
    role:{
        type:Number,
        default:0
    } 
}, {timestamps : true})

module.exports=mongoose.model("producer",producerSchema);