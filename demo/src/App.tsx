import * as React from 'react';
import './App.css';
import Paper from './Paper';

import * as MR_BUBBLES_JSON from './mr-bubbles.json';
import MR_BUBBLES_IMAGE_480 from './mr-bubbles-480.jpg';
import MR_BUBBLES_IMAGE_720 from './mr-bubbles-720.jpg';
import MR_BUBBLES_IMAGE_1080 from './mr-bubbles-1080.jpg';

const IMAGE_WIDTH = 1920
const IMAGE_HEIGHT = 870

const IMAGES = {
  480: MR_BUBBLES_IMAGE_480,
  720: MR_BUBBLES_IMAGE_720,
  1080: MR_BUBBLES_IMAGE_1080,
}

class App extends React.Component<any, any> {
  private request: number | null;
  private box: any;

  constructor(props: any) {
    super(props)
    this.state = {
      imageSize: 720,
      mounted: false,
    }
    this.box = null;
    this.request = null;
  }

  public componentDidMount() {
    this.setState({ mounted: true })
    window.addEventListener('resize', this.resizeWindow)
  }

  public componentWillUnmount() {
    if (this.request) {
      cancelAnimationFrame(this.request)
      this.request = null
    }
    window.removeEventListener('resize', this.resizeWindow)
  }

  public render() {
    const { imageSize, mounted } = this.state
    const box = this.box && this.box.getBoundingClientRect()
    return (
      <div className="App" ref={ref => this.box = ref}>
        {mounted &&
          <Paper
            initialData={MR_BUBBLES_JSON}
            image={IMAGES[imageSize]}
            imageWidth={IMAGE_WIDTH}
            imageHeight={IMAGE_HEIGHT}
            imageSize={imageSize}
            width={box.width}
            height={box.height}
            setImageSize={this.setImageSize}
          />}
      </div>
    )
  }

  
  private resizeWindow = () => {
    if (!this.request) {
      this.request = requestAnimationFrame(this.resizePaper)
    }
  }

  private resizePaper = () => {
    this.forceUpdate()
    this.request = null
  }

  private setImageSize = (size: any) => {
    this.setState({ imageSize: size })
  }
}

export default App;
