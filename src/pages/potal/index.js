import React, { Component } from 'react'
import Page from 'cmp/page'
import Potal from 'cmp/potal'

class ContentCmp extends Component {
  state = {
    totalNum: 1,
    showBtn: true
  }
  addOne = () => {
    this.setState({totalNum: this.state.totalNum + 1})
  }
  hideBtn = () => {
    this.setState({
      showBtn: false
    })
  }

  render() {
    return (
      <Page>
        this's txt
        {
          this.state.showBtn && <Potal containerId='btn-container'>
            <button onClick={this.addOne}>Add One</button>
            <button onClick={() => this.forceUpdate()}> Update </button>
            <button onClick={this.hideBtn}>touch me</button>
            <div>{`test it should be update to: ` + this.state.totalNum}</div>
          </Potal>
        }
      </Page>
    )
  }
}

export default ContentCmp
