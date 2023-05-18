// LandingPage.js
import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => (
  <div>
    <h1>Welcome to the Healthcare Tracking App</h1>
    <p>Track and manage your health easily.</p>
    {/* Add more content here */}
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
    <p>About page content...</p>
  </div>
);

const Services = () => (
  <div>
    <h2>Services</h2>
    <p>Services page content...</p>
  </div>
);

const Contact = () => (
  <div>
    <h2>Contact</h2>
    <p>Contact page content...</p>
  </div>
);

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/contact" component={Contact} />
      </Switch>
    </div>
  );
};

export default LandingPage;
