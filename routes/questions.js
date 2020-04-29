
//import express framework
const express=require('express')
//import questions Controller
const questionsController=require('../controllers/questionController')
//Create a router Instance
const router=express.Router()

//middleware to handle id params
router.use('/:id/options',function(req,res,next){
    req.questionId=req.params.id;
    next()
},require('./options.js'))

//delete question
router.delete('/:id/delete',questionsController.delete)


//create a question
router.post('/create',questionsController.create)

//get question
router.get('/:id',questionsController.get)


//export module
module.exports=router