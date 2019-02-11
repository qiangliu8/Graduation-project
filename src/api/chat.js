
import axios from 'axios'


//获取单一聊天详情列表
const getChatInfo = (to) => axios.post('/chat/chatinfo',to)

//获取所有的聊天列表
const getChatList = () => axios.get('/chat/chatlist')

//发送聊天信息
const sendChatinfo = ({to},{content}) => axios.post('/chat/sendChat',{to,content})
module.exports = {
    getChatInfo,
    getChatList,
    sendChatinfo
}