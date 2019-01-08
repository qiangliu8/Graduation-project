import React from 'react'
import { Flex } from 'antd-mobile';

class BriefCrad extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="briefCard">
                <div className="briefGraph"></div>
                <div className="briefDetil"> 
                    <p className="briefTitle">我的介绍</p>    
                    <div className="briefInfos">
                        <div className="briefInfo left" >
                            <img  src ="http://picture-upload.oss-cn-hangzhou.aliyuncs.com/home_select.png" className = "briefimg head"/>
                            <p>就这样</p>
                        </div>
                        <div className="briefInfo right">
                            <div className = "briefimg icon-fabulous"/>
                            <p>0</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default  BriefCrad