import React from 'react'
import { TextareaItem,InputItem, WhiteSpace, WingBlank ,List,NavBar,Icon ,Flex} from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import {getUserFollowList,sendComment, getUserCommentList,getUserCollectlist,getUserNotelist} from 'api/user'
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
        switch(this.props.match.params.other){
            case 'note':
                getUserNotelist().then(res=>this.setState({list:res.data.data}))
                break
            case 'collect':
                getUserCollectlist().then(res=>this.setState({list:res.data.data}))
                break
            case 'follow':
                getUserFollowList().then(res=>this.setState({list:res.data.data}))
                break
            case 'comment':
                getUserCommentList().then(res=>this.setState({list:res.data.data}))
                break
            default:
                break
        }
       
    }

    todetail(name,id){
        if(name!='follow'){
            this.props.history.push(`/home/noteinfo/${id}`)
        }else{
            this.props.history.push(`/talk/${id}`)
        }

    }
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
                    <Flex key={v._id} className="followlList" onClick={()=>this.todetail(info.name,(v._id))}>
                        <img  src={v.portrait||v.mapgroup[0]} />
                        <Flex className="detail" direction='column' align='start' >
                            <p>{v.name||v.title||''}</p>
                            <p>{info.sec +':'+ (v.tab||v.content||v.comment)||info.unsec}</p>
                        </Flex>
                    </Flex>
                )):null}

            </div>
        )
    }
}
export default OtherInfo