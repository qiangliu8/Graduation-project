const express = require('express')
const Router = express.Router()
const UserModel = require('./model')
const Note = UserModel.getModel('note')
const Fabulous = UserModel.getModel('fabulous')
const Comments = UserModel.getModel('comment')
const Collects = UserModel.getModel('collect')
const Follow = UserModel.getModel('follow')
const User = UserModel.getModel('user')
const { putnotes } = require('./upload')
var fs = require("fs");
const mongoose = require('mongoose')
    //获取攻略列表
Router.get('/notelist', function(req, res) {
    Note.aggregate([{
            $lookup: {
                from: 'users',
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $lookup: {
                from: 'fabulous',
                localField: "_id",
                foreignField: "noteId",
                as: "fabulous"
            }
        },
        {
            $project: {
                'userId': 1,
                'mapgroup': 1,
                'title': 1,
                'create_time':1,
                'name': { '$arrayElemAt': ['$user.name', 0] },
                'portrait': { '$arrayElemAt': ['$user.portrait', 0] },
                'fabulous': { $size: '$fabulous' }
            }
        },
    ], function(err, doc) {
        return res.json({ code: 0, data: doc })
    })
})

//最新时间的攻略列表
Router.get('/notelist_time', function(req, res) {
    Note.aggregate([{
            $lookup: {
                from: 'users',
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $lookup: {
                from: 'fabulous',
                localField: "_id",
                foreignField: "noteId",
                as: "fabulous"
            }
        },
        {$sort:{ create_time : -1 }},
        {
            $project: {
                'userId': 1,
                'mapgroup': 1,
                'title': 1,
                'create_time':1,
                'name': { '$arrayElemAt': ['$user.name', 0] },
                'portrait': { '$arrayElemAt': ['$user.portrait', 0] },
                'fabulous': { $size: '$fabulous' }
            }
        },
    ], function(err, doc) {
        return res.json({ code: 0, data: doc })
    })
})
//最热的攻略列表
Router.get('/notelist_fabulous', function(req, res) {
    Note.aggregate([{
            $lookup: {
                from: 'users',
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $lookup: {
                from: 'fabulous',
                localField: "_id",
                foreignField: "noteId",
                as: "fabulous"
            }
        },
        {$sort:{ fabulous : -1 }},
        {
            $project: {
                'userId': 1,
                'mapgroup': 1,
                'title': 1,
                'create_time':1,
                'name': { '$arrayElemAt': ['$user.name', 0] },
                'portrait': { '$arrayElemAt': ['$user.portrait', 0] },
                'fabulous': { $size: '$fabulous' }
            }
        },
    ], function(err, doc) {
        return res.json({ code: 0, data: doc })
    })
})
//搜索后攻略列表
Router.post('/findnotelist', function(req, res) {
    const {key} = req.body
    Note.aggregate([{
            $lookup: {
                from: 'users',
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $lookup: {
                from: 'fabulous',
                localField: "_id",
                foreignField: "noteId",
                as: "fabulous"
            }
        },
        {
            $project: {
                'userId': 1,
                'mapgroup': 1,
                'title': 1,
                'create_time':1,
                'name': { '$arrayElemAt': ['$user.name', 0] },
                'portrait': { '$arrayElemAt': ['$user.portrait', 0] },
                'fabulous': { $size: '$fabulous' }
            }
        },
    ], function(err, doc) {
        return res.json({ code: 0, data: doc.filter(v=>v.title.indexOf(key)!= -1)})
    })
})
//获取攻略详情
Router.post('/noteinfo', function(req, res) {
    const { id } = req.body
    const userId = req.cookies.userId
    Note.aggregate([{
            $lookup: {
                from: 'users',
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $lookup: {
                from: 'fabulous',
                localField: "_id",
                foreignField: "noteId",
                as: "fabulous"
            }
        },
        {
            $lookup: {
                from: 'collects',
                localField: "_id",
                foreignField: "noteId",
                as: "collect"
            }
        },
        {
            $lookup: {
                from: 'comments',
                localField: "_id",
                foreignField: "noteId",
                as: "comment"
            }
        },
        {
            $lookup: {
                from: 'follows',
                localField: "userId",
                foreignField: "followId",
                as: "follows"
            }
        },
        {
            $project: {
                userId: 1,
                mapgroup: 1,
                title: 1,
                follows:1,
                content: 1,
                address:1,
                name: { $arrayElemAt: ['$user.name', 0] },
                portrait: { $arrayElemAt: ['$user.portrait', 0] },
                fabulous: { $size: '$fabulous' },
                collect: { $size: '$collect' },
                comment: { $size: '$comment' }
            }
        },
        { "$match": { "_id": mongoose.Types.ObjectId(id) } }
    ], function(err, doc) {

        Follow.findOne({ 'userId': mongoose.Types.ObjectId(userId), 'followId': mongoose.Types.ObjectId(doc[0].userId) }, function(err, doc1) {
            
            if (doc1) {
                return res.json({ code: 0, data: Object.assign({},doc[0],{follow:true}) })
            }else{
                return res.json({ code: 0, data: Object.assign({},doc[0],{follow:false}) })
            }
        })
        //return res.json({ code: 0, data: doc[0] })
    })

})

//发布攻略
Router.post('/noteImgUpload', function(req, res) {
    const userId = req.cookies.userId
    if (!userId) {
        return res.json.dumps({ code: 1 })
    }
    const { content, title ,address} = req.body
    putnotes(req.files).then((result) => {
        let mapgroup = result.map(v => v.url)
        const noteModel = new Note({ userId: mongoose.Types.ObjectId(userId), mapgroup, content, title,address })
        noteModel.save(function(e, d) {
            if (e) {
                return res.json({ code: 1, msg: '异常' })
            }
            return res.json({ code: 0, msg: '发布成功' })
        })

    })
})

//收藏攻略
Router.post('/noteCollect', function(req, res) {
        const userId = req.cookies.userId
        if (!userId) {
            return res.json.dumps({ code: 1 })
        }
        const { _id } = req.body
        const body = { 'userId': mongoose.Types.ObjectId(userId), 'noteId': mongoose.Types.ObjectId(_id) }
        Collects.findOne(body, function(err, doc) {
            if (doc) {
                return res.json({ code: 1, msg: '您已经收藏过了' })
            }
            const userModel = new Fabulous(body)
            userModel.save(function(e, d) {
                if (e) {
                    return res.json({ code: 1, msg: '异常' })
                }
                Fabulous.find({ 'noteId': mongoose.Types.ObjectId(_id) }).count(function(err, docs) {
                    if (err) {
                        return res.json({ code: 1, msg: '异常' })
                    }
                    return res.json({ code: 0, msg: '收藏成功', data: docs })
                })
            })
        })
    })
    //点赞攻略
Router.post('/noteEvent', function(req, res) {
    const userId = req.cookies.userId
    if (!userId) {
        return res.json.dumps({ code: 1 })
    }
    const { _id, event } = req.body
    const body = { 'userId': mongoose.Types.ObjectId(userId), 'noteId': mongoose.Types.ObjectId(_id) }
    let Models = UserModel.getModel(`${event}`)
    Models.findOne(body, function(err, doc) {
        if (doc) {
            return res.json({ code: 1, msg: '您已经操作过了' })
        }
        let userModels = null
        switch (event) {
            case 'fabulous':
                userModels = new Fabulous(body)
                break
            case 'collect':
                userModels = new Collects(body)
                break
            default:
                userModels = new Fabulous(body)
        }
        userModels.save(function(e, d) {
            if (e) {
                return res.json({ code: 1, msg: '异常' })
            }
            Models.find({ 'noteId': mongoose.Types.ObjectId(_id) }).count(function(err, docs) {
                if (err) {
                    return res.json({ code: 1, msg: '异常' })
                }
                return res.json({ code: 0, msg: '操作成功', data: docs })
            })

        })
    })
})

//查询用户是否点赞评论过该攻略
Router.post('/noteToDo', function(req, res) {
    const userId = req.cookies.userId
    if (!userId) {
        return res.json.dumps({ code: 1 })
    }
    const { _id } = req.body
    const body = { 'userId': mongoose.Types.ObjectId(userId), 'noteId': mongoose.Types.ObjectId(_id) }
    let data = {}
        // "fabulous":{"$elemMatch":{'noteId':mongoose.Types.ObjectId(_id)}}
    Fabulous.findOne(body, function(err, doc) {
        if (doc) {
            data.fabulous = true
        }
    })
    Comments.findOne(body, function(err, doc) {
        if (doc) {
            data.comment = true
        }
    })
    Collects.findOne(body, function(err, doc) {
            if (doc) {
                data.collect = true
            }
            return res.json({ code: 0, data: data })
        })
        // User.aggregate([{$lookup: {
        //     from: 'fabulous',
        //     localField: "_id",
        //     foreignField: "userId", 
        //     as: "fabulous" 
        //     }},
        //     {$lookup: {
        //         from: 'collects',
        //         localField: "_id",
        //         foreignField: "userId", 
        //         as: "collect" 
        //     }},
        //     {$lookup: {
        //         from: 'comments',
        //         localField: "_id",
        //         foreignField: "userId", 
        //         as: "comment" 
        //     }},
        //     {$unwind:'$fabulous'},
        //     // {$project:{   
        //     //     'fabulous': {'$arrayElemAt':['$fabulous', 0]},
        //     //     'collect': {'$arrayElemAt':['$collect', 0]},
        //     //     'comment': {'$arrayElemAt':['$comment', 0]},
        //     //     }},
        //     {"$match": {"_id": mongoose.Types.ObjectId(userId),}}],function(err,doc){
        //         // let data = {}
        //         // if(doc[0].fabulous) data.fabulous= true
        //         // if(doc[0].collect) data.collect= true
        //         // if(doc[0].comment) data.comment= doc[0].comment
        //         return res.json({code:0,data:doc})
        //     })
})

//查询评论列表
Router.post('/noteComment', function(req, res) {
    const { id } = req.body
    Comments.aggregate([{
            "$match": { "noteId": mongoose.Types.ObjectId(id) }
        }, {
            $lookup: {
                from: 'users',
                localField: "userId",
                foreignField: '_id',
                as: "user"
            }
        },
        {
            $project: {
                'creat_time': 1,
                'comment': 1,
                'name': { '$arrayElemAt': ['$user.name', 0] },
                'portrait': { '$arrayElemAt': ['$user.portrait', 0] },
            }
        },
        { $sort: { creat_time: 1 } },
        { $limit: 10 }
    ], function(err, doc) {
        Comments.find({ "noteId": mongoose.Types.ObjectId(id) }).count(function(err, docs) {
            return res.json({ code: 0, data: { list: doc, num: docs } })
        })
    })

})

//发送评论
Router.post('/sendComment', function(req, res) {
    const userId = req.cookies.userId
    if (!userId) {
        return res.json({ code: 1 })
    }
    const { id, comment } = req.body
    const noteModel = new Comments({ userId: mongoose.Types.ObjectId(userId), 'noteId': mongoose.Types.ObjectId(id), comment })
    console.log(noteModel)
    noteModel.save(function(e, d) {
        if (e) {
            return res.json({ code: 1, msg: '异常' })
        }
        return res.json({ code: 0, msg: '评论成功！' })
    })
})

module.exports = Router