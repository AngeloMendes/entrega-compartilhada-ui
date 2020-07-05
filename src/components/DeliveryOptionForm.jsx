import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import { DeliveryTypes } from 'constants/enums';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

function DeliveryOptionForm() {
  const [deliveryOption, setDeliveryOption] = useState(null);

  const handleDeliveryType = (e) => {
    const { value } = e.target;
    setTimeout(() => {
      setDeliveryOption(value);
    }, 500);
  };

  if (deliveryOption === DeliveryTypes.OWN_DELIVERY) {
    return <Redirect push to="/rotas" />;
  }

  if (deliveryOption === DeliveryTypes.THIRD_DELIVERY) {
    return <Redirect push to="/pagamento" />;
  }

  return (
    <>
      <Grid container style={{ marginTop: 30 }} justify="center">
        <Typography color="textSecondary" variant="h5">Como você deseja realizar a entrega?</Typography>

      </Grid>
      <Grid container style={{ marginTop: 20 }} justify="center">
        <FormGroup row>
          <FormControlLabel
            control={(
              <Radio
                color="primary"
                value={DeliveryTypes.OWN_DELIVERY}
                onChange={handleDeliveryType}
              />
            )}
            label="Enviar pelo meu entregador"
          />
          <FormControlLabel
            control={(
              <Radio
                color="primary"
                value={DeliveryTypes.THIRD_DELIVERY}
                onChange={handleDeliveryType}
              />
            )}
            label="Preciso de um entregador"
          />
        </FormGroup>

      </Grid>
    </>
  );
}

export default DeliveryOptionForm;
