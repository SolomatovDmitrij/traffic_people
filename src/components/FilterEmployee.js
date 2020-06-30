import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
    
  const classes = useStyles();
//  const [unit, setUnit] = React.useState('');

  const handleChangeChild = (event) => {
    handleChange(event.target.value);
  };

 const {units, unit, handleChange, filter_name} = props;

  return (
    <div>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">{filter_name}</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={unit}
          onChange={handleChangeChild}
        >
          <MenuItem key='' value="">
            <em>Все</em>
          </MenuItem>
      {units.map(x=>
         <MenuItem key={x} value={x}>{x}</MenuItem>
      )}
        </Select>
      </FormControl>
    </div>
  );
}

