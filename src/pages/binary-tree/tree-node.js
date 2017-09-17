import React from 'react';

const Node = ({width, value, isRight, leftChild, rightChild}) => {
  const style={
    height: '50px',
    width: `${width}px`,
    position: 'absolute',
    top: '50px',
    left: isRight ? `${width}px` : 0,
    border: '1px solid #fcc',
    textAlign: 'center',
    lineHeight: '50px'
  }
  const nodeStyle = {
    display: 'inline-block',
    height: '50px',
    width: '50px',
    borderRadius: '50%',
    backgroundColor: '#fcc',
    color: '#333',
    lineHeight: '50px'
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

