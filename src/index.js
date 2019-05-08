import React from './react'
import ReactDOM from './react-dom'

class Counter extends React.Component {
  constructor(props) {
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

  onClick() {
    this.setState({ num: this.state.num + 1 })
  }

  render() {
    return (
      <div onClick={() => this.onClick()}>
        <h1>number: {this.state.num}</h1>
        <button>add3</button>
      </div>
    )
  }
}

ReactDOM.render(<Counter />, document.getElementById('root'))
