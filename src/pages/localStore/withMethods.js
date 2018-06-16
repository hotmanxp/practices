import React from 'react'

const withStoreMethods = (storeMethodsToProps) => Cmp => props => {
  const { store } = props
  const storeMethods = store.getMethods() || {}
  const methods = typeof storeMethodsToProps === 'function'
    ? storeMethodsToProps(storeMethods)
    : storeMethods
  return (
    <Cmp {...methods} {...props} />
  )
}
export default withStoreMethods
