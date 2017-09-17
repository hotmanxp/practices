class Node {
  constructor (key, level) {
    this.key = key
    this.left = null
    this.right = null
    this.level = level
  }
}

class BinaryTree {
  constructor () {
    this.root = null
    this.treeHeight = 0
  }
  insert (key) {
    if (this.root === null) {
      let node = new Node(key, 1)
      this.root = node
      this.treeHeight = 1
    } else {
      this._insertNode(this.root, key)
    }
  }
  _insertNode (nodePoint, key) {
    const sideMethod = (side, key) => {
      if(nodePoint[side] === null) {
        let parentLevel = nodePoint.level
        nodePoint[side] = new Node(key, parentLevel + 1)
        this.treeHeight = Math.max(this.treeHeight, parentLevel + 1)
      } else {
        this._insertNode(nodePoint[side], key)
      }
    }
    if (nodePoint.key === key) return
    if (nodePoint.key > key) {
      sideMethod('left', key)
    } else {
      sideMethod('right', key)
    }
  }
  listAll () {
    return this._listNode(this.root)
  }
  _listNode (node) {
    if (!node) return []
    let middle = node.key
    let left = this._listNode(node.left)
    let right = this._listNode(node.right)
    return [].concat(left, [middle], right)
  }
}

export default BinaryTree
