
import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"
import ReactTooltip from "react-tooltip"
import finland from './kuntarajat-2018.json'

class FinlandSimpleMap extends Component {
  constructor() {
    super()
    this.state = {
      zoom: 1,
    }
  }
  componentDidMount() {
    setTimeout(() => {
      ReactTooltip.rebuild()
    }, 100)
  }
  handleZoomIn = () => {
    this.setState({
      zoom: this.state.zoom * 2,
    })
  }
  handleZoomOut = () => {
    this.setState({
      zoom: this.state.zoom / 2,
    })
  }
  render() {
    const { zoom } = this.state
    return (
      <div className="simple-map-container">
        <div className="fixed-zoom-menu">
          <button className="zoom-button" onClick={ this.handleZoomIn }>Zoom in</button>
          <button className="zoom-button" onClick={ this.handleZoomOut }>Zoom out</button>
        </div>
        <ComposableMap
          projection="mercator"
          projectionConfig={{
            scale: [3500],
          }}
          width={1400}
          height={1600}
          style={{
            width: "100%",
            height: "auto",
          }}
          >
          <ZoomableGroup center={[27,65.6]} zoom={zoom}>
            <Geographies geography={finland.features}>
              {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                <Geography
                  key={i}
                  data-tip={geography.properties.NAMEFIN}
                  geography={geography}
                  projection={projection}
                  style={{
                    default: {
                      fill: "#ECEFF1",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    hover: {
                      fill: "#607D8B",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    pressed: {
                      fill: "#FF5722",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                  }}
                />
              ))}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        <ReactTooltip />
      </div>
    )
  }
}

export default FinlandSimpleMap