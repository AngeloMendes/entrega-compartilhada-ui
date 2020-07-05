import React, { useState, useEffect } from 'react';
import Loading from 'images/loading.gif';
import { makeStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  loading: {
    width: 100,
  },
});

function LoadingSimulator({ redirect }) {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 900);
  }, []);

  if (loaded) return <Redirect push to={redirect} />;

  return (
    <img className={classes.loading} src={Loading} alt="Loading" />
  );
}

LoadingSimulator.propTypes = {
  redirect: PropTypes.string.isRequired,
};

export default LoadingSimulator;
