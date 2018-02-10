import React, { Component } from 'react';
import classnames from 'classnames'

const pageStyle = {
  height: '80vh',
  padding: '20px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column'
}

const contentStyle = {
  flex: '1'
}

const btnCtnStyle = {
  
}

class Page extends Component {
  render() {
    const {className, children} = this.props
    return (
      <div className={classnames('page', className)} style={pageStyle}>
        <div className='content' style={contentStyle}>{children}</div>
        <div id='btn-container' style={btnCtnStyle}>
        </div>
      </div>
    );
  }
}

export default Page;