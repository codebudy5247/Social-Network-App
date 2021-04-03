import React, { useContext } from 'react'
import { Link, useHistory } from "react-router-dom"
import {
  Button
} from "@material-ui/core";


import AuthContext from "../../Context/Auth/AuthContext"

const Head = () => {


  const navLinks = [
    { label: 'Home', icon: 'home', path: '/' },
    { label: 'Message', icon: 'near_me', path: '/message' },
    { label: 'Discover', icon: 'explore', path: '/discover' },
    { label: 'Notify', icon: 'favorite', path: '/notify' }
  ]


  const history = useHistory();
  const authContext = useContext(AuthContext);
  const { user, isAuthenticated, logout } = authContext;
  console.log(user, isAuthenticated);


  let flag = null;
  if (localStorage.token) {
    flag = true;
  } else {
    flag = false;
  }
  const Exit = () => {
    logout(history);
  }


  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Social-Network</a>

        {flag ? (
          <div class="menu">
            <ul class="navbar-nav flex-row">
              {
                navLinks.map((link, index) => (
                  <li class="nav-item">
                    <Link class="nav-link active" aria-current="page" to={link.path}>
                      <span class="material-icons">
                        {link.icon}
                      </span>
                    </Link>
                  </li>
                ))
              }


              <li class="nav-item dropdown">
                <span class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 {localStorage.name}
            </span>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link class="dropdown-item" to={`/profile`}>Profile</Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to={`/`}>Dark Mode</Link>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <Link class="dropdown-item" to={`/`}>
                      <Button variant="contained"


                        onClick={Exit}>
                        Logout
                   </Button>
                    </Link>
                  </li>
                </ul>
              </li>

            </ul>

          </div>
        ) : (
          <Button component={Link}
            to="/auth"
            variant="contained"
            color="primary">
            Sign In
          </Button>
        )}

      </div>
    </nav>
  )
}

export default Head
