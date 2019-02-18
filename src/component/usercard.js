import React from 'react'
import { ImagePicker } from 'antd-mobile'

class UserCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            files: []
        }
    }

    onChange(files, type, index) {
        this.setState({
            files,
        });
    }
    render() {
        const { files } = this.state
        return ( 
            <Flex className="followlList" onClick={()=>this.toTalk(v.userId)}>
                <img  src={v.portrait} />
                <Flex className="detail" direction='column' align='start'>
                    <p>{v.name}</p>
                    <p>{v.content||''}</p>
                </Flex>
            </Flex>
        )
    }
}

export default UserCard