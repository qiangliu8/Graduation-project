import {dispatch} from 'redux'
import { Toast } from 'antd-mobile';
import axios from 'axios'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const AUTH_SUCCESS = 'AUTH_SUCCESS'

const initState = {
    name:'',
    mobile:'',
    msg:''
}

export function user(state = initState,action){
    switch(action.type){
        case  LOAD_DATA:
            return {...state,...action.payload}
        case  AUTH_SUCCESS:
            return {...state,...action.type}
        case ERROR_MSG:
            return {...state, msg:action.msg}
        default:
            return state
    }
}

function errorMsg(msg){
    Toast.info(msg, 2, null, false)
    return {msg ,type:ERROR_MSG}
}
function authSuccess(obj){
    return {type:AUTH_SUCCESS,payload:obj}
}
//注册
export function register({name,pwd,repwd,mobile,serify}){
    if(!user||!pwd||!mobile||!repwd||!serify){
        return errorMsg('用户名密码手机号等必须全部输入！')
    }
    if(pwd!=repwd){
        return errorMsg('两次密码必须输入一致！')
    }
    return dispatch=>{
        axios.post('/user/register',{name,pwd,mobile}).then(
            res=>{
                if(res.status ===200&&res.data.code===0){
                    dispatch(authSuccess({name,mobile}))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}