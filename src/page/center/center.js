import React from 'react'
import { NavBar, Icon, Flex,WhiteSpace,List  } from 'antd-mobile'
import {tarbarList} from 'config/data'
import {connect} from 'react-redux'
import {logout} from 'redux/user.redux.js'
import Footer from 'component/footer'
import cookies from 'browser-cookies'
import 'scss/center.scss'

const Item = List.Item

@connect(
    state=>state,
    {logout}
)

class personCenter extends React.Component{
    constructor(props) {
        super(props)
    }
    logout(){
        cookies.erase('userId')
        this.props.logout()
    }
    toinfo(){
        this.props.history.push('/center/info')
    }
    render(){
        const infos =[
            {   
                text:'发布',
                length:1
            },
            {   
                text:'收藏',
                length:2
            },
            {   
                text:'关注',
                length:3
            },
            {   
                text:'评论',
                length:4
            }
        ] 
        const {user} = this.props
        return (
            <div className="centerPage">
                <NavBar
                    mode="light"
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[<Icon key="1" type="ellipsis" />]}>
                </NavBar>
                <Flex justify="between" className="headPart">
                    <Flex>
                        {user.portrait?<img src={user.portrait} className="portrait"/>:<img className="icon-head portrait"/>}
                        <p style={{fontSize:'22px',marginRight:'2px'}}>{user.name}</p>
                        <div className="icon-boy"></div>
                    </Flex>
                    <Icon type="right" onClick={()=>this.toinfo()}/>
                </Flex>
                <Flex justify="between" className="infoPart" >
                    {infos.map(v=>(
                        <Flex className="infoParts" direction="column" justify="center" key={v.text}>
                            <p className="infoPartp">{v.length}</p>
                            <p>{v.text}</p>       
                        </Flex>
                    ))}

                </Flex>
                <WhiteSpace></WhiteSpace>
                <List className="my-list" >
                <Item onClick={()=>this.logout()}>退出登录</Item>
                </List>
                <Footer tarbarList={tarbarList}></Footer>
            </div>
        )
    }
}
export default personCenter