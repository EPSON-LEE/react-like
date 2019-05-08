import { renderComponent } from '../react-dom/render'

// 定义组件的结构
class Component {
  constructor(props = {}) {
    this.isReactComponent = true

    this.state = {}
    this.props = props
  }

  setState(stateChange) {
    Object.assign(this.state, stateChange)
    renderComponent(this)
  }
}

export default Component
