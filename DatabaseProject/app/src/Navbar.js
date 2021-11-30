import React from "react";
import { AppBar, Toolbar, CssBaseline, Typography } from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import { makeStyles } from "@mui/styles";
import { NavLink, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    display: "flex"
  },
 logo: {
    flexGrow: "1",
    cursor: "pointer",
    textAlign: "left",
    marginLeft: theme.spacing(5)
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  link: {
    textDecoration: "none",
    fontSize: "20px",
    marginLeft: theme.spacing(10),
    color: "white",
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white"
    }
  },
  active: {
    textDecoration: "none",
    fontSize: "20px",
    marginLeft: theme.spacing(10),
    borderBottom: "1px solid white"
  }
}));

function Navbar(props) {
  const classes = useStyles();
  
  // display only sign in and register if not logged in
  if(!props.isLoggedIn) {
    return (
      <AppBar position="static">
        <CssBaseline />
        <Toolbar>
          <Typography variant="h4" className={classes.logo}>
              <ArticleIcon className={classes.icon}/>
              Time Management System
          </Typography>
            <div className={classes.navlinks}>
              <NavLink to="/sign-in" activeClassName={classes.active} className={classes.link}>
                  Sign-In
              </NavLink>
              <NavLink to="/register" activeClassName={classes.active} className={classes.link}>
                  Register
              </NavLink>
            </div>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
            <ArticleIcon className={classes.icon}/>
            Time Management System
        </Typography>
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
                Home
            </Link>
            <NavLink to="/sign-in" activeClassName={classes.active} className={classes.link}>
                Sign-In
            </NavLink>
            <NavLink to="/timecard" activeClassName={classes.active} className={classes.link}>
                Timecard
            </NavLink>
            <NavLink to="/history" activeClassName={classes.active} className={classes.link}>
                History
            </NavLink>
            <NavLink to="/user" activeClassName={classes.active} className={classes.link}>
                User
            </NavLink>
          </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;