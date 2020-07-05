import React, { useRef, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MapsService from 'services/maps';

const useStyles = makeStyles({
  paper: {
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginRight: 10,
  },
});

function MapSearch({
  value,
  mapsService,
  onSelect,
  placeholder,
  onChangeAddress,
}) {
  const classes = useStyles();
  const inputRef = useRef(null);

  useEffect(() => {
    const autoCompleteCallback = (position, address) => {
      onSelect(position);
      onChangeAddress(address);
    };

    mapsService.autoComplete(inputRef.current, autoCompleteCallback);
  }, [mapsService, onSelect, onChangeAddress]);

  const handleKeyPress = (event) => {
    if (event.which === 13) event.preventDefault();
  };

  return (
    <Paper className={classes.paper}>
      <TextField
        value={value}
        fullWidth
        autoComplete="no"
        inputRef={inputRef}
        className={classes.input}
        InputProps={{
          onKeyPress: handleKeyPress,
          autoComplete: 'no',
          disableUnderline: true,
        }}
        placeholder={placeholder}
      />
      <SearchIcon color="action" />
    </Paper>
  );
}

MapSearch.propTypes = {
  value: PropTypes.string.isRequired,
  mapsService: PropTypes.objectOf(MapsService).isRequired,
  onSelect: PropTypes.func.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

MapSearch.defaultProps = {
  placeholder: '',
};

export default MapSearch;
