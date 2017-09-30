import Home from './pages/home'
import Nav from './pages/navigate'
import BinaryTree from './pages/binary-tree'
import ChineseChest from './pages/chinese-chest'

const routes = [
  {
    Cmp: Nav,
    name: 'nav',
    path: '/'
  },
  {
    Cmp: Home,
    name: 'home',
    path: '/home'
  },
  {
    Cmp: BinaryTree,
    name: 'binaryTree',
    path: '/binary-tree'
  },
  {
    Cmp: ChineseChest,
    name: 'chineseChest',
    path: '/chinese-chest'
  }
]
export default routes
