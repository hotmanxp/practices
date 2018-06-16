import Store from './store-base'

class StoreWithMethods extends Store {
  setName = name => {
    this.setState({name})
  }
  toggleShow = () => {
    this.setState({showChild: !this.state.showChild})
  }
  methods = {
    setName: this.setName,
    toggleShow: this.toggleShow
  }
}

export default StoreWithMethods
