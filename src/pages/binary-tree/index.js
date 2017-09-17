import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import BinaryTree from './tree-modal.js'
import BinaryTreeRender from './tree-node'

class Binary extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._renderTree = this._renderTree.bind(this)
  }
  componentDidMount () {
    let testArray = [18, 4, 83, 45, 3, 43, 53, 12, 34]
    this._renderBinaryTree(testArray)
  }

  _renderBinaryTree(list) {
    let binaryTree = new BinaryTree()
    list.forEach (i => binaryTree.insert(i))
    this.buildTreeGraph(binaryTree)
  }

  buildTreeGraph(binaryTree) {
    let treeHeight = binaryTree.treeHeight
    let container = findDOMNode(this.refs.container)
    let containerWidth = container.clientWidth
    container.style.height = `${treeHeight * 50}px`
    let binaryTreeDom = <BinaryTreeRender topWidth={containerWidth} binaryTree={binaryTree} />
    let all = binaryTree.listAll().join(',')
    this.setState({binaryTreeDom,allList: all})
  }

  _renderTree() {
    let sourceArray = this.refs.sources.value.split(',').map(i => +i)
    this._renderBinaryTree(sourceArray)
  }

  render() {
    return (
      <div className='binary-tree-page'>
        <div className='title'>This is binary tree page</div>
        <div>
          <input placeholder='input number, split by ","' ref='sources' style={{display: 'inline-block', width: '80%'}} />
          <div className='btn' onClick={this._renderTree}>Render</div>
          <div>{this.state.allList}</div>
        </div>
        <div ref='container' style={{position: 'relative', left: 0, top: 0}}>
          {this.state.binaryTreeDom && this.state.binaryTreeDom}
        </div>
      </div>
    )
  }
}

export default Binary
