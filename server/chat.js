const express = require('express')
const Router = express.Router()
const UserModel = require('./model')
const User = UserModel.getModel('user')
const Chat = UserModel.getModel('chat')
const mongoose = require('mongoose')

//查看与该用户的所有聊天记录 
Router.post('/chatinfo', function(req, res) {
    const { userId } = req.cookies
    if (!userId) {
        return res.json({ code: 90000, msg: '用户未登录' })
    }
    const { to } = req.body
    Chat.find({ "$or": [{ "from": mongoose.Types.ObjectId(to), 'to': mongoose.Types.ObjectId(userId) }, { "from": mongoose.Types.ObjectId(userId), 'to': mongoose.Types.ObjectId(to) }] }, function(err, doc1) {
        User.findOne({ _id: to }, { name: 1, portrait: 1 }, function(err, doc2) {
            if (err) {
                return res.json({ code: 9999, msg: '异常' })
            }
            if (doc2) {
                return res.json({ code: 0, data: Object.assign({}, { 'msg': doc1 }, doc2._doc) })
            }
        })
    })
})

//发送消息
Router.post('/sendChat', function(req, res) {
    const { userId } = req.cookies
    if (!userId) {
        return res.json({ code: 90000, msg: '用户未登录' })
    }
    const { to, content } = req.body
    const noteModel = new Chat({ from: mongoose.Types.ObjectId(userId), 'to': mongoose.Types.ObjectId(to), content })
    console.log(noteModel)
    noteModel.save(function(e, d) {
        if (e) {
            return res.json({ code: 1, msg: '异常' })
        }
        return res.json({ code: 0, data: d })
    })
})

//查看用户的所有聊天记录列表 
Router.get('/chatlist', function(req, res) {
    const { userId } = req.cookies
    if (!userId) {
        return res.json({ code: 90000, msg: '用户未登录' })
    }
    //查找列表里对应的chatid数组 搜索最近的一个文档 的内容 和时间
    Chat.aggregate([{ "$match": { chatid: { $in: [mongoose.Types.ObjectId(userId)] } } },
        { $group: { _id: '$chatid', content: { $last: "$content" }, time: { $last: "$create_time" }, count: { $sum: 1 } } },
        { $unwind: "$_id" },
        { "$match": { _id: { $ne: mongoose.Types.ObjectId(userId) } } },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $project: {
                content: 1,
                time: 1,
                _id: 1,
                name: { $arrayElemAt: ['$user.name', 0] },
                portrait: { $arrayElemAt: ['$user.portrait', 0] }
            }
        }
    ], function(e, d) {
        if (e) {
            return res.json({ code: 1, msg: '异常' })
        }
        return res.json({ code: 0, data: d })
    })
})

module.exports = Router