import React, { useState, useCallback, useMemo } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  makeStyles, withStyles, Grid, Button, fade, Typography,
} from '@material-ui/core';
import OrderTabLabel from 'components/OrderTabLabel';
import { DeliveryStatus } from 'constants/enums';
import OrderTab from 'components/OrderTab';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const routes = [
  {
    id: 'ML5367GKB12',
    name: 'Tércio Ribeiro',
    info: 'Saída ás 9h 30 min',
    status: DeliveryStatus.ACTIVE,
    orders: [
      {
        id: 'ML5367GKB13',
        collectAddress: 'Av. Juscelino Kubitschek Barbosa Lage - JF/MG',
        deliveryAddress: 'R. Diva García - Linhares, Juiz de Fora - MG',
        status: DeliveryStatus.ACTIVE,
      },
      {
        id: 'ML5367GKB19',
        collectAddress: 'Av. Juscelino Kubitschek Barbosa Lage - JF/MG',
        deliveryAddress: 'R. Diva García - Linhares, Juiz de Fora - MG',
        status: DeliveryStatus.ACTIVE,
      },
    ],
  },
  {
    id: 'ML5367GLR92',
    name: 'Bruna Varoto',
    info: 'Saída ás 9h 30 min',
    status: DeliveryStatus.ACTIVE,
    orders: [
      {
        id: 'ML5367GKB13',
        collectAddress: 'Av. Juscelino Kubitschek Barbosa Lage - JF/MG',
        deliveryAddress: 'R. Diva García - Linhares, Juiz de Fora - MG',
        status: DeliveryStatus.ACTIVE,
      },
      {
        id: 'ML5367GKB19',
        collectAddress: 'Av. Juscelino Kubitschek Barbosa Lage - JF/MG',
        deliveryAddress: 'R. Diva García - Linhares, Juiz de Fora - MG',
        status: DeliveryStatus.ACTIVE,
      },
    ],
  },
  {
    id: 'ML536T9KB02',
    name: 'Angelo Gimênes',
    info: 'Saída ás 9h 30 min',
    status: DeliveryStatus.FINISHED,
    orders: [
      {
        id: 'ML5367GKB13',
        collectAddress: 'Av. Juscelino Kubitschek Barbosa Lage - JF/MG',
        deliveryAddress: 'R. Diva García - Linhares, Juiz de Fora - MG',
        status: DeliveryStatus.FINISHED,
      },
      {
        id: 'ML5367GKB19',
        collectAddress: 'Av. Juscelino Kubitschek Barbosa Lage - JF/MG',
        deliveryAddress: 'R. Diva García - Linhares, Juiz de Fora - MG',
        status: DeliveryStatus.FINISHED,
      },
    ],
  },
];

const useStyles = makeStyles((theme) => ({
  appBarTitle: {
    color: '#888',
    marginRight: 10,
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 500,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: '50%',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.9),
    marginRight: theme.spacing(2),
    marginLeft: 0,
  },
  searchIcon: {
    color: '#888',
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: '#000',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledTab = withStyles((theme) => ({
  root: {
    whiteSpace: 'break-spaces',
    width: '100%',
    maxWidth: '100%',
    textTransform: 'none',
    borderBottom: '1px solid #707070',
    fontSize: theme.typography.pxToRem(15),
  },
// eslint-disable-next-line react/jsx-props-no-spreading
}))((props) => <Tab disableRipple {...props} />);

function Orders() {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTerm = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const filteredRoutes = useMemo(() => routes.filter(
    (route) => (
      route.name.toLowerCase().includes(searchTerm.toLowerCase())
      || route.id.includes(searchTerm.toUpperCase())
    ),
  ), [searchTerm]);

  return (
    <>
      <AppBar position="relative" elevation={0} style={{ background: '#EDEBE8' }}>
        <Toolbar variant="regular">
          <Typography variant="body1" className={classes.appBarTitle}>Entregas</Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Buscar..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={searchTerm}
              onChange={handleSearchTerm}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <Tabs
          indicatorColor="primary"
          value={activeTab}
          onChange={(_event, index) => setActiveTab(index)}
          orientation="vertical"
          variant="scrollable"
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          {
          filteredRoutes.map((route) => (
            <StyledTab
              key={route.id}
              label={<OrderTabLabel route={route} />}
            >
              <OrderTab route={route} />
            </StyledTab>
          ))
          }
        </Tabs>
        {
        routes.map((route, index) => (
          <div key={route.id}>
            {index === activeTab && <OrderTab route={route} />}
          </div>
        ))
      }
      </div>
      <Grid container style={{ marginTop: 30 }} justify="center">
        <Button component={Link} to="/" size="large" variant="contained" color="primary">
          Nova entrega
        </Button>
      </Grid>
    </>
  );
}

export default Orders;
