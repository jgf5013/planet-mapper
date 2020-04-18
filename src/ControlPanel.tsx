import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { AXIS_OPTIONS } from './App.constants';
import { AxisOption } from './AxisOption.interface';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);


export function ControlPanel() {

  const [xAxis, setXAxis] = React.useState('');

  const handleAxisChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setXAxis(event.target.value as string);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>

      <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">X Axis</InputLabel>
          <Select
            labelId="x-axis-select-label"
            id="x-axis-select"
            value="xAxis"
            onChange={handleAxisChange}>
              {AXIS_OPTIONS.map((axis) => (
              <MenuItem key={axis.key} value={axis.key}>{axis.label}</MenuItem>
              ))}
          </Select>
      </FormControl>
    </div>
  );
}

export default ControlPanel;

 
 