import React, { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import HomeIcon from "@material-ui/icons/Home";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import BarChartIcon from "@material-ui/icons/BarChart";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import Paper from "@material-ui/core/Paper";

import EventIcon from "@material-ui/icons/Event";
import "../App.css";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: "#558b2f",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),

    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    backgroundColor: "#fafafa",
    minHeight: "1000px",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (window.innerWidth <= 480) {
    return (
      <div>
        <AppBar position="static" style={{ backgroundColor: "#558b2f" }}>
          <Toolbar>
            <IconButton
              style={{ color: "white", transform: "scale(1.5)" }}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                {" "}
                <Link
                  style={{
                    color: "black",
                    textDecoration: "none",
                    width: "100%",
                    height: "100%",
                    padding: "10px",
                  }}
                  to="/"
                >
                  <HomeIcon /> Home
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {" "}
                <Link
                  style={{
                    color: "black",
                    textDecoration: "none",
                    width: "100%",
                    height: "100%",
                    padding: "10px",
                  }}
                  to="/customers"
                >
                  <EmojiPeopleIcon /> Customers
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {" "}
                <Link
                  style={{
                    color: "black",
                    textDecoration: "none",
                    width: "100%",
                    height: "100%",
                    padding: "10px",
                  }}
                  to="/trainings"
                >
                  <FitnessCenterIcon /> Trainings
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {" "}
                <Link
                  style={{
                    color: "black",
                    textDecoration: "none",
                    width: "100%",
                    height: "100%",
                    padding: "10px",
                  }}
                  to="/calendar"
                >
                  <EventIcon /> Calendar
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {" "}
                <Link
                  style={{
                    color: "black",
                    textDecoration: "none",
                    width: "100%",
                    height: "100%",
                    padding: "10px",
                  }}
                  to="/datastats"
                >
                  <BarChartIcon /> Data Stats
                </Link>
              </MenuItem>
            </Menu>
            <Typography
              className="TrainerLogo"
              style={{ fontFamily: "Bangers", fontSize: "25px" }}
              variant="h6"
              noWrap
            >
              <FitnessCenterIcon /> Personal Trainer
              <FitnessCenterIcon />
            </Typography>
          </Toolbar>
        </AppBar>
        {props.children}
      </div>
    );
  } else
    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(true)}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className="TrainerLogo"
              style={{ fontFamily: "Bangers", fontSize: "40px" }}
              variant="h6"
              noWrap
            >
              <FitnessCenterIcon /> Personal Trainer
              <FitnessCenterIcon />
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
          className={classes.drawer}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={() => setOpen(false)}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>

              <Link
                style={{
                  color: "black",
                  textDecoration: "none",

                  width: "100%",
                  height: "100%",
                  padding: "10px",
                }}
                to="/"
              >
                Home
              </Link>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <EmojiPeopleIcon />
              </ListItemIcon>

              <Link
                style={{
                  color: "black",
                  textDecoration: "none",
                  width: "100%",
                  height: "100%",
                  padding: "10px",
                }}
                to="/customers"
              >
                Customers
              </Link>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <FitnessCenterIcon />
              </ListItemIcon>

              <Link
                style={{
                  color: "black",
                  textDecoration: "none",
                  width: "100%",
                  height: "100%",
                  padding: "10px",
                }}
                to="/trainings"
              >
                Trainings
              </Link>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>

              <Link
                style={{
                  color: "black",
                  textDecoration: "none",
                  width: "100%",
                  height: "100%",
                  padding: "10px",
                }}
                to="/calendar"
              >
                Calendar
              </Link>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>

              <Link
                style={{
                  color: "black",
                  textDecoration: "none",
                  width: "100%",
                  height: "100%",
                  padding: "10px",
                }}
                to="/datastats"
              >
                Data Stats
              </Link>
            </ListItem>

            <Divider />
          </List>
        </Drawer>

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Paper elevation={3} style={{ padding: "25px", minHeight: "1000px" }}>
            {props.children}
          </Paper>
        </main>
      </div>
    );
};

export default Layout;
