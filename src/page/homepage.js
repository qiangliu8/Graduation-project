import React from 'react'
import { Button, WhiteSpace, WingBlank  } from 'antd-mobile'
import { Switch,Route,Router} from 'react-router-dom'
import Footer from 'component/footer'
import {renderRoutes} from 'react-router-config'
import {mainRoutes ,routeConfig} from 'router/main_router'
import 'scss/homepage.scss'
class HomePage extends React.Component{
    constructor(props) {
        super(props)
      }


    render(){
        return (
            <div>
                    {renderRoutes(mainRoutes)}
            </div>
        )
    }
}
export default HomePage