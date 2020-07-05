import React, { useState } from 'react';
import {
  makeStyles, Grid, Typography, Button,
} from '@material-ui/core';
import MercadoPagoLogo from 'images/mercado_pago.png';
import LoadingSimulator from 'components/LoadingSimulator';

const useStyles = makeStyles({
  logo: {
    height: 250,
  },
  container: {
    padding: '30px',
    backgroundColor: '#F5F5F5',
  },
  totalRow: {
    marginTop: 20,
  },
  logoColumn: {
    borderRight: '1px solid #6D6D6D',
  },
  detailColumn: {
    padding: 5,
    paddingLeft: '10%',
  },
  detailRow: {
    paddingBottom: 5,
    marginTop: 10,
    borderBottom: '1px solid #6D6D6D',
  },
  info: {
    marginTop: 20,
  },
  bottom: {
    marginTop: 30,
  },
});

function Payment() {
  const classes = useStyles();
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
  };

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item md={4} container justify="center" className={classes.logoColumn}>
          <img
            className={classes.logo}
            src={MercadoPagoLogo}
            alt="Logo Mercado Pago"
          />
        </Grid>
        <Grid item md={8} justify="flex-start" className={classes.detailColumn}>
          <Grid container md={8} justify="space-between" className={classes.detailRow}>
            <Typography variant="body1" color="textSecondary">
              <strong>Produto</strong>
            </Typography>
            <Typography variant="body1" color="textSecondary">
              ML5367GKB12
            </Typography>
          </Grid>
          <Grid container md={8} justify="space-between" className={classes.detailRow}>
            <Typography variant="body1" color="textSecondary">
              <strong>Envio</strong>
            </Typography>
            <Typography variant="body1" color="textSecondary">
              03/07/2020
            </Typography>
          </Grid>
          <Grid container md={8} justify="space-between" className={classes.totalRow}>
            <Typography variant="body1" color="textSecondary">
              <strong>Você pagará</strong>
            </Typography>
            <Typography variant="body1" color="textSecondary">
              R$ 8,00
            </Typography>
          </Grid>
        </Grid>
        <Grid item container md={12} justify="center" className={classes.info}>
          <Typography variant="h6" color="textSecondary">
            Esta cobrança será efetuada da sua conta no mercado pago
          </Typography>
        </Grid>
      </Grid>
      <Grid item container justify="center" className={classes.bottom}>
        {
          confirmed
            ? <LoadingSimulator redirect="/pedidos" />
            : (
              <Button
                onClick={handleConfirm}
                size="large"
                color="primary"
                variant="contained"
              >
                Confirmar pagamento
              </Button>
            )
        }
      </Grid>
    </>
  );
}

export default Payment;
