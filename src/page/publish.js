import React from 'react'
import { Button, NavBar ,List, TextareaItem,WhiteSpace, WingBlank  } from 'antd-mobile'
import NoteImgUpload from 'component/noteimgupload'
import 'scss/publish.scss'
class Publish extends React.Component{
    constructor(props) {
        super(props)
      }

    render(){
        return (
            <div className="publishPage">
                    <NavBar
                    mode="light"
                    rightContent={<Button type="primary" inline size="small" style={{ marginRight: '4px' }}>发表</Button>}
                    >              
                    </NavBar>
                    <List renderHeader={<NoteImgUpload/>}>
                        <TextareaItem
                            placeholder="分享新鲜事..."
                            autoHeight
                            rows={5}
                            labelNumber={5}
                        />
                    </List>
            </div>
        )
    }
}
export default Publish