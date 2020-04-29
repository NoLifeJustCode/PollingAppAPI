//import mongoose module
const mongoose=require('mongoose')
//import the connection Object to db
const dbConnection=require('../config/mongoose')
//import questions model
const questionsDb=require('./questions')
// Schema to create Schema of the document
const Schema=mongoose.Schema;

// create options document schema

const optionsSchema=new Schema({
    text:{
        type:String,
        required:true
    },
    votes:{
        type:mongoose.SchemaTypes.Number,
        default:0,
    },
    link_to_vote:{
        type:mongoose.SchemaTypes.String,
        required:true,
        
    }
    ,
    question:{
        type:Schema.Types.ObjectId,
        ref:'questions',
    }
    
},{timestamps:true})


//export model
module.exports=dbConnection.model('options',optionsSchema)


