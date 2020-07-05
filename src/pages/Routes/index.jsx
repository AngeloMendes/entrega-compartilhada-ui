import React, { useState } from 'react';
import MapsService from 'services/maps';
import Map from 'components/Map';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
  Paper, Grid, Button, Typography,
} from '@material-ui/core';
import { PointTypes } from 'constants/enums';
import CollectImage from 'images/collect.png';
import DeliveryImage from 'images/delivery.png';
import { Redirect } from 'react-router-dom';

const routes = [
  {
    id: 1,
    name: 'Joaquim da Silva',
    points: [
      {
        lat: -21.7703518,
        lng: -43.3670798,
        type: PointTypes.DELIVERY,
      },
      {
        lat: -21.7702991,
        lng: -43.3586918,
        type: PointTypes.COLLECT,
      },
      {
        lat: -21.7613279,
        lng: -43.351579,
        type: PointTypes.COLLECT,
      },
      {
        lat: -21.760884,
        lng: -43.345592,
        type: PointTypes.DELIVERY,
      },
    ],
  },
];

const getRoute = (routeId) => (routeId ? routes.find((route) => route.id === routeId) : null);

const getMarkerImage = (type) => {
  if (type === PointTypes.COLLECT) return CollectImage;
  return DeliveryImage;
};

const getMarkerLabel = (type) => {
  if (type === PointTypes.COLLECT) return 'Retirar';
  return 'Entregar';
};

function Routes() {
  const [selectedRouteId, setSelectedRouteId] = useState('');
  const [mapsService, setMapsService] = useState(null);
  const [sent, setSent] = useState(false);

  const handleApiLoaded = (map, maps) => {
    setMapsService(new MapsService(maps, map));
  };

  const handleSelectRoute = (event) => {
    const routeId = event.target.value;

    setSelectedRouteId(routeId);
    if (!routeId) {
      mapsService.cleanRoutes();
      mapsService.cleanMarkers();
      return;
    }

    const route = getRoute(routeId);
    const { points } = route;

    for (let i = 0; i < points.length; i += 1) {
      const currentPoint = points[i];
      if (i !== 0) {
        mapsService.createRoute(points[i - 1], currentPoint, { suppressMarkers: true });
      }

      mapsService.createMarker(
        currentPoint,
        getMarkerLabel(currentPoint.type),
        { icon: getMarkerImage(currentPoint.type) },
      );
    }

    mapsService.fitPositions(points);
  };

  const handleSend = () => {
    setSent(true);
  };

  if (sent) return <Redirect to="/pedidos" />;

  return (
    <>
      <Map handleApiLoaded={handleApiLoaded} />
      <Grid container justify="center" style={{ marginTop: 30 }}>
        <Grid item md={6}>
          <Paper>
            <Select
              variant="outlined"
              fullWidth
              displayEmpty
              value={selectedRouteId}
              onChange={handleSelectRoute}
            >
              <MenuItem value="">
                <Typography color="textSecondary">Entregador</Typography>
              </MenuItem>
              {
                routes.map((route) => (
                  <MenuItem
                    key={route.id}
                    value={route.id}
                  >
                    {route.name}
                  </MenuItem>
                ))
              }
            </Select>
          </Paper>
        </Grid>
        <Grid container item md={2} alignItems="center" justify="center">
          <Button
            onClick={handleSend}
            disabled={!selectedRouteId}
            color="primary"
            variant="contained"
            size="large"
          >
            Enviar Rota
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Routes;
