
import axios from 'axios'


//获取攻略列表
const getNoteList = () => axios.get('/note/notelist')

//获取攻略详情
const getNoteInfo = id => axios.post('/note/noteinfo',id)

//用户头像上传
const noteImgUpload = data => axios({
    url: '/note/noteImgUpload',
    method: 'post',
    data: data,
    contentType: false,
    processData: false,
})


module.exports = {
    getNoteList,
    noteImgUpload,
    getNoteInfo
}