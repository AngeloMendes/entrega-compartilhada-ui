import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

function Map({ handleApiLoaded, children }) {
  const zoom = 15;
  const center = {
    lat: -23.5243278,
    lng: -46.7630039,
  };

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <GoogleMapReact
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          language: 'pt-BR',
          libraries: ['places'],
        }}
        yesIWantToUseGoogleMapApiInternals
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {children}
      </GoogleMapReact>
    </div>
  );
}

Map.defaultProps = {
  children: null,
};

Map.propTypes = {
  children: PropTypes.node,
  handleApiLoaded: PropTypes.func.isRequired,
};

export default Map;
