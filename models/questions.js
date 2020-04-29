//import mongoose module
const mongoose=require('mongoose')
//import the connection Object to db
const dbConnection=require('../config/mongoose')
//import options model
const options=require('./options')
// Schema to create Schema of the document
const Schema=mongoose.Schema;

// create questions document schema

const questionsSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    options:[{
        type:Schema.Types.ObjectId,
        ref:'options'
    }]
},{timestamps:true})


//export model
module.exports=dbConnection.model('questions',questionsSchema)

