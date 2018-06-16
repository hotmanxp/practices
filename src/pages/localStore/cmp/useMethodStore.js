import React from 'react'

import { connectStoreWithMethods } from '../store'

const SimpleCmp = ({name, num, setName, resetStore, showChild}) => (
  showChild
  ? <div>
    <h2>This component use methods store connected</h2>
    <div>{`${name} has number: ${num}`}</div>
    <button
      onClick={() => setName('Ethan')}
      children='Set name to Ethan'
    />
    <button
      onClick={() => resetStore()}
      children='Reset'
    />
  </div>
  : null
)

const stateToProps = ({name, num, showChild}) => ({name, num, showChild})
const methodsToProps = ({setName, resetStore}) => ({setName, resetStore})

export default connectStoreWithMethods(stateToProps, methodsToProps)(SimpleCmp)


