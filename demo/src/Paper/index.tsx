import * as React from 'react';
import * as R from 'ramda';
// import { compose, withProps } from 'recompose';
import { withProps } from 'recompose';
import {
  Layer,
  Raster,
  // Tool,
  View,
  // Circle,
  // Path,
  // Rectangle,
  // PointText
} from 'paper-react';
import './index.css';

import Toolbar from './Toolbar';
import withTools from './hoc/withTools';

interface IProps {
  image: any;
  imageWidth: number
  imageHeight: number;
  imageSize: number;
  initialData: any;
  width: number;
  height: number;
  setImageSize: (size: number) => void;
  [prop: string]: any;
}

interface IState {
  imageLoaded: boolean;
  loaded: boolean;
  showLayers: boolean;
  size: number[];
  open: boolean;
}

class Paper extends React.Component<IProps, IState> {
  private view: any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      imageLoaded: false,
      loaded: false,
      showLayers: true,
      size: [200, 300],
      open: false,
    };

    this.view = null;
  }

  public componentWillUpdate(nextProps: IProps) {
    const { image } = this.props
    if (image !== nextProps.image) {
      this.setState({ imageLoaded: false })
    }

    console.log(this.view);
  }

  public render() {
    // const {
    //   activeTool, activeLayer, image, data,
    //   selectedItem, setTool, width, height,
    // } = this.props;
    const { activeTool, image } = this.props;

    // const { loaded, imageLoaded, showLayers, } = this.state;
    const { imageLoaded } = this.state;
    
    const viewProps = {
      ...R.pick(['activeTool', 'activeLayer', 'width', 'height'])(this.props) as IProps,
      ref: (ref: any) => this.view = ref,
      // onWheel: this.props.moveToolMouseWheel,
      matrix: R.pick(['sx', 'sy', 'tx', 'ty', 'x', 'y', 'zoom'])(this.props),
      style: {top: '150px', left: '50px'},
    };

    return (
      <div className={`Paper tool-${activeTool}`}>
        <Toolbar />
        <View {...viewProps} >
          <Layer name={'raster'}>
            <Raster locked={true} source={image} onLoad={imageLoaded} />
          </Layer>
        </View>
      </div>
    );
  }
}

export default withProps(
  withTools
)(Paper);

// export default Paper;
