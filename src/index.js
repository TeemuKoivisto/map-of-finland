import React from "react"
import ReactDOM from "react-dom"

import './index.css'
import { Routes } from './routes'

if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update')
  whyDidYouUpdate(React)
}


ReactDOM.render(
  <Routes />,
  document.getElementById('root'))

