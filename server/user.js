const express = require('express')
const Router = express.Router()
const UserModel = require('./model')
const User = UserModel.getModel('user')
const SMSClient = require ('@alicloud/sms-sdk')
const {sendSerifly} = require('../src/util/server')

//获取用户列表
Router.get('/userlist',function(req,res){
    User.find({},function(err,doc){
        return res.json({code:0,msg:doc})
    })
})

Router.get('/userinfo',function(req,res){
    const  userId = req.cookies
    if(!userId){
        return res.json({code:90000,msg:'用户未登录'})
    }
    User.findOne({_id:userId},function(err,doc){
        if(!err){
            return res.json({code:9999,msg:'异常'})
        }
        if(doc){
            return res.json({code:0,msg:doc})
        }
    })
})
// Router.post('/usercode',function(req,res){
//     // const {mobile,code} = 
//     // console.log(res)
//     User.find({},function(err,doc){
//         return res.json({code:0,msg:doc})
//     })
//     // sendSerifly(SMSClient,15755337162,110)
// })
Router.post('/usercode', function (req, res) {
   
    User.find({},function(err,doc){
        return res.json({code:0,msg:req.body})
    })
  })
module.exports = Router