import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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

function OrderTab({ route }) {
  return (
    <Grid container style={{ padding: 15 }}>
      <Typography variant="h6">Detalhes da Entrega</Typography>

      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Pedido</TableCell>
            <TableCell>Coleta</TableCell>
            <TableCell>Entrega</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {route.orders.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>
                <Typography variant="caption">
                  {row.collectAddress}
                </Typography>
              </TableCell>
              <TableCell>{row.deliveryAddress}</TableCell>
              <TableCell style={{ whiteSpace: 'nowrap', color: getStatusColor(row.status) }}>
                {getStatusLabel(row.status)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  );
}

OrderTab.propTypes = {
  route: RoutePropType.isRequired,
};

export default OrderTab;
