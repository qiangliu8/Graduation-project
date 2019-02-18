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

io.on('connection', function(socket) {
    console.log('建立连接')
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
})

server.listen(8087, function() {
    console.log('连接成功，请访问8087端口！')
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