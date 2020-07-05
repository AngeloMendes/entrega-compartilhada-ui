import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import AppBarBG from '../images/appbar_background.png';
import DrawerBg from '../images/drawer_background.png';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#EEEEEE',
  },
  appBar: {
    boxShadow: '0 1px 0 0 rgba(0,0,0,.1)',
    backgroundColor: '#FFF159',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url('${AppBarBG}')`,
    height: 100,
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    paddingTop: 105,
    backgroundOrigin: 'content-box',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundImage: `url('${DrawerBg}')`,
    backgroundColor: '#F5F5F5',
    border: 'none',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  },
}));

export default function Dashboard({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar elevation={0} position="absolute" className={classes.appBar} />
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        open
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
      </main>
    </div>
  );
}

Dashboard.defaultProps = {
  children: null,
};

Dashboard.propTypes = {
  children: PropTypes.node,
};
