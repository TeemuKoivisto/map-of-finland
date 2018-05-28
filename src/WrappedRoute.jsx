import * as React from 'react'
import { Route } from 'react-router'

import { NavBar } from './NavBar'

const renderWrapper = (Component) => (props) =>
  <main>
    <NavBar />
    <Component {...props}/>
  </main>

export const WrappedRoute = ({ component, ...rest }) =>
  <Route {...rest} render={renderWrapper(component)}/>
