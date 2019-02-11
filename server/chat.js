const express = require('express')
const Router = express.Router()
const UserModel = require('./model')
const User = UserModel.getModel('user')
const Chat = UserModel.getModel('chat')
const mongoose = require('mongoose')
//查看与该用户的所有聊天记录 
Router.post('/chatinfo',function(req,res){
    const { userId } = req.cookies
    if(!userId){
        return res.json({code:90000,msg:'用户未登录'})
    }
    const {to} = req.body
    
    User.aggregate([{"$match":{"_id":mongoose.Types.ObjectId(to)}},
        {$lookup:{
            from:'chats',
            localField:'_id',
            foreignField:'to',
            as:'msg'
        }},
        {$project:{  
            'name':1,
            'portrait':1,
            'msg':1,
            '_id':0

            // 'content':1,
            // 'creat_time':1,
            // 'name': {'$arrayElemAt':['$user.name', 0]},
            // 'portrait': {'$arrayElemAt':['$user.portrait', 0]},
        }},
    ],function(err,doc){
        if(doc){
            return res.json({code:0,data:doc[0]})
        }
    })
})

//发送消息
Router.post('/sendChat',function(req,res){
    const { userId } = req.cookies
    if(!userId){
        return res.json({code:90000,msg:'用户未登录'})
    }
    const {to,content} = req.body
    const noteModel = new Chat({from:mongoose.Types.ObjectId(userId),'to':mongoose.Types.ObjectId(to),content})
    console.log(noteModel)
        noteModel.save(function(e,d){
            if(e){
                 return  res.json({code:1,msg:'异常'})
            }
            return res.json({code:0,data:d})
        })
})

//查看用户的聊天记录列表 
Router.get('/chatlist',function(req,res){
    const { userId } = req.cookies
    if(!userId){
        return res.json({code:90000,msg:'用户未登录'})
    }
    Chat.aggregate([{"$match":{"from":mongoose.Types.ObjectId(userId)}},
        {$lookup:{
            from:'users',
            localField:'to',
            foreignField:'_id',
            as:'user'
        }},
        {$project:{  
            'creat_time':1,
            'content':1,
            'creat_time':1,
            'name': {'$arrayElemAt':['$user.name', 0]},
            'portrait': {'$arrayElemAt':['$user.portrait', 0]},
        }},
    ],function(err,doc){
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
})

module.exports = Router