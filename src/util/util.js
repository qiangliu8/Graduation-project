import React from 'react'

export function HocFrom(Comp){
    return class WrapperComp extends React.Component{
        constructor(props){
            super(props)
            this.state={}
        }
        handleChange(key,val){
            this.setState({[key]:val})
        }
        render(){
            return <Comp handleChange={(key,val)=>this.handleChange(key,val)} state={this.state} {...this.props}></Comp>
        }
    }
}