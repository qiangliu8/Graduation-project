import React from 'react'
import { NavBar, Flex, SearchBar ,Icon } from 'antd-mobile'
import {tarbarList} from 'config/data'
import {getChatLists} from 'redux/chat.redux.js'
import {connect} from 'react-redux'
import Footer from 'component/footer'

import  'scss/talk.scss'
@connect(
 state=>state,
 {getChatLists}
)
class TalkList extends React.Component{
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.getChatLists()
    }
    render(){
        const { list } = this.props.state||{}
        return (
            <div>
                <div className="chatlist">
                    <NavBar
                        mode="light"
                        // icon={<Icon type="left" />}
                        // onLeftClick={() => {this.props.history.goBack()}}
                        >
                        消息
                    </NavBar>
                    <SearchBar placeholder="搜索" maxLength={8} />
                    {list?list.map(v=>(
                        <Flex key={v.userId} className="followlList" onClick={()=>this.toTalk(v.userId)}>
                            <img  src={v.portrait} />
                            <Flex className="detail" direction='column' align='start'>
                                <p>{v.name}</p>
                                <p>{'简介:'+ v.tab||''}</p>
                            </Flex>
                        </Flex>
                    )):null}
                </div>
                <Footer tarbarList={tarbarList}></Footer>
            </div>
        )
    }
}
export default TalkList