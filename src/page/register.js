import React from 'react'
import { Button, WhiteSpace, Toast,ImagePicker, SegmentedControl,List, InputItem } from 'antd-mobile';
import {HocFrom} from 'util/util'
import leftIcon from 'assets/icon/left.png'
import loginIcon from 'assets/login/logo2.png'
import {checkMobile,randomCode} from 'util/util'
import {sendSerifly} from 'api/user'
import {connect} from 'react-redux'
import {register} from 'redux/user.redux.js'
import 'scss/register.scss'
import axios from 'axios'

const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
  }];

@connect(
    state=>state,
    {register}
)

@HocFrom
class RegisterPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            files: data,
            multiple: false,
            time:60,
            code:0
          }      
    }
    componentDidMount(){
        this.setState({code:randomCode()})
    }
    onChanges(files, type, index){
        console.log(files, type, index);
        this.setState({
          files,
        });
    }
    toLogin(){
        this.props.history.push('/auth')
        window.location.reload()
    }
    sendSerify(){
        if(checkMobile(this.props.state.mobile)&& this.state.time===60){
            sendSerifly({
                ...this.props.state,
                ...this.state
            }).then(res=>{        
                if(res.status ===200){
                    let inter = setInterval(()=>{
                        this.setState({time:this.state.time-1},()=>{
                            if(this.state.time==0){
                                this.setState({time:60,code:randomCode()})
                                clearInterval(inter) 
                            }
                        })
                    },1000)
                }
            })
        }
    }
    toregister(){
        if(checkMobile(this.props.state.mobile)){
            this.props.register({...this.props.state,...this.state})
        }
    }
    render(){
        const { files } = this.state;
        return (
        <div className="registerPage">
            <img src={leftIcon} style={{margin:10}} onClick={()=>this.toLogin()}></img>
            <img src={loginIcon} className="logo"></img>
            <div className="registerBody">
            <List>
                <InputItem
                    placeholder="输入用户名"
                    extra=""
                    onChange={e=>this.props.handleChange('name',e)}
                >用户名</InputItem>
                <WhiteSpace/>
                <InputItem
                    type='password'
                    placeholder="输入密码"
                    onChange={e=>this.props.handleChange('pwd',e)}
                >密码</InputItem>
                <WhiteSpace/>
                <InputItem
                    type='password'
                    placeholder="输入重复密码"
                    onChange={e=>this.props.handleChange('repwd',e)}
                >重复密码</InputItem>
                <WhiteSpace/>
                <InputItem
                    placeholder="输入手机号"
                    extra=""
                    onChange={e=>this.props.handleChange('mobile',e)}
                >手机号</InputItem>
                 <WhiteSpace/>
                <InputItem
                    placeholder="输入验证码"
                    onChange={e=>this.props.handleChange('serify',e)}
                    extra={this.state.time==60?<p onClick={()=>this.sendSerify()}>获取验证码</p>:<p>{this.state.time}秒重新发送</p>}
                >验证码</InputItem>
            </List>

            <Button type="ghost" inline className="am-button am-button-borderfix am-button-ghost am-button-inline registerBtn" onClick={()=>this.toregister()}>注册</Button>
            </div>
            {/* <ImagePicker
            files={files}
            onChange={(files, type, index)=>this.onChanges(files, type, index)}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 1}
            multiple={this.state.multiple}
        /> */}
        </div>    
        )
    }
}
export default RegisterPage