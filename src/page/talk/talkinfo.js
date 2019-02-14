import React from 'react'
import { NavBar, List, InputItem,Icon  } from 'antd-mobile'
import {getChatInfos,sendChat} from 'redux/chat.redux.js'
import {connect} from 'react-redux'

import  'scss/talk.scss'
@connect(
    state=>state,
    {getChatInfos,sendChat}
)
class TalkInfo extends React.Component{
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.getChatInfos(this.props.match.params)
    }

    handleChange(key,val){
        this.setState({[key]:val})
    }

    tosend(){
        const from = this.props.user._id
        const to = this.props.match.params.to
        const content = this.state.content
        this.props.sendChat({ from, to, content })
        $('.am-input-control input').val('')
    }
    render(){
        const { chat } = this.props||{}
        return (
            <div>
                <div className="chatinfo">
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => {this.props.history.goBack()}}>
                        {chat.name||''}
                    </NavBar>
                    {this.props.chat?this.props.chat.msg.map(v => {
                        return v.from == v.to ? (
                            <div className="chatList" >           
                                <p className="left" key={v._id}>{v.content}</p>
                            </div>
                        ) : (
                            <div className="chatList" >
                                <p className="right" key={v._id}>{v.content}</p>
                            </div>
                        )
                    }):null}
                    <List className="chatFooter">
                        <InputItem
                            onChange={e=>{this.handleChange('content',e)}}
                            extra={<span onClick={()=>this.tosend()}>发送</span>}
                        ></InputItem>
                    </List>
                </div>
            </div>
        )
    }
}
export default TalkInfo