import React, {useState} from 'react';
import {Tabs, Tab, AppBar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Input from '../Form/Input';

const useStyles = makeStyles((theme) => ({
  navBar:{
    background: '#f7f5fb',
    color: '#e36414'
  },
  root:{
    [theme.breakpoints.up("sm")]:{
      padding: 20
    }
  }
}));

const TabBar = () => {
  const classes= useStyles();
  const [value,setValue] =useState(0);
  const handleChange= (e,val) => {
      setValue(val);
  }
  return(
    <div>
      <AppBar position='static' className={classes.navBar}>
        <Tabs value={value} onChange={handleChange}>
            <Tab label="Classes"/>
            <Tab label="Courses"/>
            <Tab label="Subjects"/>
        </Tabs>         
      </AppBar>
      {
        value === 0 && <Input />
      }
      {
        value === 1 && <h1 className={classes.root}>Courses</h1>
      }
      {
        value === 2 && <h1 className={classes.root}>Subjects</h1>
      }
    </div>
  );
}


export default TabBar;