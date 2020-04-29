module.exports.errorHandling=function(err,status_code=504,res,message='Internal Server Error'){
    console.log(err)
    res.send(status_code,message)
}
module.exports.combineLink=function(header,path){
    return header+path
}
