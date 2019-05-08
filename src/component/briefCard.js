import React from 'react'
import { Flex } from 'antd-mobile';
import { withRouter } from 'react-router-dom'


@withRouter
class BriefCrad extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const {state} = this.props
        return (
            <div className="briefCard" onClick={()=>this.props.history.push(`/home/noteinfo/${state._id}`)}>
                <img className="briefGraph" src={state.mapgroup[0]}/> 
                <div className="briefDetil"> 
                    <p className="briefTitle">{state.title}</p>    
                    <div className="briefInfos">
                        <div className="briefInfo left" >
                            <img src ={state.portrait} className = "briefimg head"/>
                            <p>{state.name}</p>
                        </div>
                        <div className="briefInfo right">
                            {/* <div className = "briefimg icon-fabulous"/> */}
                            <img src={require('../assets/icon/fabulous.svg')}/>
                            <p>{state.fabulous}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default  BriefCrad