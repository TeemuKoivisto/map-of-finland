import React, { Component } from "react"
import { geoMercator, geoPath } from "d3-geo"
import finlandData from './finland.json'

class FinlandD3Map extends Component {
  constructor() {
    super()
    this.state = {
      worlddata: [],
    }
    this.handleCountryClick = this.handleCountryClick.bind(this)
  }
  projection() {
    // return geoTransverseMercator()
    return geoMercator()
      .rotate([-27,-65,0])
      .translate([600/2, 800/2])
      .scale([4000])
  }
  handleCountryClick(countryIndex) {
    console.log("Clicked on country: ", finlandData.features[countryIndex])
  }
  render() {
    return (
      <svg width={ 600 } height={ 800 }>
        <g className="countries">
          {
            finlandData.features.map((d,i) => (
              <path
                key={ `path-${ i }` }
                d={ geoPath().projection(this.projection())(d) }
                className="country"
                fill={ `rgba(38,50,56,${ 1 / finlandData.features.length * i})` }
                stroke="#FFFFFF"
                strokeWidth={ 0.5 }
                onClick={ () => this.handleCountryClick(i) }
              />
            ))
          }
        </g>
      </svg>
    )
  }
}

export default FinlandD3Map