import React from './react'
import ReactDOM from './react-dom'

const Test = () => <div>1111</div>

class Counter extends React.Component {
  constructor(props) {
    console.log(111111)
    super(props)
    this.state = {
      num: 0
    }
  }

  componentWillUpdate() {
    console.log('update')
  }

  componentWillMount() {
    console.log('mount')
  }

  componentWillUnmount() {
    console.log('unmount')
  }

  componentWillReceiveComponent() {
    console.log('componentWillReceiveComponent')
  }

  onClick() {
    this.setState({ num: this.state.num + 1 })
  }

  render() {
    return (
      <div onClick={() => this.onClick()}>
        <Test />
        <h1>number: {this.state.num}</h1>
        <button>add3</button>
      </div>
    )
  }
}

ReactDOM.render(<Counter />, document.getElementById('root'))
