import React from 'react'
import { NavBar, Icon,List,Carousel,Flex,Toast} from 'antd-mobile';
import {getNoteInfo, noteEvent,getNoteToDo} from 'api/note'
import {Follow} from 'api/user'
import cookies from 'browser-cookies'
import {withRouter} from 'react-router-dom'
const Item = List.Item


@withRouter
class NoteInfo extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            status:{}
        }
    }

    componentDidMount(){
        getNoteInfo(this.props.match.params).then(result=>{
            getNoteToDo(result.data.data).then(result1=>{
                this.setState({status:result1.data.data})
            })
            this.setState({noteinfo:result.data.data})
        })
        
    }

    toDoEvent(noteinfo,event){
        noteEvent(noteinfo,event).then(res=>{
            if(res.status ===200){
                Toast.info(res.data.msg, 1.9, null, false)
                if(res.data.code == 0){
                    let data,num
                    switch(event){
                        case 'fabulous':
                            data = {fabulous:true}
                            num = {fabulous:res.data.data}
                            break
                        case 'collect':
                            data = {collect:true}
                            num = {collect:res.data.data}
                            break
                        default:
                            data = {}
                            num = {}
                    }
                    this.setState({
                        status:{...this.state.status,...data},
                        noteinfo:{...noteinfo,...num}})
                }
            }
        })
    }

    toComment = (state) =>this.props.history.push(`/home/noteinfo/comment/${state._id}`)

    tofollow = () =>{ 
        Follow(this.state.noteinfo).then(res=>{
            if(res.status == 200){
                Toast.info(res.data.msg, 1.9, null, false)
            }
        })
    }

    render(){
        const {noteinfo} = this.state
        const {status} = this.state
        return (
            <div className="noteInfo">
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.props.history.goBack()}
                >发现</NavBar>
                {noteinfo?(<div><List  className="my-list">
                                    <Item extra={<span onClick={()=>this.tofollow()}>{noteinfo.follow?'已关注':'关注'}</span>}><img src = {noteinfo.portrait} style={{width:'25px',height:'25px',borderRadius:'50%', marginRight:'5px'}}/>{noteinfo.name}</Item>
                                </List>
                                <Carousel className="space-carousel"
                                    frameOverflow="visible"
                                    afterChange={index => this.setState({ slideIndex: index })}
                                    >
                                    {noteinfo.mapgroup.map((val, index) => (
                                        <a
                                            key={val}
                                            style={{ display: 'inline-block', width: '100%', height: '25rem' }}
                                        >
                                            <img
                                            src={val}
                                            alt=""
                                            style={{ width: '100%', verticalAlign: 'top',height:'25rem' }}
                                            />
                                        </a>
                                    ))}
                                </Carousel>
                                <p className="noteContent">{noteinfo.content.split('\n').map(v=><span key={Math.random()}>{v}<br/></span>)}</p>
                                <Flex justify="end" className="noteNumber">
                                    <div className = {status.fabulous?"briefimg icon-fabulous_select":"briefimg icon-fabulous"}/>  
                                    <p onClick={()=>this.toDoEvent(noteinfo,'fabulous')}>{noteinfo.fabulous||0}</p>
                                    <div className = {status.collect?"briefimg icon-collect_select":"briefimg icon-collect"}/>
                                    <p onClick={()=>this.toDoEvent(noteinfo,'collect')}>{noteinfo.collect||0}</p>
                                    <div className = "briefimg icon-comment"/>
                                    <p onClick={()=>this.toComment(noteinfo)}>{noteinfo.comment||0}</p>
                                </Flex>
                                </div>):null}
            </div>
        )
    }
}
export default NoteInfo