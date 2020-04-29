//import questions and options model Schema
const questionsDb=require('../models/questions')
const optionsDb=require('../models/options')
const supportModules=require('../modules/supportingModules')
const errorHandler=supportModules.errorHandling

//controller to get all questions 
module.exports.get=function(req,res){
    console.log(req.params)
    /**
     * retrieve the question document related to id and populate all the options based on id with selected field using options and return 
     */
    questionsDb.findById(req.params.id).populate('options','_id text votes link_to_vote').select('_id title options').exec(function(err,data){
        var message='data retreive successfull'
        if(err){
            message='Internal Server Error'
            errorHandler(err,504,message,res)
            return;
        }
        var question={
            'question':data,
             message:message
        }
        return res.send(200,{'data':question})
    }) 
}


//controller to delete a question
module.exports.delete=function(req,res){
    console.log(req.params)
    /**
     * find question by id and delete the question if found else return appropriate status code and message
     */
    var message='delete successfull'
    questionsDb.findByIdAndDelete(req.params.id,async function(err,data){
        if(err)
        {   
            message='Failed to delete the question'
            errorHandler(err,504,message,res)
            return;
        }
        if(!data)
            message='Question doesn\'t exist'
        else{
            await optionsDb.deleteMany({_id:{$in:data.options}},function(err,n){
                console.log(n)
            })
        }
        res.send(200,{'data':{
            message:message
        }
    })
    })
    
}


//controller to create question
module.exports.create=function(req,res){
    console.log(req.query)
    var message='created question'
    /**
     * create a question document and return the document object 
     */

    questionsDb.create(req.query,function(err,data){
        if(err){
            message='error creating question'
            errorHandler(err,504,message,res)
            return
        }
        console.log(data)
        res.send(200,{'data':{
                            'question':{
                                        'id':data._id,
                                        'title':data.title,
                                        'options':data.options,
                                        },

                            'message':message
    }});
    })
    //return res.send(200,message)
}
