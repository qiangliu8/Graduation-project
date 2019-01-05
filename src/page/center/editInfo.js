import React from 'react'
import { NavBar, Icon, WhiteSpace,List ,TextareaItem } from 'antd-mobile'
import { createForm } from 'rc-form'
import {updateInfo} from 'redux/user.redux.js'
import {connect} from 'react-redux'
import {data} from 'config/data'
import 'scss/center.scss'


@connect(
 state=>state,
 {updateInfo}
)

class EditInfos extends React.Component{
    constructor(props) {
        super(props)
    }
    
    componentDidMount(){
    }
    changEvent(e,info){
        this.setState({[info]:e},()=>{
            console.log(this.state)
        })
    }
    saveData(name){
        if(this.state){
            this.props.updateInfo(this.state,name)
        }
        this.props.history.goBack()
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
                    rightContent={<p onClick={()=>this.saveData(v.text)}>完成</p>}>
                    修改{v.text}
                </NavBar>
                <WhiteSpace/>
                <WhiteSpace/>
                <List>
                    <TextareaItem
                        rows={v.rows}
                        placeholder={`请修改${v.text}`}
                        onChange={(e)=>this.changEvent(e,v.info)}
                        count={v.count}
                        defaultValue ={this.props.user[v.info]?this.props.user[v.info]:''}
                    />
                </List>
            </div>
        )
    }
}
let EditInfo =createForm()(EditInfos)
export default EditInfo 