import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { DeliveryStatus } from 'constants/enums';
import RoutePropType from 'propTypes/route';

const getStatusLabel = (status) => {
  if (status === DeliveryStatus.ACTIVE) {
    return 'em Andamento';
  }
  return 'Concluída';
};

const getStatusColor = (status) => {
  if (status === DeliveryStatus.ACTIVE) {
    return '#428BF9';
  }
  return '#707070';
};

function OrderTabLabel({ route }) {
  return (
    <>
      <Grid container>
        <Grid item container md={6} alignItems="center">
          <Typography variant="body2">
            <strong>Entrega</strong>
            {' '}
          </Typography>
          <Typography variant="body2">{route.id}</Typography>
        </Grid>
        <Grid item container md={6} alignItems="center">
          <Typography variant="body2" style={{ color: getStatusColor(route.status) }}>
            <strong>
              Entrega
              {' '}
              {getStatusLabel(route.status)}
            </strong>
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item container md={6} alignItems="center">
          <Typography variant="body2">
            <strong>Entregador</strong>
            {' '}
          </Typography>
          <Typography variant="body2">{route.name}</Typography>
        </Grid>
        <Grid item container md={6} alignItems="center">
          <Typography variant="body2">{route.info}</Typography>
        </Grid>
      </Grid>
    </>
  );
}

OrderTabLabel.propTypes = {
  route: RoutePropType.isRequired,
};

export default OrderTabLabel;
