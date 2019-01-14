import React from 'react'
import { Button, WhiteSpace, WingBlank  } from 'antd-mobile'
import {tarbarList} from 'config/data'
import Footer from 'component/footer'
class Talk extends React.Component{
    constructor(props) {
        super(props)
      }

    render(){
        return (
            <div>
                Talk
                <Footer tarbarList={tarbarList}></Footer>
            </div>
        )
    }
}
export default Talk