import axios from 'axios'


//发送验证码
const sendSerifly = ({
    mobile,code
}) => axios.post('/user/sendcode', {mobile,code})

//获取用户基本信息
const getUserinfo = () => axios.get('/user/userinfo')

const getUserList= () => axios.get('/user/userlist')
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
const getUserFollowList = () => axios.get('/user/getuserfollowlist')

const getUserCommentList = () => axios.get('/user/getusercommentlist')

const getUserCollectlist = () => axios.get('/user/getusercollectlist')

const getUserNotelist = () => axios.get('/user/getusernotelist')
module.exports = {
    sendSerifly,
    getUserinfo,
    toRegister,
    toLogin,
    headUpload,
    update,
    Follow,
    getUserOtherInfo,
    getUserFollowList,
    getUserCommentList,
    getUserCollectlist,
    getUserNotelist,
    getUserList
}