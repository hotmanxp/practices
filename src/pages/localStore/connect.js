import { connect } from 'react-redux'
import { compose } from 'redux'

import withStore from './withStore'
import withStoreMethods from './withMethods'

export default store => (stateToProps, methodsToProps, dispatchToProps) => compose (
  withStore(store),
  withStoreMethods(methodsToProps),
  connect(stateToProps, dispatchToProps)
)
