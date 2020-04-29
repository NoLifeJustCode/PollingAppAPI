
//import express framework
const express=require('express')

//create instance of framework
const app=express();

//logical port where server listens for incoming connection
const port=3000;

//router to products route
app.use('/',require('./routes/index'))


//Attach server to port 3000 to listen for incomeing client request
app.listen(port,function(err){
    if(err){
        console.log(err)
        return;
    }
    console.log('server running')
})