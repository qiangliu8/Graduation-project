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

//用户头像上传
const headUpload = data => axios({
    url: '/user/headupload',
    method: 'post',
    data: data,
    contentType: false,
    processData: false,
})

//更新数据
const update = data =>axios.post('/user/update',data)

//关注某用户
const Follow = userId => axios.post('/user/userfollow',userId)

//获取用户收藏 评论  关注等各种信息
const getUserOtherInfo = () => axios.get('/user/getuserotherinfo')

//获取用户关注的用户列表
const getFollowList = () => axios.get('/user/getfollowlist')

module.exports = {
    sendSerifly,
    getUserinfo,
    toRegister,
    toLogin,
    headUpload,
    update,
    Follow,
    getUserOtherInfo,
    getFollowList
}