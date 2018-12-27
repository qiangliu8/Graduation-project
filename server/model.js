const mongoose = require('mongoose')
const DB_URL = 'mongodb://127.0.0.1:27017'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
    console.log('数据库连接成功！')
})

let models = {
    user:{
        'name':{'type':String, 'require':true},
        'pwd':{'type':String, 'require':true},
        'mobile': { 'type': String ,'require':true},
        'portrait': { 'type': String },
        'admin':{'type':Boolean},
        'sex':{'type':String},
        'view':{'type':String},
        'birth':{'type':String},
        'tab':{'type':String},
    }
}

for(let m in models){
    mongoose.model(m , new mongoose.Schema(models[m]))
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name)
    }
}