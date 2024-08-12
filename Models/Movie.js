const mongoose= require("mongoose")
const{ ObjectId}= mongoose.Schema;

const movieSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,       
    },
    description:{
        type: String,
        required: true,     
    },    
    category:{
        type: String ,
        // ref:  "category",
        required: true
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    release:{
        type:String
    },
    duration:{
        type: String
    },
    actors:{
        type:Array
    },
    producer:{
        type:String
    }
    
}, {timestamps: true})

module.exports= mongoose.model("Movie", movieSchema);