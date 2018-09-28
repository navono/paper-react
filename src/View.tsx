import * as React from 'react';
import { PaperScope, Size } from 'paper';
import { FiberRoot } from 'react-reconciler';
import PaperRenderer from './PaperRenderer';

interface IProps {
  activeLayer?: number,
  activeTool?: string,
  children: React.ReactElement<any>;
  width: number,
  height: number,
  settings?: any,
}

export default class View extends React.Component<IProps, any> {
  private paper: PaperScope;
  private canvas: HTMLCanvasElement | null;
  private mountNode: FiberRoot | null;

  constructor(props: IProps) {
    super(props);

    this.paper = new PaperScope();
    this.canvas = null;
    this.mountNode = null;
  }

  public componentDidMount() {
    const {
      activeLayer,
      activeTool,
      children,
      width,
      height,
      settings,
    } = this.props;

    
    this.paper.setup(this.canvas!);

    // if (settings) {
    //   for (let key of Object.keys(settings)) {
    //     this.paper.settings[key] = settings[key];
    //   }
    // }

    const { project, tools, view } = this.paper;
    view.viewSize = new Size(width, height);

    this.mountNode = PaperRenderer.createContainer(this.paper, false, false);
    PaperRenderer.updateContainer(children, this.mountNode, null, () => null);

    // initial active layer
    if (typeof activeLayer === 'number') {
      const layer = project.layers.find(l => l.data.id === activeLayer)
      if (layer) layer.activate();
    }

    // initial active tool
    if (typeof activeTool === 'string') {
      console.log('activeTool');
      
      // const tool = tools.find(t => t === activeTool);
      // if (tool) tool.activate();
    }
  }

  public componentDidUpdate(prevProps: IProps) {
    const { children, width, height } = this.props;
    const { view } = this.paper;

    PaperRenderer.updateContainer(children, this.mountNode!, this, () => null);

    // size has changed, update center
    if (width !== prevProps.width || height !== prevProps.height) {
      const prevCenter = view.center
      view.viewSize = new Size(width, height)
      view.translate(view.center.subtract(prevCenter))
    }
  }

  public componentWillUnmount() {
    PaperRenderer.updateContainer(null, this.mountNode!, this, () => null);
  }

  public render() {
    PaperRenderer.injectIntoDevTools({
      bundleType: process.env.NODE_ENV === 'production' ? 0 : 1,
      version: '0.1.0',
      rendererPackageName: 'paper-react',
      // findHostInstanceByFiber: PaperRenderer.findHostInstance,
    });
    const {
      activeLayer,
      activeTool,
      children,
      width,
      height,
      ...other
    } = this.props;
    return <canvas {...other} ref={this.canvasRef} />;
  }

  private canvasRef = (ref: HTMLCanvasElement) => {
    if (ref) this.canvas = ref;
  };
}