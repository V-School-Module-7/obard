// App.js
//===============================

// imports
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./assets/css/base.css";
  // shared files
import Header from "./components/user/shared/Header";
  // // import Footer from "./components/user/Footer";
  // landing files
import Auth from "./Auth.js";
  // Home / Checkout / Confirmation / Profile
import Home from "./components/user/Home"; // within this component is Date Select and PilotUpload
import CheckoutContainer from "./components/user/Checkout"
import Profile from "./components/user/Profile"


import Confirmation from "./components/user/Confirmation"

import { withUser } from "./components/context/OldUserProvider.js";
import { StripeProvider, Elements } from 'react-stripe-elements'

// component
class App extends Component {

  constructor() {
    super();
    this.state = { stripe: null }
  }

  componentDidMount() {
    // asyncronous check for Stripe from the window mount

    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe(
          process.env.REACT_APP_PUBLISHABLE_TEST_APIKEY
          || process.env.REACT_APP_PUBLISHABLE_LIVE_APIKEY)
      });
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({
          stripe: window.Stripe(
            process.env.REACT_APP_PUBLISHABLE_TEST_APIKEY
            || process.env.REACT_APP_PUBLISHABLE_LIVE_APIKEY)
        });
      });
    }
  }

  render() {
    const { token } = this.props;
    console.log(token)
    console.log(this.props)
    return (
      <StripeProvider stripe={this.state.stripe} >
        <Elements>
          <div>
            <Header />
            <Switch>
              {/* <Route exact path='/' component={Home} /> */}

              <Route exact path="/" render={rProps => <Home {...rProps} />} />
              <Route
                path="/auth"
                render={rProps =>
                  token ? <Redirect to="/" /> : <Auth {...rProps} />
                }
              />
              <Route
                path="/checkout"
                render={rProps =>
                  token ? <Redirect to="/" /> : <CheckoutContainer />
                }
              />
              <Route
                path="/confirmation"
                render={rProps =>
                  token ? <Redirect to="/" /> : <Confirmation />
                }
              />
              <Route 
                path="/profile"
                render={rProps =>
                  token ? <Redirect to="/" /> : <Profile />
                }
              />
            </Switch>
          </div>
        </Elements>
      </StripeProvider>
    );
  }
}

// export
export default withUser(App);
