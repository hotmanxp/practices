import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import routes from './routes'

class App extends Component {
  render() {
    return (
        <BrowserRouter >
          <div>
            {
              routes.map((route) => {
                return <Route key={route.path} component={route.Cmp} path={route.path} exact />
              })
            }
          </div>
        </BrowserRouter>
    );
  }
}

export default App

