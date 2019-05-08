import React from 'react'
import { NavBar, Icon,List,Carousel,Flex,Toast} from 'antd-mobile';
import {getNoteInfo, noteEvent,getNoteToDo,noteCommentmini} from 'api/note'
import {Follow} from 'api/user'
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
        noteCommentmini(this.props.match.params).then(result=>{
            this.setState({comment:result.data.data})
        })
    }

    toDoEvent(noteinfo,event){
        if(event =='fabulous'){
            var x = 100;       
            var y = 900;  
            var num = Math.floor(Math.random() * 3 + 1);
            var index=$('.demo').children('div').length;
            var rand = parseInt(Math.random() * (x - y + 1) + y);          
            $(".demo").append(`<div class="aixin"></div>`);
            $('.aixin').addClass('imgscss')
            $(".aixin").animate({
                bottom:"800px",
                opacity:"0",
                left: rand,
            },3000)
            if(this.state.status.fabulous){
                return false;
            }
        }
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
        const {noteinfo,status,comment} = this.state
        return (
            <div className="noteInfo">
                {noteinfo?(<div>
                    <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.props.history.goBack()}
                    leftContent={[<img src = {noteinfo.portrait} style={{width:'25px',height:'25px',borderRadius:'50%', marginRight:'5px'}}/>,
                    <span>{noteinfo.name}</span>
                ]}
                rightContent={<div onClick={()=>this.tofollow()} className='guanzhu'>{noteinfo.follow?'已关注':'关注'}</div>}
                ></NavBar>
                                <Carousel className="space-carousel"
                                    frameOverflow="visible"
                                    afterChange={index => this.setState({ slideIndex: index })}
                                    >
                                    {noteinfo.mapgroup.map((val, index) => (
                                        <a
                                            key={val}
                                            style={{ display: 'inline-block', width: '100%', height: 'auto' }}
                                        >
                                            <img
                                            src={val}
                                            alt=""
                                            style={{ width: '100%', verticalAlign: 'top',height:'auto' }}
                                            />
                                        </a>
                                    ))}
                                </Carousel>
                                <div className="noteContent"><p className="noteContentTitle">{noteinfo.title}</p>{noteinfo.content.split('\n').map(v=><span key={Math.random()}>{v}<br/></span>)}</div>
                                <Flex justify="start" style={{fontSize:'1rem',color:'#a8a8a8',padding:'1rem'}}>                         
                                    {noteinfo.address?<div className="addressinfo"> <img src ={require(`assets/svg/address.svg`)} /><p>{<span>{noteinfo.address.split('\n')[0]}</span>}</p></div>:null}
                                </Flex>
                                <div className='notecommentinfo'>
                                    {comment&&comment.num?<p>评论</p>:<p>暂无评论</p>}
                                    {comment?comment.list.map(v=>
                                     <Flex className="detail" justify='start' align='start'>
                                       <img src={v.portrait} />
                                       <div>
                                            <p className="detailp1">{v.name}</p>
                                            <p  className="detailp2">{v.comment||''}</p>
                                        </div>
                                        <span>{new Date(v.creat_time).toLocaleString().replace(/:\d{1,2}$/,' ')}</span>
                                    </Flex>):null}
                                    {comment?(comment.num>2?<p className="detailp3"onClick={()=>this.toComment(noteinfo)}>查看全部{noteinfo.comment}评论</p>:null):null}
                                   
                                </div>
                                <Flex justify="end" className="noteNumber">
                                    <div className="demo"></div>
                                    <img src ={require(`assets/svg/${status.fabulous?"icon-fabulous_select":"icon-fabulous"}.svg`)} />
                                    <p onClick={()=>this.toDoEvent(noteinfo,'fabulous')}>{noteinfo.fabulous||0}</p>
                                    <img src ={require(`assets/svg/${status.collect?"icon-collect_select":"icon-collect"}.svg`)} />
                                    <p onClick={()=>this.toDoEvent(noteinfo,'collect')}>{noteinfo.collect||0}</p>
                                    <img src={require(`assets/svg/icon-comment.svg`)}/>
                                    <p onClick={()=>this.toComment(noteinfo)}>{noteinfo.comment||0}</p>
                                </Flex>
                                </div>):null}
            </div>
        )
    }
}
export default NoteInfo