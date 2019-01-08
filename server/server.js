const express = require('express')
const app = express()
const server = require('http').Server(app)
const UserRouter = require('./user')
const NoteRouter = require('./note')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
var fs = require("fs")
var multer  = require('multer')

server.listen(8087,function(){
  console.log('连接成功，请访问8087端口！')
})

app.use(express.static('public'));
app.use(cookieParser())
app.use(bodyParser.json())
//app.use(multer({ dest: '/image/'}).single('head'))
app.use(multer({ dest: '/image/'}).array('image'))
app.use('/user', UserRouter)
app.use('/note', NoteRouter)
// app.get('*', function (request, response) {
//   response.sendFile(path.resolve(__dirname, '../dist', 'index.html'))
// }



