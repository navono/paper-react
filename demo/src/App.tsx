import * as React from 'react';
import './App.css';
import { View, Layer, PointText, Circle } from 'paper-react';

class App extends React.Component<any, any> {
  private box: any;
  constructor(props: any) {
    super(props);

    this.state = {
      mounted: false
    };
    this.box = null;
  }

  public componentDidMount() {
    this.setState({ mounted: true });
  }

  public render() {
    const { mounted } = this.state;
    const box = this.box && this.box.getBoundingClientRect();

    const viewProps = {
      width: (box && box.width) || 1000,
      height: (box && box.height) || 1000
    };

    return (
      <div className="App" ref={ref => (this.box = ref)}>
        {mounted && (
          <View {...viewProps}>
            <Layer>
              <PointText
                point={[200, 200]}
                content={"Click Me"}
                fillColor={"#000000"}
                fontSize={18}
              />
              <Circle center={[80, 50]} radius={30} strokeColor={"black"} />
            </Layer>
          </View>
        )}
      </div>
    );
  }
}

export default App;
