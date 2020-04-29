
//import express framework
const express=require('express')
//import options controller
const optionsController=require('../controllers/optionsController')
//Create a router Instance
const router=express.Router()


// create a option
router.post('/create',optionsController.create)


//add_vote

router.post('/:id/add_vote',optionsController.add_vote)

//delete option
router.delete('/:id/delete',optionsController.delete)

//export module
module.exports=router