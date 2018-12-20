import React from 'react'
import { Button, WhiteSpace, WingBlank,List, InputItem } from 'antd-mobile';
import {HocFrom} from 'util/util'
import leftIcon from 'assets/icon/left.png'
import loginIcon from 'assets/login/logo2.png'
import 'scss/register.scss'

@HocFrom
class RegisterPage extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        //this.animationBg()
    }
    toLogin(){
        this.props.history.push('/login')
        window.location.reload()
    }
    sendSerify(){
        console.log(this.props.state)
    }
    render(){
        return (
        <div className="registerPage">
            <img src={leftIcon} style={{margin:10}} onClick={()=>this.toLogin()}></img>
            <img src={loginIcon} className="logo"></img>
            <List>
                <InputItem
                    placeholder="输入手机号"
                    extra=""
                    onChange={e=>this.props.handleChange('mobile',e)}
                >手机号</InputItem>
                <WhiteSpace/>
                 <InputItem
                    placeholder="输入密码"
                    onChange={e=>this.props.handleChange('pwd',e)}
                >密码</InputItem>
                <WhiteSpace/>
                 <InputItem
                    placeholder="输入重复密码"
                    onChange={e=>this.props.handleChange('repwd',e)}
                >重复密码</InputItem>
                <WhiteSpace/>
                <InputItem
                    placeholder="输入验证码"
                    onChange={e=>this.props.handleChange('serify',e)}
                    extra={<p onClick={()=>this.sendSerify()}>获取验证码</p>}
                >验证码</InputItem>
            </List>
        </div>    
        )
    }
}
export default RegisterPage