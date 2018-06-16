import React from 'react'

import { connectStore_2 } from '../store'

const SimpleCmp = ({name, num, setNum}) => (
  <div>
    <h2>This Component also use store02</h2>
    <div>{`${name} has number: ${num}`}</div>
    <button
      onClick={() => setNum('10086')}
      children='Set store to 10086'
    />
  </div>
)

const stateToProps = ({name, num}) => ({name, num})
const disToProps = dispatch => ({
  setNum: (num) => dispatch({num})
})

export default connectStore_2(stateToProps, null, disToProps)(SimpleCmp)


