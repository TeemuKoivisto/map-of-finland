import * as React from 'react'
import { BrowserRouter, Redirect, Switch } from 'react-router-dom'

import { WrappedRoute } from './WrappedRoute'

import WorldMap from "./WorldMap"
import FinlandD3Map from "./FinlandD3Map"
import ToolTipMap from './ToolTipMap'
import FinlandSimpleMap from './FinlandSimpleMap'

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <WrappedRoute exact path="/" component={FinlandSimpleMap}/>
      <WrappedRoute path="/finland-d3" component={FinlandD3Map}/>
      <WrappedRoute path="/tooltip" component={ToolTipMap}/>
      <WrappedRoute path="/world" component={WorldMap}/>
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
)