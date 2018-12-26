import React from 'react'
import { Button, WhiteSpace, WingBlank  } from 'antd-mobile'
import { Switch,Route} from 'react-router-dom'
import Home from 'page/home'
import Talk from 'page/talk'
import Center from 'page/center'
import Footer from 'component/footer'
import 'scss/homepage.scss'
class HomePage extends React.Component{
    constructor(props) {
        super(props)
      }


    render(){
        const tarbarList= [
            { 
                title:'',
                key:'home',
                path:'/',
                icon:'home',
                badge:0,
                className:'icon-home',
                seclassName:'icon-home_select',
                component:Home
            },
            { 
                title:'',
                key:'talk',
                path:'/talk',
                icon:'talk',
                badge:1,
                className:'icon-talk',
                seclassName:'icon-talk_select',
                component:Talk,
            },
            { 
                title:'',
                key:'center',
                icon:'center',
                path:'/center',
                badge:0,
                className:'icon-center',
                seclassName:'icon-center_select',
                component:Center
            },
        ]
        return (
            <div>
                <Switch>
                    {tarbarList.map(v=>(
                        <Route key={v.icon} exact component={v.component} path={v.path}></Route>
                    ))}
                </Switch>
                <Footer tarbarList={tarbarList}></Footer>
            </div>
        )
    }
}
export default HomePage