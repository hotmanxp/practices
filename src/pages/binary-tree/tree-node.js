import React from 'react';
import consts from './consts'

const Node = ({width, value, isRight, leftChild, rightChild}) => {
  const style={
    height: `${consts.treeLevelHeight}px`,
    width: `${width}px`,
    position: 'absolute',
    top: `${consts.treeLevelHeight}px`,
    left: isRight ? `${width}px` : 0,
    border: '1px solid #fcc',
    textAlign: 'center',
    lineHeight: `${consts.treeLevelHeight}px`
  }
  const nodeStyle = {
    display: 'inline-block',
    height: `${consts.treeLevelHeight}px`,
    width: `${consts.treeLevelHeight}px`,
    borderRadius: '50%',
    backgroundColor: '#fcc',
    color: '#333',
    lineHeight: `${consts.treeLevelHeight}px`
  }
  return <div style={style}>
    <span style={nodeStyle}>{value}</span>
    {leftChild && leftChild}
    {rightChild && rightChild}
    </div>
}

const BinaryTreeRender = ({binaryTree, topWidth, isRight}) => {
  let rootNode = binaryTree.root || binaryTree
  let leftChild = rootNode.left ? <BinaryTreeRender binaryTree={rootNode.left} topWidth={topWidth * 0.5} /> : null
  let rightChild = rootNode.right ? <BinaryTreeRender binaryTree={rootNode.right} topWidth={topWidth * 0.5} isRight /> : null
  return <Node leftChild={leftChild} rightChild={rightChild} value={rootNode.key} width={topWidth} isRight={isRight} />
}

export default BinaryTreeRender

