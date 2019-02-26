import React from 'react'
import { Button, NavBar ,List, TextareaItem,InputItem, Toast ,Icon } from 'antd-mobile'
import NoteImgUpload from 'component/noteimgupload'
import {tarbarList} from 'config/data'
import {noteImgUpload} from 'api/note'
import {connect} from 'react-redux'
import {writeNote,pubNote} from 'redux/note.redux'
import { withRouter } from 'react-router-dom'
import Footer from 'component/footer'
import 'scss/publish.scss'

const Item = List.Item
@connect(
 state=>state,
 {writeNote,pubNote}
)
@withRouter
class Publish extends React.Component{
    constructor(props) {
        super(props)
    }

    imgUpload(e){
        this.props.writeNote({...this.props.note,files:e})
    }
    
    uploads(){
        var data = new FormData();
        this.props.note.files.map(v=>{
            var file = v.file
            data.append('image', file);
        })
        data.append('content', this.props.note.content);
        data.append('title', this.props.note.title)
        data.append('address', this.props.note.address)
        noteImgUpload(data).then(result=>{
            this.props.pubNote()
            if(result.data.code===0){
                Toast.info(`发表成功！`, 0.9, ()=>{this.props.history.push('/home')}, false)
            }
        })
    }
    handleChange(key,val){
        this.setState({[key]:val},()=>{
            this.props.writeNote({...this.props.note,[key]:val})
    })
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
                        <InputItem placeholder="请输入攻略标题..."  onChange={e=>{this.handleChange('title',e)}}  defaultValue={this.props.note.title}/>
                    </List>
                    <List renderHeader={<NoteImgUpload uploads ={(e)=>this.imgUpload(e)}  files={this.props.note.files}/>}>
                        <TextareaItem
                            placeholder="分享新鲜事..."
                            autoHeight
                            rows={5}
                            labelNumber={5}
                            defaultValue={this.props.note.content}
                            onChange={e=>{this.handleChange('content',e)}}
                        />
                    </List>
                    <List >
                        <Item arrow="horizontal"  multipleLine thumb={<div className="icon-address"></div>} onClick={() => this.props.history.push('/publish/address')} extra={this.props.note.address||''}>
                             所在位置
                        </Item>  
                    </List>
                    <Footer tarbarList={tarbarList}></Footer>
            </div>
        )
    }
}
export default Publish