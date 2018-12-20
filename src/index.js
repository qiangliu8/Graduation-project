import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter, HashRouter, Route,Switch} from 'react-router-dom'
import LoginPage from 'component/login'
import RegisterPage from 'component/register'
import 'antd-mobile/dist/antd-mobile.css'
import 'scss/main.scss'
require('expose-loader?$!jquery')

ReactDom.render(
    (<HashRouter>
        <div>
            <Switch>
                <Route path='/' exact component={LoginPage}></Route>
                <Route path='/login' component={LoginPage}></Route>
                <Route path='/register' component={RegisterPage}></Route>
            </Switch>
        </div>
    </HashRouter>),
    document.getElementById('main')
  );