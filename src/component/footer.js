import React from 'react'
import { Button, WhiteSpace, WingBlank,TabBar  } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
import 'scss/homepage.scss'

@withRouter
class Footer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          selectedTab: 'redTab',
          hidden: false,
          fullScreen: true,
        };
      }
    renderContent(pageText) {
        console.log(`这是${pageText}`)
    }

    render(){
        const { tarbarList } = this.props
        return (
            <div style={{ position: 'fixed', height: 'auto', width: '100%', bottom: 0 }}>
            <TabBar 
              unselectedTintColor="#949494"
              tintColor="#33A3F4"
              barTintColor="white"
            >
              {tarbarList.map(v=>(
                 <TabBar.Item
                 title={v.title}
                 key={v.key}
                 icon={<div className={v.className}
                 />
                 }
                 selectedIcon={<div  className={v.seclassName}
                 />
                 }
                 selected={this.props.location.pathname.includes(v.path)}
                 badge={v.badge}
                 onPress={() => {
                  //  debugger
                   this.props.history.push(v.path)
                 }}
                 data-seed="logId"
               >
               </TabBar.Item>
            ))}
            </TabBar>
          </div>
        )
    }
}
export default Footer