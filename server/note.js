const express = require('express')
const Router = express.Router()
const UserModel = require('./model')
const Note = UserModel.getModel('note')
const {putnote} = require('./upload')
var fs = require("fs");

Router.get('/notelist',function(req,res){
    Note.find({},function(err,doc){
        return res.json({code:0,msg:doc})
    })
})

Router.post('/noteImgUpload',function(req,res){
    const userId = req.cookies.userId
    if(!userId){
        return res.json.dumps({code:1})
    }
    console.log(req.files)
    req.files.map(v=>{
        fs.readFile( v.path, function (err, data) {
            putnote(v.originalname,v.path)
            .then(result=>{
                 return res.json({code:0,data:result})
             })
            .catch(err=>res.json({code:1,msg:err}))
        })
    })
})



module.exports = Router