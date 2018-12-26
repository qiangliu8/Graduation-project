//示例2、Route在componnt中的直接嵌套
//root.js
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={hashHistory}>
            <div>
                <Route path="/" component={App} />
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)
//App.js
render() {
return (
  <div className="App">
    <Switch>
        <Route path="/login" exact render={(({location}) => (<h1>来玩啊，小帅哥</h1>)) } />
        <Route path="/" component={Portal} />
    </Switch>
  </div>
);
}

//Portal.js
render() {
return (
<Content style={{background : '#FFF', padding : 24, margin : 0, minHeight : 200}}>
<Route path="/" exact render={() => (<h1>弗雷尔卓德必将再次统一！</h1>)} />
<Route path="/products" exact component={Products} />
<Route path="/search" exact component={ProductSearch} />
</Content>
);
}
