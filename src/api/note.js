
import axios from 'axios'


//获取攻略列表
const getNoteList = () => axios.get('/note/notelist')
const getNoteListf = () => axios.get('/note/notelist_fabulous')
const getNoteListt = () => axios.get('/note/notelist_time')
const findNoteList = (key) => axios.post('/note/findnotelist',{key})

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

const ipaddress = (ip) =>axios.get(`https://restapi.amap.com/v3/place/around?key=3a76f52821beaeb2671e91665db4c625&location=${ip}&keywords=&types=&radius=1000&offset=10&page=1&extensions=all`)
module.exports = {
    getNoteList,
    getNoteListf,
    getNoteListt,
    findNoteList,
    noteImgUpload,
    getNoteToDo,
    getNoteInfo,
    noteEvent,
    noteComment,
    sendComment,
    ipaddress
}