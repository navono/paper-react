import ReactReconciler from 'react-reconciler'
import invariant from 'invariant'
import _ from 'lodash'
import { Group, Item, Layer, Path, PointText, Raster, Tool } from 'paper'

import TYPES from './types'
import { arePointsEqual } from './utils'

function applyItemProps(instance: any, props: any, prevProps: any) {
  if (props.blendMode !== prevProps.blendMode) {
    instance.blendMode = props.blendMode
  }
  if (props.clipMask !== prevProps.clipMask) {
    instance.clipMask = props.clipMask
  }
  if (props.opacity !== prevProps.opacity) {
    instance.opacity = props.opacity
  }
  if (props.selected !== prevProps.selected) {
    instance.selected = props.selected
  }
  if (props.visible !== prevProps.visible) {
    instance.visible = props.visible
  }
}

function applyStyleProps(instance: any, props: any) {
  if (props.fillColor) {
    instance.fillColor = props.fillColor
  }
  if (props.strokeColor) {
    instance.strokeColor = props.strokeColor
  }
  if (props.selected) {
    instance.selected = props.selected
  }
}

function applyGroupProps(instance: any, props: any, prevProps?: any) {
  applyItemProps(instance, props, prevProps)
  if (!_.isEqual(props.center, prevProps.center)) {
    instance.translate([
      props.center[0] - prevProps.center[0],
      props.center[1] - prevProps.center[1]
    ])
  }
  if (!arePointsEqual(props.pivot, prevProps.pivot)) {
    instance.pivot = props.pivot
    instance.position = props.position
  }
  if (!arePointsEqual(props.position, prevProps.position)) {
    instance.position = props.position
  }
  if (props.rotation !== prevProps.rotation) {
    // in case null is set
    const rotation = props.rotation ? props.rotation : 0
    const prevRotation = prevProps.rotation ? prevProps.rotation : 0
    instance.rotate(rotation - prevRotation)
  }
  // TODO: check if this is ok
  if (props.strokeColor !== prevProps.strokeColor) {
    instance.strokeColor = props.strokeColor
  }
  if (props.fillColor !== prevProps.fillColor) {
    instance.fillColor = props.fillColor
  }
}

function applyLayerProps(instance: any, props: any, prevProps: any) {
  applyItemProps(instance, props, prevProps)
  if (props.active !== prevProps.active && props.active === true) {
    instance.activate()
  }
  if (props.locked !== prevProps.locked) {
    instance.locked = props.locked
  }
  // TODO: check if this is ok
  if (props.strokeColor !== prevProps.strokeColor) {
    instance.strokeColor = props.strokeColor
    instance.children.forEach((child: any) => {
      if (child instanceof Path) {
        child.strokeColor = props.strokeColor
      }
    })
  }
  if (props.fillColor !== prevProps.fillColor) {
    instance.fillColor = props.fillColor
  }
}

function applyPathProps(instance: any, props: any, prevProps: any) {
  applyItemProps(instance, props, prevProps)
  if (!_.isEqual(props.center, prevProps.center)) {
    instance.translate([
      props.center[0] - prevProps.center[0],
      props.center[1] - prevProps.center[1]
    ])
  }
  if (!arePointsEqual(props.pivot, prevProps.pivot)) {
    instance.pivot = props.pivot
    instance.position = props.position
  }
  if (!arePointsEqual(props.position, prevProps.position)) {
    instance.position = props.position
  }
  if (props.closed !== prevProps.closed) {
    instance.closed = props.closed
  }
  if (props.dashArray !== prevProps.dashArray) {
    instance.dashArray = props.dashArray
  }
  if (props.dashOffset !== prevProps.dashOffset) {
    instance.dashOffset = props.dashOffset
  }
  if (props.fillColor !== prevProps.fillColor) {
    instance.fillColor = props.fillColor
  }
  if (props.pathData !== prevProps.pathData) {
    instance.pathData = props.pathData
  }
  if (!_.isEqual(props.point, prevProps.point)) {
    instance.translate([props.point[0] - prevProps.point[0], props.point[1] - prevProps.point[1]])
  }
  if (props.rotation !== prevProps.rotation) {
    // in case null is set
    const rotation = props.rotation ? props.rotation : 0
    const prevRotation = prevProps.rotation ? prevProps.rotation : 0
    instance.rotate(rotation - prevRotation)
  }
  if (props.strokeCap !== prevProps.strokeCap) {
    instance.strokeCap = props.strokeCap
  }
  if (props.strokeColor !== prevProps.strokeColor) {
    instance.strokeColor = props.strokeColor
  }
  if (props.strokeJoin !== prevProps.strokeJoin) {
    instance.strokeJoin = props.strokeJoin
  }
  if (props.strokeScaling !== prevProps.strokeScaling) {
    instance.strokeScaling = props.strokeScaling
  }
  if (props.strokeWidth !== prevProps.strokeWidth) {
    instance.strokeWidth = props.strokeWidth
  }
}

function applyRectangleProps(instance: any, props: any, prevProps: any) {
  applyPathProps(instance, props, prevProps)
  if (!_.isEqual(props.size, prevProps.size)) {
    instance.scale(props.size[0] / prevProps.size[0], props.size[1] / prevProps.size[1])
  }
}

function applyCircleProps(instance: any, props: any, prevProps: any) {
  applyPathProps(instance, props, prevProps)
  if (props.radius !== prevProps.radius) {
    instance.scale(props.radius / prevProps.radius)
  }
}

function applyEllipseProps(instance: any, props: any, prevProps: any) {
  applyRectangleProps(instance, props, prevProps)
}

function applyRasterProps(instance: any, props: any, prevProps: any) {
  applyItemProps(instance, props, prevProps)
  if (props.source !== prevProps.source) {
    instance.source = props.source
  }
  if (props.onLoad !== prevProps.onLoad) {
    instance.onLoad = props.onLoad
  }
}

function applyPointTextProps(instance: any, props: any, prevProps: any) {
  if (props.content !== prevProps.content) {
    instance.content = props.content
  }
  if (props.fillColor !== prevProps.fillColor) {
    instance.fillColor = props.fillColor
  }
  if (props.fontFamily !== prevProps.fontFamily) {
    instance.fontFamily = props.fontFamily
  }
  if (props.fontSize !== prevProps.fontSize) {
    instance.fontSize = props.fontSize
  }
  if (props.fontWeight !== prevProps.fontWeight) {
    instance.fontWeight = props.fontWeight
  }
  if (!_.isEqual(props.point, prevProps.point)) {
    instance.translate([props.point[0] - prevProps.point[0], props.point[1] - prevProps.point[1]])
  }
}

function applyToolProps(instance: any, props: any, prevProps: any) {
  if (props.active !== prevProps.active && props.active === true) {
    instance.activate()
  }
  if (props.onMouseDown !== prevProps.onMouseDown) {
    instance.onMouseDown = props.onMouseDown
  }
  if (props.onMouseDrag !== prevProps.onMouseDrag) {
    instance.onMouseDrag = props.onMouseDrag
  }
  if (props.onMouseMove !== prevProps.onMouseMove) {
    instance.onMouseMove = props.onMouseMove
  }
  if (props.onMouseUp !== prevProps.onMouseUp) {
    instance.onMouseUp = props.onMouseUp
  }
  if (props.onKeyUp !== prevProps.onKeyUp) {
    instance.onKeyUp = props.onKeyUp
  }
  if (props.onKeyDown !== prevProps.onKeyDown) {
    instance.onKeyDown = props.onKeyDown
  }
}

const PaperRenderer = ReactReconciler({
  getPublicInstance(instance: any) {
    return instance
  },
  getRootHostContext() {
    // return emptyObject
    return {}
  },
  getChildHostContext() {
    // return emptyObject
    return {}
  },

  prepareForCommit() {
    // Noop
  },
  resetAfterCommit() {
    // Noop
  },

  createInstance(type: string, props: any, paperScope: any) {
    const { children, ...paperProps } = props
    let instance: any

    switch (type) {
      case TYPES.TOOL:
        // instance = new Tool(paperProps)
        instance = new Tool()
        instance._applyProps = applyToolProps
        break
      case TYPES.CIRCLE:
        instance = new Path.Circle(paperProps)
        instance._applyProps = applyCircleProps
        break
      case TYPES.ELLIPSE:
        instance = new Path.Ellipse(paperProps)
        instance._applyProps = applyEllipseProps
        break
      case TYPES.GROUP:
        instance = new Group(paperProps)
        instance._applyProps = applyGroupProps
        break
      case TYPES.LAYER:
        instance = new Layer(paperProps)
        instance._applyProps = applyLayerProps
        break
      case TYPES.LINE:
        instance = new Path.Line(paperProps)
        instance._applyProps = applyPathProps
        break
      case TYPES.PATH:
        instance = new Path(paperProps)
        instance._applyProps = applyPathProps
        break
      case TYPES.POINTTEXT:
        instance = new PointText(paperProps)
        instance._applyProps = applyPointTextProps
        break
      case TYPES.RECTANGLE:
        instance = new Path.Rectangle(paperProps)
        instance._applyProps = applyRectangleProps
        break
      case TYPES.RASTER:
        const { onLoad, ...rasterProps } = paperProps
        instance = new Raster(rasterProps)
        instance._applyProps = applyRasterProps
        if (typeof onLoad === 'function') {
          instance.onLoad = () => onLoad(instance)
        }
        break
      default:
        invariant(instance, 'PaperRenderer does not support the type "%s"', type)
        break
    }

    if (instance.data && !instance.data.type) {
      instance.data.type = type
    }

    invariant(instance, 'PaperRenderer does not support the type "%s"', type)

    return instance
  },
  appendInitialChild(parentInstance: any, child: any) {
    if (typeof child === 'string') {
      // Noop for string children of Text (eg <Text>{'foo'}{'bar'}</Text>)
      invariant(false, 'Text children should already be flattened.')
    } else if (parentInstance instanceof Group && child instanceof Item) {
      child.addTo(parentInstance)
    }
  },

  finalizeInitialChildren(domElement: any, type: string, props: any) {
    // If applyMatrix=true, group props should be applied after all children have benn added.
    // If applyMatrix=false, only style-related props (ex. fillColor, strokeColor) should be applied.
    // TODO: add case for Layer
    switch (type) {
      case TYPES.GROUP:
        if (domElement.applyMatrix) {
          applyGroupProps(domElement, props)
        } else {
          applyStyleProps(domElement, props)
        }
        break
      default:
        break
    }
    return false
  },
  prepareUpdate(domElement: any, type: string, oldProps: any, newProps: any) {
    return true
  },
  shouldSetTextContent(type: string, props: any) {
    return typeof props.children === 'string' || typeof props.children === 'number'
  },
  shouldDeprioritizeSubtree(type: string, props: any) {
    return false
  },
  createTextInstance(text: string, rootContainerInstance: any, paperScope: any) {
    return text
  },

  scheduleDeferredCallback:
    typeof window !== 'undefined' ? (window as any).requestIdleCallback : null,
  resetTextContent(domElement: any) {
    // Noop
  },

  cancelDeferredCallback: (id: any) => {
    console.log('cancelDeferredCallback')
  },

  setTimeout: (handler: any, timeout: number) => 0,
  clearTimeout: (handle: any) => {
    console.log('clearTimeout')
  },
  noTimeout: null,
  now: Date.now,

  isPrimaryRenderer: true,

  // -------------------
  //     Mutation
  // -------------------

  supportsMutation: true,
  supportsPersistence: false,
  supportsHydration: false,

  appendChild(parentInstance: any, child: any) {
    if (child.parentNode === parentInstance) {
      child.remove()
    }
    if (parentInstance instanceof Group && child instanceof Item) {
      child.addTo(parentInstance)
    }
  },
  appendChildToContainer(parentInstance: any, child: any) {
    if (child.parentNode === parentInstance) {
      child.remove()
    }
    if (parentInstance instanceof Group && child instanceof Item) {
      child.addTo(parentInstance)
    }
  },
  commitTextUpdate(textInstance: any, oldText: string, newText: string) {
    // Noop
  },
  commitMount(instance: any, type: string, newProps: any) {
    // Noop
  },
  commitUpdate(
    instance: any,
    updatePayload: any,
    type: string,
    oldProps: any,
    newProps: any,
    paperScope: any
  ) {
    instance._applyProps(instance, newProps, oldProps)
  },

  insertBefore(parentInstance: any, child: any, beforeChild: any) {
    invariant(child !== beforeChild, 'PaperRenderer: Can not insert node before itself')
    if (parentInstance instanceof Group && child instanceof Path && beforeChild instanceof Path) {
      child.insertAbove(beforeChild)
    }
  },

  insertInContainerBefore(parentInstance: any, child: any, beforeChild: any) {
    invariant(child !== beforeChild, 'PaperRenderer: Can not insert node before itself')
    if (parentInstance instanceof Group && child instanceof Path && beforeChild instanceof Path) {
      child.insertAbove(beforeChild)
    }
  },

  removeChild(parentInstance: any, child: any) {
    child.remove()
  },

  removeChildFromContainer(parentInstance: any, child: any) {
    child.remove()
  }
})

export default PaperRenderer
