//import questions and options model Schema
const questionsDb=require('../models/questions')
const optionsDb=require('../models/options')
const mongoose =require('mongoose')
const link_to_vote=require('../modules/supportingModules').combineLink
const errorHandler=require('../modules/supportingModules').errorHandling
const host='http://localhost:3000/options'

function addoption(optionId,questionId){
    questionsDb.findById(questionId,function(err,data){
        if(err){
            errorHandler(err,res)
            return;
        }
        data.options.push(optionId)
        data.save()
    })
    return 
}



//controller to add_vote i.e increment vote count on the option
module.exports.add_vote=function(req,res){
    console.log(req.params)
    var message='vote successfully registered to'
    optionsDb.findByIdAndUpdate(req.params.id,{$inc:{'votes':1}},{new:true},function(err,data){
        if(err)
        {
            errorHandler(err,res)
            return
        }
        return res.send(200,message+" : " +data.text)
    })
    
}


//controller to delete a option
module.exports.delete=function(req,res){
    console.log(req.params)
    var message='delete successfull'
    optionsDb.findByIdAndDelete(req.params.id,async function(err,data){
        if(err)
        {
            errorHandler(err,res)
            return
        }
        if(!data)
            message='option id invalid'
        else{
           await questionsDb.findById(data.question,function(err,data){
                if(err){
                    errorHandler(err,res)
                    return
                }
                data.options.pull(req.params.id);
                data.save();
            })
        }
    return  res.send(200,message)
        
    })
    
}


//controller to create  a option
module.exports.create=function(req,res){
    /**
     * create the option and add the parent question id
     * retreive the question id and add the option object id to the options list
     */
    console.log(req.query,req.questionId)
     var message='created'
     var id=new mongoose.Types.ObjectId()
    optionsDb.create(
        {
        _id:id,
        text:req.query.text,
        question:req.questionId,
        link_to_vote:link_to_vote(host,'/'+id+'/add_vote')
        },function(err,data){
                if(err){
                    errorHandler(err,res)
                    return
                }
                addoption(id,req.questionId)
            return res.send(200,{'data':{
                'option':data
            }})
        })
    
}

