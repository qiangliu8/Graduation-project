import axios from 'axios'


//发送验证码
const sendSerifly = ({
    mobile,code
}) => axios.post('/user/sendcode', {mobile,code})

//获取用户基本信息
const getUserinfo = () => axios.get('/user/userinfo')

//用户注册
const toRegister = ({
    name,pwd,mobile
}) => axios.post('/user/register',{name,pwd,mobile})

//用户登陆
const toLogin= ({
    mobile,pwd
}) => axios.post('/user/login',{mobile,pwd})


module.exports = {
    sendSerifly,
    getUserinfo,
    toRegister,
    toLogin
}