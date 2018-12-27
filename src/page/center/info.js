import React from 'react'
import {NavBar, Icon,Flex ,List ,ActionSheet} from 'antd-mobile'
import {connect} from 'react-redux'
import {data} from 'config/data'
import 'scss/center.scss'

const Item = List.Item
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}
@connect(
    state=>state,
)
class personInfo extends React.Component{
    constructor(props) {
        super(props)
      }
    showActionSheet = () => {
        const BUTTONS = ['从相册中选取', '取消'];
        ActionSheet.showActionSheetWithOptions({
          options: BUTTONS,
          cancelButtonIndex: BUTTONS.length - 1,
          maskClosable: false,
          'data-seed': 'logId',
          wrapProps,
        },
        (buttonIndex) => {
         if(buttonIndex===0){
            $('.headPart input').click()
         }
        });
        $('.am-action-sheet-mask').addClass('bigpic')
      }
    render(){
        const {user} = this.props
        return (
            <div>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => {this.props.history.goBack()}}
                >个人资料</NavBar>

                <Flex justify="between" className="headPart">
                    <Flex>
                        <div className="icon-head"></div>
                        <p style={{fontSize:'16px',marginLeft:'2rem',color:'#8a8a8a'}} onClick={()=>this.showActionSheet()}>修改头像</p>
                        <input type="file" style={{width:'0'}} accept="image/gif, image/jpeg"/>
                    </Flex>
                </Flex>
                
                <List>
                    {data.map((v)=>(
                        <Item
                        thumb={<div className={v.icon}></div>}
                        arrow="horizontal"
                        onClick={() => {}}
                        key={v.text}
                        >
                        <Flex>
                            <p style={{width:'5rem'}}>{v.text}</p>
                            {user[v.info]?<p className="userinfo set">{user[v.info]}</p>:<p className="userinfo">暂未设置</p>}
                        </Flex>

                        </Item>
                    ))}
                </List>
            </div>
        )
    }
}
export default personInfo