import React from 'react'
import ImageFilters from 'canvas-filters'

export default class CanvasEditor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      width: 512, height: 512
    }

    this.handleGrayScale = this.handleGrayScale.bind(this)
    this.handleSepia = this.handleSepia.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  componentDidMount () {
    this.setImage(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.setImage(nextProps)
  }

  setImage (props) {
    const image = new Image()
    image.src = `file://${props.image}`
    
    this.setState({loaded: false})
    
    image.addEventListener('load', () => {
      let { width, height } = image
      let ratio
      if ( width > height ) {
        ratio = height / width
        width = Math.min(width, 1024)
        height = ratio * width
      } else {
        ratio = width / height
        height = Math.min(height, 1024)
        width = ratio * height
      }
      
      this.setState({loaded:true, width:width, height: width * ratio}, () => {
        setTimeout(()=>{
          const canvas = document.getElementById("canvas-editor")
          const ctx = canvas.getContext("2d")
          ctx.drawImage(image, 0, 0, width, height)   
          ctx.imageSmoothingEnabled = false
          this.ctx = ctx
        }, 10)
      })       
    })
  }

  handleGrayScale () {
    const { width, height } = this.state
    const imageData = this.ctx.getImageData(0,0, width, height)
    const filtered = ImageFilters.GrayScale(imageData)
    this.ctx.putImageData(filtered, 0, 0)
  }

  handleSepia () {
    const { width, height } = this.state
    const imageData = this.ctx.getImageData(0,0, width, height)
    const filtered = ImageFilters.Sepia(imageData)
    this.ctx.putImageData(filtered, 0, 0)
  }

  handleBlur () {
    const { width, height } = this.state
    const imageData = this.ctx.getImageData(0,0, width, height)
    const filtered = ImageFilters.GaussianBlur(imageData)
    this.ctx.putImageData(filtered, 0, 0)
  }

  render () {
    const { loaded, width, height } = this.state
    const { image } = this.props;
    if ( !loaded ) {
      return ''
    }
    return (
      <div>
        <canvas width={width} height={height} id='canvas-editor'/>
        <div>
          <button onClick={this.handleGrayScale}>Grayscale</button>
          <button onClick={this.handleSepia}>Sepia</button>
          <button onClick={this.handleBlur}>Blur</button>
        </div>
      </div>
    )
  }
}