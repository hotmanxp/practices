import React from 'react'

const withStore = store => Cmp => props => <Cmp store={store} {...props} />
export default withStore
