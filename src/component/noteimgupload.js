import React from 'react'
import { ImagePicker } from 'antd-mobile'

class NoteImgUpload extends React.Component{
    constructor(props){
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
    render(){
        const { files } = this.state
        return (
           <div>
                <ImagePicker
                files={files}
                onChange={(files, type, index) =>{this.onChange(files, type, index),this.props.uploads(files)}}
                onImageClick={(index, fs) => console.log(index, fs)}
                 selectable={files.length < 7}
                multiple={true}
                />         
            </div>
        )
    }
}

export default  NoteImgUpload