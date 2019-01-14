
import axios from 'axios'


//获取攻略列表
const getNoteList = () => axios.get('/note/notelist')

//获取攻略详情
const getNoteInfo = id => axios.post('/note/noteinfo',id)

//获取用户是否点赞或者评论
const getNoteToDo = ({_id}) => axios.post('/note/noteToDo',{_id} )
//用户头像上传
const noteImgUpload = data => axios({
    url: '/note/noteImgUpload',
    method: 'post',
    data: data,
    contentType: false,
    processData: false,
})

//点赞攻略
const noteEvent = ({_id},event) => axios.post('/note/noteEvent',{_id,event})
//获取评论列表
const noteComment = id => axios.post('/note/noteComment',id)
//发送评论
const sendComment = ({id},{comment}) => axios.post('/note/sendComment',{id,comment})

module.exports = {
    getNoteList,
    noteImgUpload,
    getNoteToDo,
    getNoteInfo,
    noteEvent,
    noteComment,
    sendComment
}