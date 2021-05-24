import React, { useState } from "react";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CssBaseline
} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import ContactIcon from '@material-ui/icons/Phone';
import classNames from 'classnames';

import useStyles from './styles';
import TabBar from "./TabBar";



const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <div className={classNames({ [classes.rootShift]: !open })}>
      <CssBaseline />
      <Drawer onMouseOver ={() => setOpen(true)} onMouseLeave={()=> setOpen(false)} open={open} onClose={() => setOpen(false)} variant="permanent">
        <div className={classes.toolbar} />
        <List
          disablePadding
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
        >
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ContactIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </Drawer>
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, { [classes.appBarShift]: open })}
      >
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            CoinStorey App
          </Typography>
          <Button variant="contained" color="secondary" className={classes.btn}>Login</Button>
        </Toolbar>
      </AppBar>

      <main
        className={classNames(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.toolbar} />
        <TabBar />
      </main>
    </div>
  );
};

export default Header;