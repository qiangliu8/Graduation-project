import React from 'react'
import { ImagePicker ,SegmentedControl } from 'antd-mobile';
import {noteImgUpload} from 'api/note'
class NoteImgUpload extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            files: []
        }
    }

    onChange = (files, type, index) => {
        var data = new FormData();
        files.map(v=>{
            var file = v.file
            data.append('image', file);
        })
        noteImgUpload(data).then(result=>{
            if(result.data.code===0){
                debugger
                // this.setState({portrait:result.data.data.url},()=>{                 
                //     this.props.updateInfo(this.state)
                // })    
            }
        })
        this.setState({
          files,
        },()=>{
            // console.log(this.state.files[0].file)
        })
    }
    render(){
        const { files } = this.state
        return (
           <div>
                <ImagePicker
                files={files}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={files.length < 7}
                multiple={true}
                />
                
            </div>
        )
    }
}

export default  NoteImgUpload