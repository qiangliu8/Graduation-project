import React from 'react'
import { TextareaItem,InputItem, WhiteSpace, WingBlank ,Toast,List,NavBar,Icon ,Card} from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import {noteComment,sendComment} from 'api/note'
import { createForm } from 'rc-form'

@withRouter
class NoteComment extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            comment:''
        }
    }

    componentDidMount(){
       this.getCommentList()
    }
    getCommentList(){
        noteComment(this.props.match.params).then(res=>{
            this.setState(res.data.data)
        })
    }
    handleChange(key,val){
        this.setState({[key]:val})
    }
    toComment(){
        if(!this.props.form.getFieldValue('comment')){
            Toast.info('请重新输入内容再发送！', 2, null, false);
            return false
        }
        sendComment(this.props.match.params,{comment:this.props.form.getFieldValue('comment')}).then(res=>{
            if(res.data.code==0){
                this.props.form.setFields({"comment":""})
                this.getCommentList().then(res=>{
                    $('.am-input-control input').val('')
                })
            }
        })
    }
    render(){
        const {num, list } = this.state||{}
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {this.props.history.goBack()}}>    
                    共{num||0}条评论
                </NavBar>
                {list?list.map(v=>(
                    <div key={v._id}>
                    <Card >
                        <Card.Header
                            title={v.name}
                            thumb={v.portrait}
                            extra={<span>{new Date(v.creat_time).toLocaleString().replace(/:\d{1,2}$/,' ')}</span>}
                        />
                        <Card.Body>
                            <div>{v.comment||'该用户没有发表表评论，默认文字'}</div>
                        </Card.Body>
                        {/* <Card.Footer content="footer content" extra={<div>extra footer content</div>} /> */}
                    </Card>
                    <WhiteSpace/>
                    </div>
                )):null}
                <List id="commentFooter">
                <InputItem
                    placeholder="默默收藏不如评论一下"
                    onChange={e=>{this.handleChange('comment',e)}}
                    {...getFieldProps('comment')}
                    extra={<span onClick={()=>this.toComment()}>发送</span>}
                ></InputItem>
                </List>
            </div>
        )
    }
}

const NoteComments = createForm({})(NoteComment);
export default NoteComments