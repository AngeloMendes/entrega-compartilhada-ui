import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { TextField, Paper, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import MapsService from 'services/maps';
import MapSearch from './MapSearch';

const useStyles = makeStyles({
  row: {
    marginTop: 20,
  },
  input: {
  },
  paper: {
    marginLeft: 10,
    padding: '10px 20px',
    alignItems: 'center',
  },
});

function AddressForm({ mapsService, onFinish }) {
  const [collectPosition, setCollectPosition] = useState();
  const [collectAddress, setCollectAddress] = useState({ street_number: '', complement: '' });
  const [deliveryPosition, setDeliveryPosition] = useState();
  const [deliveryAddress, setDeliveryAddress] = useState({ street_number: '', complement: '' });

  const classes = useStyles();

  const handleCollectAddressAttribute = useCallback((attribute) => (e) => {
    setCollectAddress({
      ...collectAddress, [attribute]: e.target.value,
    });
  }, [collectAddress]);

  const handleDeliveryAddressAttribute = useCallback((attribute) => (e) => {
    setDeliveryAddress({
      ...deliveryAddress, [attribute]: e.target.value,
    });
  }, [deliveryAddress]);

  const handleCalculateRoute = useCallback(() => {
    mapsService.cleanRoutes();
    mapsService.createRoute(collectPosition, deliveryPosition);
    onFinish();
  }, [collectPosition, deliveryPosition, mapsService, onFinish]);

  return (
    <>
      <Grid container justify="center" className={classes.row}>
        <Grid container item md={6}>
          <MapSearch
            placeholder="Endereço  de coleta"
            mapsService={mapsService}
            onSelect={setCollectPosition}
            onChangeAddress={setCollectAddress}
          />
        </Grid>
        <Paper className={classes.paper}>
          <TextField
            onChange={handleCollectAddressAttribute('street_number')}
            value={collectAddress.street_number}
            InputProps={{ disableUnderline: true }}
            label="Numero"
          />
        </Paper>
        <Paper className={classes.paper}>
          <TextField
            onChange={handleCollectAddressAttribute('complement')}
            value={collectAddress.complement}
            InputProps={{ disableUnderline: true }}
            label="Complemento"
          />
        </Paper>
      </Grid>

      <Grid container justify="center" className={classes.row}>
        <Grid container item md={6}>
          <MapSearch
            placeholder="Endereço de entrega"
            mapsService={mapsService}
            onSelect={setDeliveryPosition}
            onChangeAddress={setDeliveryAddress}
          />
        </Grid>
        <Paper className={classes.paper}>
          <TextField
            onChange={handleDeliveryAddressAttribute('street_number')}
            value={deliveryAddress.street_number}
            InputProps={{ disableUnderline: true }}
            label="Numero"
          />
        </Paper>
        <Paper className={classes.paper}>
          <TextField
            onChange={handleDeliveryAddressAttribute('complement')}
            value={deliveryAddress.complement}
            InputProps={{ disableUnderline: true }}
            label="Complemento"
          />
        </Paper>
      </Grid>

      <Grid container style={{ marginTop: 30 }} justify="center">
        <Button
          disabled={!(collectPosition && deliveryPosition)}
          onClick={handleCalculateRoute}
          variant="contained"
          color="primary"
          size="large"
        >
          Calcular Rota
        </Button>
      </Grid>
    </>
  );
}

AddressForm.propTypes = {
  mapsService: PropTypes.objectOf(MapsService).isRequired,
  onFinish: PropTypes.func.isRequired,
};

export default AddressForm;
