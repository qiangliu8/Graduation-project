import React from 'react'
import {  NavBar, Icon,List,Carousel,Flex} from 'antd-mobile';
import {getNoteInfo} from 'api/note'
const Item = List.Item
class NoteInfo extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            
        }
    }

    componentDidMount(){
        getNoteInfo(this.props.match.params).then(result=>{
            this.setState({noteinfo:result.data.data})
        })
    }

    render(){
        const {noteinfo} = this.state
        return (
            <div className="noteInfo">
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.props.history.goBack()}
                >发现</NavBar>
                {noteinfo?(<div><List  className="my-list">
                                    <Item extra={'收藏'}><img src = {noteinfo.portrait} style={{width:'25px',height:'25px',borderRadius:'50%', marginRight:'5px'}}/>{noteinfo.name}</Item>
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
                                    <div className = "briefimg icon-fabulous"/>  
                                    <p>{noteinfo.fabulous}</p>
                                    <div className = "briefimg icon-collect"/>
                                    <p>{noteinfo.collect}</p>
                                    <div className = "briefimg icon-comment"/>
                                    <p>{noteinfo.fabulous}</p>
                                </Flex>
                                </div>):null}
            </div>
        )
    }
}
export default NoteInfo