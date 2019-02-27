const express = require('express')
const app = express()
const server = require('http').Server(app)
const UserRouter = require('./user')
const NoteRouter = require('./note')
const ChatRouter = require('./chat')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
var fs = require("fs")
var multer = require('multer')
const UserModel = require('./model')
const Chat = UserModel.getModel('chat')
const ChatList = UserModel.getModel('chatlist')
const mongoose = require('mongoose')

const io = require('socket.io')(server)

server.listen(8087, function() {
    console.log('连接成功，请访问8087端口！')
})

io.on('connection', function(socket) {
    console.log('socket.io连接成功！')
    socket.on('sendChat', function(data) {
        const { from, to, content } = data
        const chatid = [mongoose.Types.ObjectId(from), mongoose.Types.ObjectId(to)].sort()
        const chatModel = new Chat({ from: mongoose.Types.ObjectId(from), 'to': mongoose.Types.ObjectId(to), chatid, content })
        chatModel.save(function(e, d) {
            if (e) {
                return res.json({ code: 1, msg: '异常' })
            }
            io.emit('recvChat', Object.assign({}, d._doc))
        })
    })
    socket.on('disconnect', ()=>{
        console.log('socket.io断开连接！');
    })
    socket.on('reconnect', function() {
        console.log("socket.io重新连接!");
    });
})
app.use(express.static('public'));
app.use(cookieParser())
app.use(bodyParser.json())
    //app.use(multer({ dest: '/image/'}).single('head'))
app.use(multer({ dest: '/image/' }).array('image'))
app.use('/user', UserRouter)
app.use('/note', NoteRouter)
app.use('/chat', ChatRouter)
    // app.get('*', function (request, response) {
    //   response.sendFile(path.resolve(__dirname, '../dist', 'index.html'))
    // }