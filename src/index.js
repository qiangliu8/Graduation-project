import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter, HashRouter, Route,Switch} from 'react-router-dom'
import {createStore, applyMiddleware,compose} from 'redux'
import {Provider} from 'react-redux'
import reudcer from 'redux/reducer'
import thunk from 'redux-thunk'
import Auth from 'component/auth'
import {renderRoutes} from 'react-router-config'
import {loginRoutes} from 'router/login_router'
import {monmentCN} from 'util/util.js'
import '../config/axios'
import 'antd-mobile/dist/antd-mobile.css'
import 'scss/main.scss'
require('expose-loader?$!jquery')

// const routes = [
//     ...require('router/login_router'),
//     // ...require('router/main_router')
// ]
const store = createStore(reudcer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension() : f => f
))
monmentCN()
ReactDom.render(
    (<Provider store= {store}>
        <HashRouter>
            <div>
                <Auth></Auth>
                <Switch>
                    {/* <Route path='/login' component={LoginPage}></Route>
                    <Route path='/auth' component={AuthPage}></Route>
                    <Route path='/register' component={RegisterPage}></Route>
                    <Route path='/adminpage' component={HomePage}></Route> */}
                    {/* <Route component={HomePage}></Route> */}
                    {renderRoutes(loginRoutes)}
                </Switch>
            </div>
        </HashRouter>
    </Provider>),
    document.getElementById('main')
  );
