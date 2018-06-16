import Home from './pages/home'
import Nav from './pages/navigate'
import BinaryTree from './pages/binary-tree'
import ChineseChest from './pages/chinese-chest'
import RxjsComp from './pages/rxjs'
import TestCallStack from './pages/test-call-stack'
import Layout from './pages/rem-layout'
import Potal from 'page/potal'
import LocalStore from 'page/localStore'

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
  },
  {
    Cmp: RxjsComp,
    name: 'Rxjs',
    path: '/rxjs'
  },
  {
    Cmp: TestCallStack,
    name: 'Test Call Stack',
    path: '/test-call-stack'
  },
  {
    Cmp: Layout,
    name: 'Layout',
    path: '/rem-layout'
  },
  {
    Cmp: Potal,
    name: 'Potal',
    path: '/potal'
  },
  {
    Cmp: LocalStore,
    name: 'LocalStore',
    path: '/my-local-store'
  }
]
export default routes
