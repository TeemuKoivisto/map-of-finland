import React from "react"
import { Link } from 'react-router-dom'

export const NavBar = () =>
  <nav className="nav-bar">
    <Link className="nav-bar-link" to="/">FinlandSimpleMap</Link>
    <Link className="nav-bar-link" to="/finland-d3">FinlandD3Map</Link>
    <Link className="nav-bar-link" to="/tooltip">ToolTipMap</Link>
    <Link className="nav-bar-link" to="/world">WorldMap</Link>
  </nav>