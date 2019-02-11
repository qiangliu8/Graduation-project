const express = require('express')
const Router = express.Router()
const UserModel = require('./model')
const User = UserModel.getModel('user')
const Follow = UserModel.getModel('follow')
const utils = require('utility')
const mongoose = require('mongoose')
const SMSClient = require ('@alicloud/sms-sdk')
var fs = require("fs");
const {sendSerifly,loginSerifly} = require('../src/util/server')
const _filter = { 'pwd': 0, '__v': 0 }
const {put} = require('./upload')


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
    console.log(code)
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
        const userModel = new User({name,mobile, pwd: md5Pwd(pwd),admin:false}) 
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

//头像上传
Router.post('/headupload', function (req, res) {
    const userId = req.cookies.userId
    if(!userId){
        return res.json({code:1})
    }
    // var des_file = __dirname + "/" + req.files[0].originalname;
    console.log(req.files)
    fs.readFile( req.files[0].path, function (err, data) {
        put(req.files[0].originalname,req.files[0].path)
        .then(result=>{
             return res.json({code:0,data:result})
         })
        .catch(err=>res.json({code:1,msg:err}))
        //  fs.writeFile(des_file, data, function (err) {
        //   if( err ){
        //        console.log( err );
        //   }else{
        //         response = {
        //             message:'图片上传成功（1/2）', 
        //             filename:req.files[0].originalname
        //        }
        //        put(req.files[0].originalname,req.files[0].path)
        //        .then(result=>{
        //             return res.json({code:0,data:result})
        //         })
        //        .catch(err=>res.json({code:1,msg:err}))
        //    }
        // })
    })
})
//更新其他信息
Router.post('/update',function(req,res){
    const body= req.body
    const userId = req.cookies.userId
    // console.log(body)
    if (!userId) {
        return res.json
        ({code:1})
    }
    User.updateOne({_id:userId}, body, function(err, doc){
        if (err) {
            console.log("头像上次失败！")
        }
        else {
            return res.json({code:0,data:body})
        }
    })
})
//m5 加密
function md5Pwd (pwd) {
    const mds = 'qiang_'
    return utils.md5(utils.md5(mds+pwd))
}

//关注别人
Router.post('/userfollow',function(req,res){
    const userId= req.cookies.userId
    if(!userId){
        return res.json({code:1})
    }
    const followId = req.body.userId
    if( userId === followId){
        return  res.json({code:1,msg:'关注对象不能是本人！'})
    }
    Follow.findOne({'userId':mongoose.Types.ObjectId(userId),'followId':mongoose.Types.ObjectId(followId)},function(err,doc){
        if(doc){
          return  res.json({code:1,msg:'您已关注该用户！'})
        }
        const noteModel = new Follow({userId:mongoose.Types.ObjectId(userId),'followId':mongoose.Types.ObjectId(followId)})
        noteModel.save(function(e,d){
            if(e){
                 return  res.json({code:1,msg:'异常'})
            }
            return res.json({code:0,msg:'关注成功！'})
        })
    })
})

//获取用户各种信息
Router.get('/getuserotherinfo',function(req,res){
    const { userId } = req.cookies
    if(!userId){
        return res.json({code:90000,msg:'用户未登录'})
    }
    User.aggregate([{$match:{"_id": mongoose.Types.ObjectId(userId)}},
        {$lookup: {
            from: 'notes',
            localField: "_id",
            foreignField: "userId", 
            as: "note" 
            }},
        {$lookup: {
            from: 'collects',
            localField: "_id",
            foreignField: "userId", 
            as: "collect" 
        }},
        {$lookup: {
            from: 'comments',
            localField: "_id",
            foreignField: "userId", 
            as: "comment" 
        }},  
        {$lookup: {
            from: 'follows',
            localField: "_id",
            foreignField: "userId", 
            as: "follow" 
        }},
        {$project:{  
            '_id':0,
            'follow':{$size:'$follow'},
            'note':{$size:'$note'},
            'collect':{$size:'$collect'},
            'comment':{$size:'$comment'},
        }},],function(err,doc){
        return res.json({code:0,data:doc[0]})
    })
})

//获取用户的关注的用户列表
Router.get('/getfollowlist',function(req,res){
    const { userId } = req.cookies
    if(!userId){
        return res.json({code:90000,msg:'用户未登录'})
    }
    Follow.aggregate([{$match:{"userId": mongoose.Types.ObjectId(userId)}},
        {$lookup: {
            from: 'users',
            localField: "followId",
            foreignField: "_id", 
            as: "user" 
            }},
        {$project:{  
            '_id':0,
            'name':{'$arrayElemAt':['$user.name',0]},
            'portrait': {'$arrayElemAt':['$user.portrait', 0]},
            'tab': {'$arrayElemAt':['$user.tab', 0]},
            'userId': {'$arrayElemAt':['$user._id', 0]},
        }},],function(err,doc){
        return res.json({code:0,data:doc})
    })
})
module.exports = Router