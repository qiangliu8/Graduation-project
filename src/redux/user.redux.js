import {dispatch} from 'redux'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'

const initState = {
    name:'',
    telephone:'',
    msg:''
}

export function user(state = initState,action){
    switch(action.type){
        case  LOAD_DATA:
        return {...state,...action.type}
    }
}

export function register({tel,pwd,repeatpwd,}){
    
}