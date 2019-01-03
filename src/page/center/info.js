import React from 'react'
import {NavBar, Icon,Flex ,List ,ActionSheet} from 'antd-mobile'
import {connect} from 'react-redux'
import {data} from 'config/data'
import {updateInfo} from 'redux/user.redux.js'
import {headUpload} from 'api/user'
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
    {updateInfo}
)
class personInfo extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            portrait:''
        }
    }

    componentDidMount(){
        this.uplpoadFile()
    }
    uplpoadFile(){
         $("input[type='file']").change(()=>{   
            var file = $("input[type='file']").get(0).files[0]
            var data = new FormData();
            data.append('file', file);
            headUpload(data).then(result=>{
                if(result.data.code===0){
                    this.setState({portrait:result.data.data.url},()=>{                 
                        this.props.updateInfo(this.state)
                    })    
                }
            })
     
        })
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
    toedit(e){
        this.props.history.push(`/center/editinfo/${e.info}`)
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
                        {user.portrait?<img src={user.portrait} className="portrait"/>:<img className="icon-head portrait"/>}
                        <p style={{fontSize:'16px',marginLeft:'2rem',color:'#8a8a8a'}}  onClick={()=>this.showActionSheet()}>修改头像</p>
                        <input type="file" id ="headUpload" style={{width:'0',opacity:'0'}} accept="image/gif, image/jpeg,image/png" />
                    </Flex>
                </Flex>           
                <List>
                    {data.map((v)=>(
                        <Item
                        thumb={<div className={v.icon}></div>}
                        arrow="horizontal"
                        onClick={() => this.toedit(v)}
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