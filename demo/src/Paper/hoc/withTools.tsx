import * as React from 'react';

export default function withTools(WrappedComponent: any) {
  return class extends React.Component<any, any> {
    private prevTool: any;
    constructor(props: any) {
      super(props)
      this.state = {
        activeTool: 'move',
      };
      this.prevTool = null;
    }

    public componentDidMount() {
      document.addEventListener('keydown', this.keyDown);
      document.addEventListener('keyup', this.keyUp);
    }

    public componentWillUnmount() {
      document.removeEventListener('keydown', this.keyDown);
      document.removeEventListener('keyup', this.keyUp);
    }

    public render() {
      return (
        <WrappedComponent
          {...this.props}
          activeTool={this.state.activeTool}
          setTool={this.setTool}
        />
      );
    }

    private setTool = (activeTool: any) => {
      this.setState({ activeTool });
    }

    private keyDown = (e: any) => {
      if (e.code === 'Space' && this.state.activeTool !== 'move') {
        this.prevTool = this.state.activeTool;
        this.setState({ activeTool: 'move' });
      } else if (e.key === 'v') {
        this.setState({ activeTool: 'move' });
      } else if (e.key === 'a') {
        this.setState({ activeTool: 'select' });
      } else if (e.key === 'p') {
        this.setState({ activeTool: 'pen' });
      } else if (e.key === 'c') {
        this.setState({ activeTool: 'circle' });
      } else if (e.key === 'r') {
        this.setState({ activeTool: 'rectangle' });
      } else if (e.key === 'd') {
        this.setState({ activeTool: 'delete' });
      }
    }

    private keyUp = (e: any) => {
      if (e.code === 'Space' && this.state.activeTool === 'move' && this.prevTool !== 'move') {
        this.setTool(this.prevTool);
        this.prevTool = null;
      }
    }
  }
}
