// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Healthcare Tracking App
        </Typography>
        <Button component={Link} to="/about" color="inherit">
          About
        </Button>
        <Button component={Link} to="/services" color="inherit">
          Services
        </Button>
        <Button component={Link} to="/contact" color="inherit">
          Contact
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
