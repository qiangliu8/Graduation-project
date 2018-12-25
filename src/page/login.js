import React from 'react'
import { Button, WhiteSpace, Toast,ImagePicker, SegmentedControl,List, InputItem } from 'antd-mobile';
import {HocFrom} from 'util/util'
import leftIcon from 'assets/icon/left.png'
import loginIcon from 'assets/login/logo2.png'
import {checkMobile,randomCode} from 'util/util'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login,telLogon} from 'redux/user.redux.js'
import 'scss/login.scss'
import axios from 'axios'

@connect(
    state=>state,
    {login,telLogon}
)
@HocFrom
class LoginPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            multiple: false,
            time:60,
            serify:0
          }      
    }
    componentDidMount(){
        this.setState({serify:randomCode()})
    }
    toAuth(){
        this.props.history.push('/auth')
        window.location.reload()
    }
    tologin(){
        this.props.login(this.props.state)
    }
    render(){
        return (
        <div className="loginPage">
            <img src={leftIcon} style={{margin:10}} onClick={()=>this.toAuth()}></img>
            <img src={loginIcon} className="logo"></img>
            <div className="loginBody">
            <List>
                <InputItem
                    placeholder="输入手机号"
                    extra=""
                    onChange={e=>this.props.handleChange('mobile',e)}
                >手机号</InputItem>
                <WhiteSpace/>
                <InputItem
                    type='password'
                    placeholder="输入密码"
                    onChange={e=>this.props.handleChange('pwd',e)}
                >密码</InputItem>
                <WhiteSpace/>
            </List>
            <Button type="primary" inline className="loginsBtn" onClick={()=>this.props.totelLogon()}>手机号一键登陆</Button>
            <Button type="ghost" inline className="loginBtn" onClick={()=>this.tologin()}>登录</Button>
            </div>
        </div>    
        )
    }
}
export default LoginPage