const express = require('express')
const app = express()
const server = require('http').Server(app)
const UserRouter = require('./user')



server.listen(8087,function(){
  console.log('连接成功，请访问8087端口！')
})

app.use('/user', UserRouter)
// app.get('*', function (request, response) {
//   response.sendFile(path.resolve(__dirname, '../dist', 'index.html'))
// })