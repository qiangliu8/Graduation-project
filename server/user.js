const express = require('express')
const Router = express.Router()
const UserModel = require('./model')
const User = UserModel.getModel('user')
const utils = require('utility')
const SMSClient = require ('@alicloud/sms-sdk')
const {sendSerifly,loginSerifly} = require('../src/util/server')
const _filter = { 'pwd': 0, '__v': 0 }

//获取用户列表
Router.get('/userlist',function(req,res){
    User.find({},function(err,doc){
        return res.json({code:0,msg:doc})
    })
})
//查看
Router.get('/userinfo',function(req,res){
    const { userId } = req.cookies
    if(!userId){
        return res.json({code:90000,msg:'用户未登录'})
    }
    User.findOne({_id:userId},_filter,function(err,doc){
        if(err){
            return res.json({code:9999,msg:'异常'})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
})

//发送注册验证码
Router.post('/sendcode', function (req, res) {
    const {mobile,code}  = req.body
     //if(sendSerifly(SMSClient,mobile,serify)){
        if(true){
        return res.json({code:0,msg:'短信发送成功，请及时接收！'})
    }else{
        return res.json({code:1,msg:'短信发送失败，请稍后重试！'})
    }

})
//用户注册
Router.post('/register', function (req, res) {
    const {mobile,name,pwd}  = req.body
    User.findOne({mobile},function(err,doc){
        if(doc){
          return  res.json({code:1,msg:'手机号已注册！'})
        }
        const userModel = new User({name,mobile, pwd: md5Pwd(pwd)}) 
        userModel.save(function(e,d){
            if(e){
                return res.json({code:1,msg:'异常'})
            }
            return res.json({code:0,msg:'注册成功'})
        })
    })
})

//用户登录
Router.post('/login', function (req, res) {
    const {mobile,pwd}  = req.body
    User.findOne({mobile,pwd: md5Pwd(pwd)},_filter,function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户不存在或密码错误'})
        }
        res.cookie('userId',doc._id)
        return res.json({code:0,data:doc})
    })
})

function md5Pwd (pwd) {
    const mds = 'qiang_'
    return utils.md5(utils.md5(mds+pwd))
    
  }
module.exports = Router