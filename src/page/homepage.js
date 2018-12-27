import React from 'react'
import { Button, WhiteSpace, WingBlank  } from 'antd-mobile'
import { Switch,Route} from 'react-router-dom'
import Footer from 'component/footer'
import {renderRoutes} from 'react-router-config'
import {mainRoutes} from 'router/main_router'
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
                path:'/home',
                icon:'home',
                badge:0,
                className:'icon-home',
                seclassName:'icon-home_select',
            },
            { 
                title:'',
                key:'talk',
                path:'/talk',
                icon:'talk',
                badge:1,
                className:'icon-talk',
                seclassName:'icon-talk_select',
            },
            { 
                title:'',
                key:'center',
                icon:'center',
                path:'/center',
                badge:0,
                className:'icon-center',
                seclassName:'icon-center_select',
            },
        ]
        console.log(this.props.route)
        return (
            <div>
                <Switch>
                    {renderRoutes(mainRoutes)}
                </Switch>
                <Footer tarbarList={tarbarList}></Footer>
            </div>
        )
    }
}
export default HomePage