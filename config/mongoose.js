const mongoose=require('mongoose')


// mongodb server host and port no specific username or password specified
const data='mongodb://localhost:27017/PollingAPP'


// create a connection to the specified db
mongoose.connect(data,{useNewUrlParser:true})



// retain the connection for future use
const db=mongoose.connection


//if connection throws an error event
db.on('error',function(){
    console.error.bind(console,'error in connecting to mongoDB');
})


// flash message to incdicate successful connection
db.once('connect',function(){
    console.log('connection to database is successful')
})
module.exports=db;