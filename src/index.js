import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter, HashRouter, Route,Switch} from 'react-router-dom'
import {createStore, applyMiddleware,compose} from 'redux'
import {Provider} from 'react-redux'
import reudcer from 'redux/reducer'
import thunk from 'redux-thunk'
import LoginPage from 'component/login'
import RegisterPage from 'component/register'
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
                <Switch>
                    <Route path='/' exact component={LoginPage}></Route>
                    <Route path='/login' component={LoginPage}></Route>
                    <Route path='/register' component={RegisterPage}></Route>
                </Switch>
            </div>
        </HashRouter>
    </Provider>),
    document.getElementById('main')
  );