import React from "react";
import { AppBar, Toolbar, CssBaseline, Typography, Button } from "@mui/material";
import { makeStyles, withThemeCreator } from "@mui/styles";
import { NavLink, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    display: "flex"
  },
 logo: {
    flexGrow: "1",
    cursor: "pointer"
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

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          TMS
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
            <NavLink to="/register" activeClassName={classes.active} className={classes.link}>
                Register
            </NavLink>
          </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;