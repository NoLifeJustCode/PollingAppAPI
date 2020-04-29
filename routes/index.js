
//import express framework
const express=require('express')

//Create a router Instance
const router=express.Router()


//Route to questions
router.use('/questions',require('./questions.js'))

//Route.to options
router.use('/options',require('./options.js'))

//export module
module.exports=router