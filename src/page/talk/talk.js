import React from 'react'
import { NavBar, Flex, SearchBar ,Icon } from 'antd-mobile'
import {tarbarList} from 'config/data'
import {clearChatLists} from 'redux/chat.redux.js'
import {getChatList,findChatList} from 'api/chat'
import {connect} from 'react-redux'
import {monentDate} from 'util/util.js'
import Footer from 'component/footer'

import  'scss/talk.scss'
@connect(
 state=>state,
{clearChatLists}
)
class TalkList extends React.Component{
    constructor(props) {
        super(props)
    }

    componentDidMount(){
      this.getchat()
      this.props.clearChatLists()
    }
    getchat(){
        getChatList().then(res=>{
            if(res.status===200){
                this.setState({list:res.data.data})
            }
        })
    }

    toTalk = e => this.props.history.push(`/talk/${e}`)

    findchat(){
        if(this.state.key){
            findChatList(this.state.key).then(res=>{
                if(res.status===200){
                    this.setState({list:res.data.data})
                }
            })
        }else{
            this.getchat()
        }
    }
    render(){
        const { list } = this.state||{}
        return (
            <div>
                <div className="chatlist">
                    <NavBar
                        mode="light"
                        >
                        消息
                    </NavBar>
                    <SearchBar placeholder="搜索" maxLength={8} 
                    onChange={(e)=>this.setState({key:e})}
                    onSubmit={()=>this.findchat()}
                    />
                    {list?list.map(v=>(
                        <Flex key={v._id} className="userlList" onClick={()=>this.toTalk(v._id)}>
                            <img  src={v.portrait} />
                            <Flex className="detail" direction='column' align='start'>
                                <p>{v.name}</p>
                                <p>{v.content||''}</p>
                            </Flex>
                            <p className="time">{monentDate(v.time)||''}</p>
                        </Flex>
                    )):null}
                </div>
                <Footer tarbarList={tarbarList}></Footer>
            </div>
        )
    }
}
export default TalkList