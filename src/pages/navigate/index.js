import React from 'react'
import routes from '../../routes'
import { NavLink as Link } from 'react-router-dom'
import './nav.css'

const LinkPage = (props) => {
  return <div className='navigate-page'>
    <div className='container'>
      {routes.map(route => <Link className='link-btn btn' key={route.path} to={route.path} >{route.name}</Link>)}
    </div>
  </div>
}
export default LinkPage