import React from 'react'
import { NavBar, List, InputItem,Icon ,Toast } from 'antd-mobile'
import {getChatInfos,sendChat,recvChat} from 'redux/chat.redux.js'
import { createForm } from 'rc-form'
import {connect} from 'react-redux'
const socket = io('ws://localhost:8087')
import io from 'socket.io-client'
import  'scss/talk.scss'
@connect(
    state=>state,
    {getChatInfos,sendChat,recvChat}
)
class TalkInfos extends React.Component{
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.getChatInfos(this.props.match.params)
        this.props.recvChat()
    }

    handleChange(key,val){
        this.setState({[key]:val})
    }

    tosend(){
        if(!this.props.form.getFieldValue('content')){
            Toast.info('请重新输入内容再发送！', 2, null, false);
            return false
        }
        const from = this.props.user._id
        const to = this.props.match.params.to
        const content = this.props.form.getFieldValue('content')
        this.props.sendChat({ from, to, content })
        this.props.form.setFields({"content":""})
    }
    componentWillUnmount(){
        //强制刷新取消 多次消息
        window.location.reload()
    }
    render(){
        const { chat,user } = this.props||{}
        const to = this.props.match.params.to
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <div className="chatinfo">
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => {this.props.history.goBack()}}>
                        {chat.name||''}
                    </NavBar>
                    <div style={{paddingBottom:'50px'}}>
                        {this.props.chat?this.props.chat.msg.map(v => {
                            return v.from == to ? (
                                <div className="chatList left" key={v._id}>  
                                    <img src={chat.portrait} ></img>         
                                    <p >{v.content}</p>
                                </div>
                            ) : (
                                <div className="chatList right" key={v._id} >
                                    <img src={user.portrait} className=''></img>
                                    <p  >{v.content}</p>
                                </div>
                            )
                        }):null}
                    </div>
                    <List className="chatFooter">
                        <InputItem
                            onChange={e=>{this.handleChange('content',e)}}
                            {...getFieldProps('content')}
                            extra={'发送'}
                            // extra={<span onClick={()=>this.tosend()}>发送</span>}
                            onExtraClick={()=>this.tosend()}
                        ></InputItem>
                    </List>
                </div>
            </div>
        )
    }
}

const TalkInfo = createForm({})(TalkInfos);
export default TalkInfo