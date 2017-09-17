import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import BinaryTree from './tree-modal.js'
import BinaryTreeRender from './tree-node'
import consts from './consts'

const testArray = [18, 4, 83, 45, 3, 43, 53, 12, 34]

class Binary extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._renderTree = this._renderTree.bind(this)
  }
  componentDidMount () {
    this._renderBinaryTree(testArray)
    window.addEventListener('resize', this._renderTree)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this._renderTree)
  }

  _renderBinaryTree(list) {
    let binaryTree = new BinaryTree()
    binaryTree.inputBase(list)
    this.buildTreeGraph(binaryTree)
  }

  buildTreeGraph(binaryTree) {
    let treeHeight = binaryTree.treeHeight
    let container = findDOMNode(this.refs.container)
    let containerWidth = container.clientWidth
    container.style.height = `${treeHeight * consts.treeLevelHeight}px`
    let binaryTreeDom = <BinaryTreeRender topWidth={containerWidth} binaryTree={binaryTree} />
    let all = binaryTree.listAll().join(',')
    this.setState({binaryTreeDom,allList: all})
  }

  _renderTree() {
    let sourceArray = this.refs.sources.value.split(',').map(i => +i)
    sourceArray = sourceArray.length > 1 ? sourceArray : testArray
    this._renderBinaryTree(sourceArray)
  }

  render() {
    return (
      <div className='binary-tree-page'>
        <div className='title'>This is binary tree page</div>
        <div>
          <input placeholder='input number, split by ","' ref='sources' style={{display: 'inline-block', width: '80%'}} />
          <div className='btn' onClick={this._renderTree}>Render</div>
          <div>sorted result: {this.state.allList}</div>
        </div>
        <div ref='container' style={{position: 'relative'}}>
          {this.state.binaryTreeDom && this.state.binaryTreeDom}
        </div>
      </div>
    )
  }
}

export default Binary
