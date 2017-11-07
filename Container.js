import React from 'react'
import {ipcRenderer} from 'electron'
import fs from 'fs'

import RepoViewer from './RepoViewer'
import CanvasEditor from './CanvasEditor'


export default class Container extends React.Component {
  constructor ( props ) {
    super(props)
    this.state = {
      image: false
    }
    this.setCanvasRef = this.setCanvasRef.bind(this)
  }

  setCanvasRef (el) {
    if ( el ) {
      this.canvasEl = el
    }
  }

  componentDidMount () {
    ipcRenderer.on('file-open', (sender, path) => {
      console.log('file open request received', path);
      this.setState({
        image:path
      })
    });

    ipcRenderer.on('file-save', (sender, path) => {
      const fileData = this.canvasEl.getFileData()
      fs.writeFile(path, fileData, (err) => {
        if ( err ) {
          console.log(err)
        }
        console.log('done')
      })
    });
  }

  render () {
    const { image } = this.state
    return (
      image ? <CanvasEditor ref={this.setCanvasRef} image={image}/> : <RepoViewer/>
    )
  }
}