import React, { Component } from 'react';
import {useAsync, useGen} from './test-generator'

class TestCallStack extends Component {
  constructor (props) {
    super(props)
    this.state = {
      num: 0
    }
    // this.testEval()
  }
  testEval () {
    // let func = `console.log('ss', this.state)`
    // eval(func)
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
    //console.log('component update!!')
  }
  render() {
    // if (this.state.num < 1 ) this.setState({num: 1})
    return (
      <div>
        {`Num: ${this.state.num}`}
        <div>
          <button onClick={this.testState}>Test</button>
          <button onClick={() => useAsync('useAsync')}>Use Async</button>
          <button onClick={() => useGen('useGenerator')}>Use Gen</button>
        </div>
      </div>
    );
  }
}

export default TestCallStack;