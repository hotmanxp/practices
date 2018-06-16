class Store {
  constructor (initState = {}) {
    this.init = this.initState(initState)
    this.dispatch = this.setState
    this.init()
    this.listeners = []
  }
  initState = initState => () => {
    this.state = initState
  }
  resetStore = () => {
    this.init()
    this.publish()
  }
  subscribe = listener => {
    if (this.listeners.find(l => l === listener)) return
    this.listeners.push(listener)
    return () => {
      const index = this.listener.findIndex(l => l === listener)
      this.listeners.splice(index, 1)
    }
  }
  publish = () => {
    this.listeners.forEach( listener => {
      typeof listener === 'function' && listener()
    })
  }
  getState = () => this.state
  setState = (partialState) => {
    this.state = {...this.state, ...partialState}
    this.publish()
  }
  getMethods = () => ({ 
    resetStore: this.resetStore,
    ...(this.methods || {})
  })
}

export default Store
