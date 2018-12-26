import React from 'react'
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';

import 'scss/auth.scss'
class AuthPage extends React.Component{

    componentDidMount(){
        this.animationBg()
    }
    animationBg(){
        let offest= 0
        var ScrollTimer = window.setInterval(function scrollBG(){
            offest -=.1
            if(offest>307) offest = 0
             $('.bgpage').css('backgroundPosition','0px ' +
             offest+'px')
    }, 10)
    }
    tologin(){
        this.props.history.push('/login')
    }
    toRegister(){
        this.props.history.push('/register')
    }
    render(){
        return (
        <div className="AuthPage">
            <div className="bgpage"></div>
            <div className="loginLogo"></div>
            <Button  className="loginButton"  size="small" inline onClick={()=>this.tologin()} >登录</Button>
            <p className="register" onClick={()=>this.toRegister()}>注册</p>
        </div>    
        )
    }
}
export default AuthPage