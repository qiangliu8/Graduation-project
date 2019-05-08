import React from 'react'
import { Button, NavBar ,List, TextareaItem,InputItem, Toast ,Icon,Switch  } from 'antd-mobile'
import NoteImgUpload from 'component/noteimgupload'
import {tarbarList} from 'config/data'
import {noteImgUpload} from 'api/note'
import {connect} from 'react-redux'
import {writeNote,pubNote} from 'redux/note.redux'
import { withRouter } from 'react-router-dom'
import Footer from 'component/footer'
import Quill from 'quill'
import 'scss/publish.scss'
import 'quill/dist/quill.snow.css'
const Item = List.Item
@connect(
 state=>state,
 {writeNote,pubNote}
)
@withRouter
class Publish extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            'value':'<p></p>',
            checked:true
        };
    }

    componentDidMount(){
        //工具栏
        var toolbarOptions = [
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            ['bold', 'italic', 'underline'],        // toggled buttons
            ['blockquote'],  
            [{ 'align': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            ['image'],
            ['clean']  
        ];
        var options = {
            // debug: 'info',
            modules: {
              toolbar: toolbarOptions
            },
            placeholder:'分享新鲜事...',
            readOnly: false,
            theme: 'snow'
          };
        var editor = new Quill('#editor', options);
        // editor.addHandler('image', showImageUI);
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
    handleChanges(key,val){
        this.setState({[key]:val},()=>{
            this.props.writeNote({...this.props.note,[key]:val})
    })
    }
  handleChange = () => {
    // change 事件将HTML字符串更新到state里面，
    this.setState({
      value: this.editor.root.innerHTML,
      mediaVisbile: false
    });
  };
    render(){
        return (
            <div className="publishPage">
                    <NavBar
                    mode="light"
                    rightContent={<button  className='publishbutton' onClick={()=>this.uploads()}>发表</button>}
                    >              
                    </NavBar>
                    <List >
                        <Item>
                        <TextareaItem
                            placeholder="标题" 
                            onChange={e=>{this.handleChanges('title',e)}}
                            className='publishTitle'
                            defaultValue={this.props.note.title}
                        />
                            {/* <InputItem placeholder="标题"  className='publishTitle' onChange={e=>{this.handleChanges('title',e)}}  defaultValue={this.props.note.title}/> */}
                        </Item>
                    {/* <List renderHeader={}> */}
                    <Item>
                        <TextareaItem
                            placeholder="正文"
                            autoHeight
                            rows={5}
                            labelNumber={5}
                            defaultValue={this.props.note.content}
                            onChange={e=>{this.handleChanges('content',e)}}
                        />
                            {/* <div id="editor"> */}
                               
                            <NoteImgUpload uploads ={(e)=>this.imgUpload(e)}  files={this.props.note.files}/>
                        </Item>
                        </List>
                    <List>
                        <Item
                        thumb={<img src={require('assets/svg/address.svg')}/>}
                        arrow="horizontal"
                        onClick={() => this.props.history.push('/publish/address')} extra={this.props.note.address||''}
                        >所在位置</Item>
                        <Item
                        thumb={<img src={require('assets/svg/public.svg')}/>}
                        onClick={() => {}}
                        extra={ <Switch
                            checked={this.state.checked}
                            onChange={() => {
                            this.setState({
                                checked: !this.state.checked,
                            });
                            }}
                              />}
                        >
                        是否公开
                        </Item>
                    </List>
                    <Footer tarbarList={tarbarList}></Footer>
            </div>
        )
    }
}
export default Publish