import React, { Component } from 'react';

class TestCallStack extends Component {
  constructor (props) {
    super(props)
    this.state = {
      num: 0
    }
  }
  testState = (e) => {
    this.setState({num: ++this.state.num}, () => {
      console.log('first ==>', this.state.num)
    })
    this.setState({num: this.state.num + 3})
    this.setState({num: this.state.num + 1})
    this.setState((state) => {
      return {
        num: state.num + 1
      }
    }, () => {
      console.log('second ===>', this.state.num)
    })

  }
  componentDidUpdate(prevProps, prevState) {
    console.log('component update!!')
  }
  render() {
    if (this.state.num < 1 ) this.setState({num: 1})
    return (
      <div>
        {`Num: ${this.state.num}`}
        <div>
          <button onClick={this.testState}>Test</button>
        </div>
      </div>
    );
  }
}

export default TestCallStack;