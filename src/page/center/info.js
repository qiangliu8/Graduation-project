import React from 'react'
import {NavBar, Icon,Flex ,List ,DatePicker,ActionSheet ,Modal,Radio, Picker} from 'antd-mobile'
import { district} from 'antd-mobile-demo-data'
import arrayTreeFilter from 'array-tree-filter'
import {connect} from 'react-redux'
import {data} from 'config/data'
import {updateInfo} from 'redux/user.redux.js'
import {headUpload} from 'api/user'
import {formatDate} from 'util/util'
import 'scss/center.scss'


const Item = List.Item
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}


function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
      if (matchesSelector.call(el, selector)) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
}

@connect(
    state=>state,
    {updateInfo}
)
class personInfo extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            portrait:'',
            modal1: false,
            birth: now,
            visible: false,
            viewvisible:false,
            pickerValue: ["340000", "341500"],
        }
    }

    componentDidMount(){
        this.uplpoadFile()       
    }

    componentWillReceiveProps(nextProps){
        this.setState({sex:nextProps.user.sex},()=>{
            console.log(this.state)
        })
    }

    uplpoadFile(){
         $("input[type='file']").change(()=>{   
            var file = $("input[type='file']").get(0).files[0]
            var data = new FormData();
            data.append('image', file);
            headUpload(data).then(result=>{
                if(result.data.code===0){
                    this.setState({portrait:result.data.data.url},()=>{                 
                        this.props.updateInfo(this.state)
                    })    
                }
            })
        })
    }

    toedit = e => this.props.history.push(`/center/editinfo/${e.info}`)
    
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

    changeSex = e => this.setState({sex:e})

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }

    onClose = key => () => {
        this.setState({
          [key]: false,
        });
    }

    saveData(state,name){
        if(state){
            this.props.updateInfo(state,name)
        }
    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
          return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
          e.preventDefault();
        }
    }

    switchClick (v) {
        switch(v.info){
            case 'sex':
                this.setState({'modal1': true})
                break
            case 'birth':
                this.setState({ visible: true })
                break
            case 'view':
                this.setState({ viewvisible: true })
                break
            default:
                this.props.history.push(`/center/editinfo/${v.info}`)
                break
        }
    }

    getSel() {
        const value = this.state.pickerValue;
        if (!value) {
          return '';
        }
        const treeChildren = arrayTreeFilter(district, (c, level) => c.value === value[level]);
        return treeChildren.map(v => v.label).join(',');
    }
    
    onChangeColor = (color) => {
        this.setState({
          colorValue: color,
        });
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
                        //onClick={() => this.toedit(v)}
                        onClick={()=>this.switchClick(v)}
                        key={v.text}
                        >
                            <Flex>
                                <p style={{width:'5rem'}}>{v.text}</p>
                                {user[v.info]?<p className="userinfo set" title={user[v.info]}>{user[v.info]}</p>:<p className="userinfo">暂未设置</p>}
                            </Flex>
                        </Item>
                    ))}
                </List>  
                <DatePicker
                    mode="date"
                    title="选择生日"
                    minDate = {new Date(1990, 1, 1, 0, 0, 0)}
                    visible={this.state.visible}
                    value={this.state.birth}
                    onOk={birth => { this.saveData({birth:formatDate(birth)},'生日'), this.setState({ visible: false })}}
                    onDismiss={() => this.setState({ visible: false })}
                />
                <Picker
                    visible={this.state.viewvisible}
                    data={district}
                    cols={2}
                    value={this.state.pickerValue}
                    onPickerChange={v => {this.setState({ pickerValue: v })}}
                    onOk={() => {this.saveData({view:this.getSel()},'景点'), this.setState({ viewvisible: false })}}
                    onDismiss={() => this.setState({ viewvisible: false })}
                    >
                </Picker>
                <Modal
                    visible={this.state.modal1}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('modal1')}
                    title="请选择您的性别"
                    footer={[
                        { text: '取消', onPress: () => {  this.onClose('modal1')() } },
                        { text: '确认', onPress: () => { this.saveData({sex:this.state.sex},'性别'); this.onClose('modal1')() } }]}
                        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    >
                    <div>
                        <Radio className="my-radio" checked = {this.state.sex ==='男'} onChange={e => this.changeSex('男')}>男</Radio>
                        <Radio className="my-radio" checked = {this.state.sex ==='女'} style={{marginLeft:'25px'}} onChange={e => this.changeSex('女')}>女</Radio>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default personInfo