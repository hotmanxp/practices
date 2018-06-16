import React from 'react'

import { connectStore_2 } from '../store'

const SimpleCmp = ({name, num, setNum}) => (
  <div>
    <h2>This is simple children with store02 connected</h2>
    <div>{`${name} has number: ${num}`}</div>
    <button
      onClick={() => setNum('18888')}
      children='Set store to 18888'
    />
  </div>
)

const stateToProps = ({name, num}) => ({name, num})
const disToProps = dispatch => ({
  setNum: (num) => dispatch({num})
})

export default connectStore_2(stateToProps, null, disToProps)(SimpleCmp)


