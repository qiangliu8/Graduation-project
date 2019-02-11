import React from 'react'
import { TextareaItem,InputItem, WhiteSpace, WingBlank ,List,NavBar,Icon ,Flex} from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import {getFollowList,sendComment} from 'api/user'
import {infos} from 'config/data'

import 'scss/center.scss'

@withRouter
class OtherInfo extends React.Component{
    constructor(props) {
        super(props)
        this.state={
        }
    }

    componentDidMount(){
       getFollowList().then(res=>this.setState({list:res.data.data}))
    }

    toTalk = e => this.props.history.push(`/talk/${e}`)

    render(){
        const info  = infos.find(v=> v.name == this.props.match.params.other)
        const {num, list } = this.state||{}
        return (
            <div className="otherinfo">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {this.props.history.goBack()}}>
                    {info.text}
                </NavBar>
                {list?list.map(v=>(
                    <Flex key={v.userId} className="followlList" onClick={()=>this.toTalk(v.userId)}>
                        <img  src={v.portrait} />
                        <Flex className="detail" direction='column' align='start'>
                            <p>{v.name}</p>
                            <p>{'简介:'+ v.tab||'暂无简介'}</p>
                        </Flex>
                    </Flex>
                )):null}

            </div>
        )
    }
}
export default OtherInfo