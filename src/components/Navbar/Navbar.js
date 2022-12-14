import React from "react";

import {
  Container,
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  Button,
} from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import MemoriesLogo from "../../images/memories-Logo.png";
import MemoriesText from "../../images/memories-Text.png";

import useStyles from "./style";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  console.log("Profile from the localStorage====>>>>", user);

  //Setting the value of user to the login member when the page loads
  React.useEffect(() => {
    const token = user?.token;

    //jwt authentication will go here
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken * 1000 > new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    navigate("/auth");
    setUser(null);
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        {/* <Typography
            component={Link}
            to="/"
            className={classes.heading}
            variant="h2"
            align="center"
          >
            Memories
          </Typography> */}
        <img src={MemoriesText} alt="icon" height="45" />
        <img
          className={classes.image}
          src={MemoriesLogo}
          alt="memories"
          height="45"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result?.name}
              src={user?.result?.imageUrl}
            >
              {user?.result?.name.charAt(0)}
            </Avatar>
            <Typography
              style={{ color: "purple" }}
              className={classes.userName}
              variant="h6"
            >
              {user?.result?.name}
              {console.log("UserName ===>>>>", user?.result?.name)}
            </Typography>
            <Button
              className={classes.logout}
              variant="contained"
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
