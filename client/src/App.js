import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home"
import Header from "./Components/Navbar/Head"
import Auth from "./Components/Auth/Auth"
import AuthState from "./Context/Auth/AuthState";
import AuthToken from "./Context/Auth/AuthToken"




if (localStorage.token) {
  //console.log("working");
  AuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <BrowserRouter>
        <input type="checkbox" id="theme" />
        <div className="App">
          <div className="main">
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/auth" exact component={Auth} />


            </Switch>

          </div>

        </div>


      </BrowserRouter>
    </AuthState>
  );
}

export default App;
