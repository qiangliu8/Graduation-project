const express = require('express')
const Router = express.Router()
const UserModel = require('./model')
const Note = UserModel.getModel('note')
const User = UserModel.getModel('user')
const {putnotes} = require('./upload')
var fs = require("fs");
const mongoose = require('mongoose')
//获取攻略列表
Router.get('/notelist',function(req,res){
    Note.aggregate([
        {$lookup: {
            from: 'users',
            localField: "userId",
            foreignField: "_id", 
            as: "user" 
        }},
        {$project:{   
            'userId':1,
            'mapgroup':1,
            'title':1,
            'fabulous':1,
            'name': {'$arrayElemAt':['$user.name', 0]},
            'portrait': {'$arrayElemAt':['$user.portrait', 0]}
            }}],function(err,doc){
        return res.json({code:0,data:doc})
    })
})

//获取攻略详情
Router.post('/noteinfo',function(req,res){
    const {id} = req.body
    Note.aggregate([
            {$lookup: {
                from: 'users',
                localField: "userId",
                foreignField: "_id", 
                as: "user" 
            }},
            {$project: {
                'userId':1,
                'mapgroup':1,
                'title':1,
                'content':1,
                'fabulous':1,
                "collect":1,
                'name': {'$arrayElemAt':['$user.name', 0]},
                'portrait': {'$arrayElemAt':['$user.portrait', 0]}
            }},
            {"$match": {"_id": mongoose.Types.ObjectId(id)}},],function(err,doc){
            return res.json({code:0,data:doc[0]})
    })

})


Router.post('/noteImgUpload',function(req,res){
    const userId = req.cookies.userId
    if(!userId){
        return res.json.dumps({code:1})
    }
    const {content,title} = req.body
    putnotes(req.files).then((result)=>{
        let mapgroup = result.map(v=>v.url)
        const noteModel = new Note({userId:mongoose.Types.ObjectId(userId),mapgroup,content, title})
        noteModel.save(function(e,d){
            if(e){
                 return  res.json({code:1,msg:'异常'})
            }
            return res.json({code:0,msg:'发布成功'})
        })
       
    })
})

//点赞攻略
Router.post('/notefabulous',function(req,res){
    const userId = req.cookies.userId
    if(!userId){
        return res.json.dumps({code:1})
    }
    const {id,_id,fabulous} =req.body 
    Note.findByIdAndUpdate(_id,{'fabulous':fabulous+1},function(err,doc){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + doc);
        }
        return res.json({ code: 0, msg:'点赞成功！' })
    })
})
module.exports = Router