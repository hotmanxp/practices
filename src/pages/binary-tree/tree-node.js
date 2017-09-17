import React from 'react';
import consts from './consts'

const Node = ({width, value, isRight, leftChild, rightChild}) => {
  const style={
    height: `${consts.treeLevelHeight}px`,
    width: `${width}px`,
    position: 'absolute',
    top: `${consts.treeLevelHeight}px`,
    left: isRight ? `${width}px` : 0,
    textAlign: 'center',
    lineHeight: `${consts.treeLevelHeight}px`
  }
  const nodeStyle = {
    display: 'inline-block',
    height: `${consts.treeLevelHeight / 2}px`,
    width: `${consts.treeLevelHeight / 2}px`,
    borderRadius: '50%',
    backgroundColor: '#fcc',
    color: '#333',
    lineHeight: `${consts.treeLevelHeight / 2}px`,
    marginTop: `-${consts.treeLevelHeight / 4}px`
  }
  const linkLineStyle = {
    position: 'absolute',
    width: `${width / 4}px`,
    height: `${consts.treeLevelHeight * 3 / 4}px`,
    borderStyle: 'solid',
    borderColor: '#fcc',
    top: `${consts.treeLevelHeight / 2}px`,
    zIndex: -1
  }
  let leftLinkStyle = {
    borderWidth: '1px 0 0 1px',
    left: `${width / 4}px`
  }
  let rightLinkStyle = {
    borderWidth: '1px 1px 0 0',
    left: `${width / 2}px`
  }
  leftLinkStyle = Object.assign(leftLinkStyle, linkLineStyle)
  rightLinkStyle = Object.assign(rightLinkStyle, linkLineStyle)
  let leftLinkLine = <div style={leftLinkStyle} ></div>
  let rightLinkLine = <div style={rightLinkStyle}></div>
  return <div style={style}>
    <span style={nodeStyle}>{value}</span>
    {leftChild && leftChild}
    {leftChild && leftLinkLine}
    {rightChild && rightChild}
    {rightChild && rightLinkLine}
    </div>
}

const BinaryTreeRender = ({binaryTree, topWidth, isRight}) => {
  let rootNode = binaryTree.root || binaryTree
  let leftChild = rootNode.left ? <BinaryTreeRender binaryTree={rootNode.left} topWidth={topWidth * 0.5} /> : null
  let rightChild = rootNode.right ? <BinaryTreeRender binaryTree={rootNode.right} topWidth={topWidth * 0.5} isRight /> : null
  return <Node leftChild={leftChild} rightChild={rightChild} value={rootNode.key} width={topWidth} isRight={isRight} />
}

export default BinaryTreeRender

