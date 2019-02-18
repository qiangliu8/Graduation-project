import {dispatch} from 'redux'
import { Toast } from 'antd-mobile'
import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:8087')
import {getChatList,getChatInfo,sendChatinfo} from 'api/chat'
import { getRedirectPath } from 'util/util'

//获取聊天列表
const MSG_LIST = 'MSG_LIST'
//读取信息
const MSG_RECV = 'MSG_RECV'
//标识已读
const MSG_READ = 'MSG_READ'

const initState = {
    msg:[],
    unread:0,
    name:'',
    portrait:''
}

export function chat(state = initState,action){
    switch(action.type){
        case  MSG_LIST:
            return {...state,...action.payload,unread: action.payload.msg.filter(v => !v.read).length}
        case MSG_RECV:
            return { ...state, msg: [...state.msg, action.payload], unread: state.unread + 1 }
        default:
            return state
    }
}

function msgList(data){
    return {type:MSG_LIST, payload:data}
}

function msgRecv(data){
    return {type:MSG_RECV, payload:data}
}

export function getChatLists(){
    return dispatch=>{
        getChatList().then(res=>{
            if(res.status===200){
                debugger
                dispatch(msgList(res.data.data))
            }
        })
    }
}

export function getChatInfos(data){
    return dispatch=>{
        getChatInfo(data).then(res=>{
            if(res.status===200){
                dispatch(msgList(res.data.data))
            }
        })
    }
}

export function sendChat({ from, to, content }){
    return dispatch => {
        socket.emit('sendChat', { from, to, content })
      }
}

export function recvChat(){
    return dispatch =>{
        socket.on('recvChat', function (data) {
            dispatch(msgRecv(data))
        })
    }
}