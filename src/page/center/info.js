import React from 'react'
import {NavBar, Icon,Flex ,List ,ActionSheet} from 'antd-mobile'
import {connect} from 'react-redux'
import {data} from 'config/data'
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
)
class personInfo extends React.Component{
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        $(document).on('change', '#headUpload', function () { //PictureUrl为input file 的id
            function getObjectURL(file) {
                var url = null;
                if (window.createObjcectURL != undefined) {
                    url = window.createOjcectURL(file);
                } else if (window.URL != undefined) {
                    url = window.URL.createObjectURL(file);
                } else if (window.webkitURL != undefined) {
                    url = window.webkitURL.createObjectURL(file);
                }
                return url;
            }
            var objURL = getObjectURL(this.files[0]);//这里的objURL就是input file的真实路径
            headUpload({name:this.files[0].name,path:objURL}).then(res=>{
                        debugger
                        if(res.data.code===0){
                            $('.icon-head').css('background-image',`url(${res.data.data})`)
                        }
                    })  
        })


        //  $("input[type='file']").change(function(){   
        //      var file = this.files[0];
        //        if (window.FileReader) {    
        //     //             var reader = new FileReader();    
        //     //             reader.readAsDataURL(file);  
        //     debugger
        //     headUpload({name:file.name,path:$("input[type='file']").val()}).then(res=>{
        //         debugger
        //         if(res.data.code===0){
        //             $('.icon-head').css('background-image',`url(${res.data.data})`)
        //         }
        //     })  
        //                 //监听文件读取结束后事件    
        //     //           reader.onloadend = (e)=> {
        //     //             debugger
        //     //             headUpload({name:file.name,path:$("input[type='file']").val()}).then(res=>{
        //     //                 debugger
        //     //                 if(res.data.code===0){
        //     //                     $('.icon-head').css('background-image',`url(${res.data.data})`)
        //     //                 }
        //     //             })

        //     // //              console.log(e.target.result)
        //     // //              console.log(file.name)
        //     // //             $(".img").attr("src",e.target.result);     
        //     //            };    
        //            } 
        //     })

   
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
                        <img className="icon-head"></img>
                        <p style={{fontSize:'16px',marginLeft:'2rem',color:'#8a8a8a'}} onClick={()=>this.showActionSheet()}>修改头像</p>
                        <input type="file" id ="headUpload" style={{width:'0',opacity:'0'}} accept="image/gif, image/jpeg,image/png" />
                        <img src="" className="img" />
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