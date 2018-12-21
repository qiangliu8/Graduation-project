import React from 'react'
import { Button, WhiteSpace, ImagePicker, SegmentedControl,List, InputItem } from 'antd-mobile';
import {HocFrom} from 'util/util'
import leftIcon from 'assets/icon/left.png'
import loginIcon from 'assets/login/logo2.png'
import {checkMobile,randomCode} from 'util/util'
import {sendSerifly} from 'api/user'
import 'scss/register.scss'
import axios from 'axios'

const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
  }];

@HocFrom
class RegisterPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            files: data,
            multiple: false,
          }
        
    }
    componentDidMount(){
        //this.animationBg()
        axios.get('/user/userlist')
        axios.get('/user/userinfo')
        axios({
            headers: {
                'deviceCode': 'A95ZEF1-47B5-AC90BF3'
            },
            method: 'post',
            url: '/user/usercode',
            data: {
                username:'1',
                pwd:2
            }
        })
        // axios.post('/user/usercode', {
        //         firstName: 'Fred',
        //         lastName: 'Flintstone'
        //       })
        //       .then(function (response) {
        //         console.log(response);
        //       })
        //       .catch(function (error) {
        //         console.log(error);
        //       });
    }
    onChanges(files, type, index){
        console.log(files, type, index);
        this.setState({
          files,
        });
      }
    toLogin(){
        this.props.history.push('/login')
        window.location.reload()
    }
    sendSerify(){
        if(checkMobile(this.props.state.mobile)){
            axios.post('/user/send', {
                mobile:'15755337162',
                code:randomCode()
            })
            // sendSerifly({
            //     mobile:'15755337162',
            //     code:randomCode()
            // })
        }
    }
    render(){
        const { files } = this.state;
        return (
        <div className="registerPage">
            <img src={leftIcon} style={{margin:10}} onClick={()=>this.toLogin()}></img>
            <img src={loginIcon} className="logo"></img>
            <List>
                <InputItem
                    placeholder="输入用户名"
                    extra=""
                    onChange={e=>this.props.handleChange('name',e)}
                >用户名</InputItem>
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
                    placeholder="输入手机号"
                    extra=""
                    onChange={e=>this.props.handleChange('mobile',e)}
                >手机号</InputItem>
                 <WhiteSpace/>
                <InputItem
                    placeholder="输入验证码"
                    onChange={e=>this.props.handleChange('serify',e)}
                    extra={<p onClick={()=>this.sendSerify()}>获取验证码</p>}
                >验证码</InputItem>
            </List>
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