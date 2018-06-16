import connect from './connect'
import Store from './store-base'
import StoreWithMethods from './storeWithMethod'

const pageStore_1 = new Store({name: 'stone 01', num: 1000})
const pageStore_2 = new Store({name: 'stone 002', num: 10})
const storeHasMethods = new StoreWithMethods({name: 'Store has methods', num: 1, showChild: true})

export const connectStore_1 = connect(pageStore_1)
export const connectStore_2 = connect(pageStore_2)
export const connectStoreWithMethods = connect(storeHasMethods)




