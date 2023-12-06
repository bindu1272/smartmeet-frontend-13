import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 28.5221536,
      lng: 77.2079783
    },
    zoom: 17
  };

  render() {
    return (
      <div style={{ height: '450px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCQTX7J2sI4ogUtGwKKiGkIFfNhWEzXijI' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={28.5221536}
            lng={77.2079783}
            text="Max Hospital"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;