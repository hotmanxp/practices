import Home from './pages/home'
import Nav from './pages/navigate'
import BinaryTree from './pages/binary-tree'

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
  }
]
export default routes
