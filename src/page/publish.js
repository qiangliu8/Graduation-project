import React from 'react'
import { Button, NavBar ,List, TextareaItem,InputItem, WingBlank  } from 'antd-mobile'
import NoteImgUpload from 'component/noteimgupload'
import {noteImgUpload} from 'api/note'
import { Toast } from 'antd-mobile'
import 'scss/publish.scss'
import { withRouter } from 'react-router-dom'


@withRouter
class Publish extends React.Component{
    constructor(props) {
        super(props)
    }
    imgUpload(e){
    this.setState({files:e})
    }
    uploads(){
        var data = new FormData();
        this.state.files.map(v=>{
            var file = v.file
            data.append('image', file);
        })
        data.append('content', this.state.content);
        data.append('title', this.state.title)
        noteImgUpload(data).then(result=>{
            if(result.data.code===0){
                Toast.info(`发表成功！`, 0.9, ()=>{this.props.history.push('/home')}, false)
            }
        })
    }
    handleChange(key,val){
        this.setState({[key]:val})
    }
    render(){
        return (
            <div className="publishPage">
                    <NavBar
                    mode="light"
                    rightContent={<Button type="primary" inline size="small" style={{ marginRight: '4px' }} onClick={()=>this.uploads()}>发表</Button>}
                    >              
                    </NavBar>
                    <List >
                        <InputItem placeholder="请输入攻略标题..."  onChange={e=>{this.handleChange('title',e)}}/>
                    </List>
                    <List renderHeader={<NoteImgUpload uploads ={(e)=>this.imgUpload(e)}/>}>
                        <TextareaItem
                            placeholder="分享新鲜事..."
                            autoHeight
                            rows={5}
                            labelNumber={5}
                            onChange={e=>{this.handleChange('content',e)}}
                        />
                    </List>
            </div>
        )
    }
}
export default Publish