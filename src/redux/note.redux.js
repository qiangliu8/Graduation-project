import {dispatch} from 'redux'
import { Toast } from 'antd-mobile'

//记录草稿信息
const NOTE_UNPUB= 'NOTE_UNPUB'
//已发表
const NOTE_PUB = 'NOTE_PUB'


const initState = {
    title:'',
    files:[],
    content:'',
    address:''
}

export function note(state = initState,action){
    switch(action.type){
        case  NOTE_UNPUB:
            return {...state,...action.payload}
        case NOTE_PUB:
            return { ...initState}
        default:
            return state
    }
}

export function writeNote({ title,files,content,address}){
    return dispatch=>{
        dispatch(NOTEUNPUB({ title,files,content,address}))
    }
}
function NOTEUNPUB(data){
    return {type:NOTE_UNPUB,payload:data}
}

export function pubNote(){
    return dispatch=>{
        dispatch({type:NOTE_PUB})
    } 
}