import React, { Component } from "react"
import { geoMercator, geoPath } from "d3-geo"
import finlandData from './kuntarajat-2018.json'

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
  handleZoomIn = () => {
    // const width=600, height=800
    // var scale, visibleArea, invisibleArea // minimum area threshold for points inside viewport
    // var context = canvas.node().getContext("2d")
    
    // function zoomed(d) {
    //   translate = zoom.translate();
    //   scale = zoom.scale();
    //   visibleArea = 1 / scale / scale;
    //   invisibleArea = 200 * visibleArea;
    //   context.clearRect(0, 0, width, height);
    //   context.beginPath();
    //   path(d);
    //   context.stroke();
    // }

    // d3.behavior.zoom()
    //   .translate([0, 0])
    //   .scale(1)
    //   .scaleExtent([1, 8])
    //   .on("zoom", zoomed)
  }
  handleZoomOut = () => {
  }
  render() {
    return (
      <div>
        <div className="fixed-zoom-menu">
          <button className="zoom-button" onClick={ this.handleZoomIn }>Zoom in</button>
          <button className="zoom-button" onClick={ this.handleZoomOut }>Zoom out</button>
        </div>
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
      </div>
    )
  }
}

export default FinlandD3Map