import React from "react"
import ReactDOM from "react-dom"
import './index.css'
import WorldMap from "./WorldMap"
import FinlandD3Map from "./FinlandD3Map"
import ToolTipMap from './ToolTipMap'
import FinlandSimpleMap from './FinlandSimpleMap'

// ReactDOM.render(<WorldMap />, document.getElementById("root"))
// ReactDOM.render(<FinlandD3Map />, document.getElementById('root'))
ReactDOM.render(<FinlandSimpleMap />, document.getElementById('root'))
// ReactDOM.render(<ToolTipMap />, document.getElementById('root'))

