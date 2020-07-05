/* eslint-disable class-methods-use-this */
class MapsService {
  markers = [];

  routes = [];

  constructor(mapsApi, map) {
    this.map = map;
    this.mapsApi = mapsApi;
    this.directionsService = new mapsApi.DirectionsService();
  }

  cleanMarkers() {
    this.markers.forEach((marker) => {
      marker.setMap(null);
    });
    this.markers = [];
  }

  cleanRoutes() {
    this.routes.forEach((route) => {
      route.setMap(null);
    });
    this.routes = [];
  }

  fitPositions = (positions) => {
    const bounds = new this.mapsApi.LatLngBounds();
    positions.forEach((position) => {
      bounds.extend(position);
    });
    this.map.fitBounds(bounds);
  }

  autoComplete(input, callback) {
    const { map, mapsApi } = this;
    const autocomplete = new mapsApi.places.Autocomplete(
      input,
      {
        componentRestrictions: { country: 'br' },
      },
    );
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;

      const { lat, lng } = place.geometry.location;

      const position = { lat: lat(), lng: lng() };
      callback(position, this.formatAddress(place.address_components));
    });
  }

  createMarker(position, title, options) {
    const { map, mapsApi } = this;

    const marker = new mapsApi.Marker({
      position,
      map,
      title,
      ...options,
    });

    marker.setMap(map);
    this.markers.push(marker);
    return marker;
  }

  createRoute(origin, destination, options = {}) {
    const directionsDisplay = new this.mapsApi.DirectionsRenderer();
    this.routes.push(directionsDisplay);

    const { map, mapsApi, directionsService } = this;

    const request = {
      origin,
      destination,
      travelMode: mapsApi.TravelMode.DRIVING,
    };

    directionsDisplay.setMap(map);
    directionsDisplay.setOptions(options);

    directionsService.route(request, (response, status) => {
      if (status === mapsApi.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap(map);
      } else {
        // eslint-disable-next-line no-alert
        alert('Houve um erro ao calcular a rota, verifique sua conexão');
      }
    });
  }

  formatAddress(address) {
    return address.reduce((result, current) => ({
      ...result,
      [current.types[0]]: current.long_name,
    }), {});
  }
}

export default MapsService;
