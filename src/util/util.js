

import React from 'react'
import { Toast } from 'antd-mobile'
//高阶组件
export function HocFrom(Comp){
    return class WrapperComp extends React.Component{
        constructor(props){
            super(props)
            this.state={}
        }
        handleChange(key,val){
            this.setState({[key]:val})
        }
        render(){
            return <Comp handleChange={(key,val)=>this.handleChange(key,val)} handleChange={(key,val)=>this.handleChange(key,val)} state={this.state} {...this.props}></Comp>
        }
    }
}

//正则校验手机号
export function checkMobile(mobile){
    if(!(/^1[3|4|5|8][0-9]\d{8}$/).test(mobile)){
        Toast.info('不是完整的11位手机号或者正确的手机号', 1)
        return false;
    }
    return true;
}

//生成随机6位数字验证码
export function randomCode(){
   return  Math.random().toString().slice(-6)
}

//根据用户的权限
export function getRedirectPath({admin,isAuth}){
    let url = '/auth'
    if(isAuth){
        url = admin ? '/adminPage':'/home' 
    }
    return url
}