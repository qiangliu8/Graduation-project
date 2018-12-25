import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter, HashRouter, Route,Switch} from 'react-router-dom'
import {createStore, applyMiddleware,compose} from 'redux'
import {Provider} from 'react-redux'
import reudcer from 'redux/reducer'
import thunk from 'redux-thunk'
import LoginPage from 'page/login'
import RegisterPage from 'page/register'
import AuthPage from 'page/auth'
import HomePage from 'page/homepage'
import Auth from 'component/auth'
import '../config/axios'
import 'antd-mobile/dist/antd-mobile.css'
import 'scss/main.scss'
require('expose-loader?$!jquery')

const store = createStore(reudcer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension() : f => f
))
ReactDom.render(
    (<Provider store= {store}>
        <HashRouter>
            <div>
                <Auth></Auth>
                <Switch>
                    <Route path='/' exact component={LoginPage}></Route>
                    <Route path='/login' component={LoginPage}></Route>
                    <Route path='/auth' component={AuthPage}></Route>
                    <Route path='/register' component={RegisterPage}></Route>
                    <Route path='/homepage' component={HomePage}></Route>
                    <Route path='/adminpage' component={HomePage}></Route>
                </Switch>
            </div>
        </HashRouter>
    </Provider>),
    document.getElementById('main')
  );