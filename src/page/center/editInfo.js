import React from 'react'
import { NavBar, Icon, Flex,WhiteSpace,List ,TextareaItem } from 'antd-mobile'
import { createForm } from 'rc-form'
import { NavLink,} from 'react-router-dom'
import {connect} from 'react-redux'
import {data} from 'config/data'
import cookies from 'browser-cookies'
import 'scss/center.scss'


@connect(
 state=>state
)

class EditInfos extends React.Component{
    constructor(props) {
        super(props)
    }
    
    componentDidMount(){
        console.log(this.props.match.params.text)
        console.log(this.props.user)
    }
    changEvent(e,info){
        this.setState({[info]:e},()=>{
            console.log(this.state)
        })
    }
    render(){
        const info = this.props.match.params.text
        const v = data.find(v=>v.info === info)
        const { getFieldProps } = this.props.form;
        return (
            <div >
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {this.props.history.goBack()}}
                    rightContent={<p>完成</p>}>
                    修改{v.text}
                </NavBar>
                <WhiteSpace/>
                <WhiteSpace/>
                <List>
                    <TextareaItem
                        rows={5}
                        placeholder={`请修改${v.text}`}
                        onChange={(e)=>this.changEvent(e,v.info)}
                        count={100}
                        {...getFieldProps('count', {
                            initialValue: `${this.props.user[v.info]?this.props.user[v.info]:''}`,
                          })}
                    />
                </List>
            </div>
        )
    }
}
let EditInfo =createForm()(EditInfos)
export default EditInfo 