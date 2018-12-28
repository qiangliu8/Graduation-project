import React from 'react'
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import  axios  from 'axios'
import { getUserInfo } from 'redux/user.redux'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getUserinfo} from 'api/user'
import {Redirect} from 'react-router-dom'
@withRouter
@connect(
    state => state.user,
    { getUserInfo }
  )

class Auth extends React.Component{
    componentDidMount(){
        getUserinfo().then(res=>{
            if (res.status === 200) {
                //  if (res.data.code === 0) {
                  this.props.getUserInfo(res.data.data)
                
                //else {
                //     this.props.location.pathname==='/auth'?null: this.props.history.push('/auth')         
                // }
            }
        })
    }
    render(){
        const {location,redirectTo,isAuth} = this.props
        const {pathname} = location
        return (
        <div>
            {isAuth?((pathname ===('/auth'||'/login'||'/register'))&&redirectTo?<Redirect to={redirectTo}/>:null)
            :
            ((pathname.includes('/home'||'/talk'||'/center'))&&redirectTo?<Redirect to={redirectTo}/>:null
            )}
        </div>    
        )
    }
}
export default Auth