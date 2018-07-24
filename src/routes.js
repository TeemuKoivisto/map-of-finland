import * as React from 'react'
import { BrowserRouter, Redirect, Switch } from 'react-router-dom'

import { WrappedRoute } from './WrappedRoute'

import FinlandBetterSimpleMap from './FinlandBetterSimpleMap'
import FinlandRegionsMap from './FinlandRegionsMap'
import FinlandSimpleMap from './FinlandSimpleMap'
import FinlandBetterD3Map from "./FinlandBetterD3Map"
import FinlandD3Map from "./FinlandD3Map"
import ToolTipMap from './ToolTipMap'
import WorldMap from "./WorldMap"

export const Routes = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <WrappedRoute exact path="/" component={FinlandBetterSimpleMap}/>
      <WrappedRoute path="/regions" component={FinlandRegionsMap}/>
      <WrappedRoute path="/simple" component={FinlandSimpleMap}/>
      <WrappedRoute path="/better-finland-d3" component={FinlandBetterD3Map}/>
      <WrappedRoute path="/finland-d3" component={FinlandD3Map}/>
      <WrappedRoute path="/tooltip" component={ToolTipMap}/>
      <WrappedRoute path="/world" component={WorldMap}/>
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
)