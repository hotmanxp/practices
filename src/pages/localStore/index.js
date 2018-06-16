import React, { Component } from 'react'

import { connectStoreWithMethods } from './store'

import SimpleCmp from './cmp/store02Cmp'
import SimpleCmp2 from './cmp/useStore2Too'
import SimpleCmp3 from './cmp/useMethodStore'


class LocalStore extends Component {
  setNum
  render() {
    const { pageNum, setNum, toggleShow } = this.props
    return (
      <div>
        <h1>Test my local store</h1>
        <div>{`PAGE NUM IS : ${pageNum}`}</div>
        <button
          onClick={() => setNum('888')}
          children = 'Set to 888'
        />
        <button
          onClick={() => toggleShow('888')}
          children = 'Toggle'
        />
        <SimpleCmp />
        <SimpleCmp2 />
        <SimpleCmp3 />
      </div>
    )
  }
}

const dispatchToProps = (dispatch) => ({
  setNum: (num) => {
    dispatch({num})
  }
})

export default connectStoreWithMethods(
  ({num}) => ({pageNum: num}),
  ({toggleShow}) => ({toggleShow}),
  dispatchToProps
)(LocalStore)
