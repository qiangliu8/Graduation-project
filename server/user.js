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

Router.post('/sendcode', function (req, res) {
    const {mobile,serify}  = req.body
     //if(sendSerifly(SMSClient,mobile,serify)){
        if(true){
        return res.json({code:0,msg:'短信发送成功，请及时接收！'})
    }else{
        return res.json({code:1,msg:'短信发送失败，请稍后重试！'})
    }

  })

Router.post('/register', function (req, res) {
    const {mobile,name,pwd}  = req.body
    const userModel = new User({name,mobile,pwd}) 
    userModel.save(function(e,d){
        if(e){
            return res.json({code:1,msg:'异常'})
        }
        return res.json({code:0,msg:'注册成功'})
    })
    // return res.json({code:0,msg:{mobile,name,pwd} })
})
module.exports = Router