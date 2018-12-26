import React from 'react'
import { NavBar, Icon, Flex,Grid  } from 'antd-mobile';
import {connect} from 'react-redux'
import 'scss/center.scss'


@connect(
    state=>state,
)

class Center extends React.Component{
    constructor(props) {
        super(props)
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
                        <div className="icon-head"></div>
                        <p style={{fontSize:'22px',marginRight:'2px'}}>{user.name}</p>
                        <div className="icon-boy"></div>
                    </Flex>
                    <Icon type="right"/>
                </Flex>
                <Flex justify="between" className="infoPart">
                    {infos.map(v=>(
                        <Flex className="infoParts" direction="column" justify="center" key={v.text}>
                            <p>{v.length}</p>
                            <p>{v.text}</p>       
                        </Flex>
                    ))}

                </Flex>

            </div>
        )
    }
}
export default Center