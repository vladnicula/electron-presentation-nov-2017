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
  }

  componentDidMount () {
    ipcRenderer.on('file-open', (sender, path) => {
      console.log('file open request received', path);
      this.setState({
        image:path
      })
    });
  }

  render () {
    const { image } = this.state
    return (
      image ? <CanvasEditor image={image}/> : <RepoViewer/>
    )
  }
}