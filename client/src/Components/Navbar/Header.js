import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import {
    AppBar,
    Typography,
    Toolbar,
    Avatar,
    Button
} from "@material-ui/core";

import useStyles from "./style";

import AuthContext from "../../Context/Auth/AuthContext"

const Header = () => {
    const classes = useStyles();
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
    };
    return (
        <>
            <AppBar className={
                classes.appBar
            }
                position="static"
                color="inherit">
                <div className={
                    classes.brandContainer
                }>
                    <Typography component={Link}
                        to="/"
                        className={
                            classes.heading
                        }
                        variant="h2"
                        align="center">
                        Social{" "} </Typography>
                    {/* <img
                        className={classes.image}
                        src={memories}
                        alt="icon"
                        height="40"
                    />
                   */} </div>


                <Toolbar className={
                    classes.toolbar
                }>

                    {
                        flag ? (
                            <>
                                <div className={
                                    classes.profile
                                }>

                                    <Avatar className={
                                        classes.purple
                                    }
                                        alt={
                                            localStorage.name
                                        }>
                                        {
                                            localStorage.name.charAt(0)
                                        } </Avatar>


                                    <Typography className={
                                        classes.userName
                                    }
                                        variant="h6">
                                        {
                                            localStorage.name
                                        } </Typography>


                                    <Button variant="contained"
                                        className={
                                            classes.logout
                                        }
                                        color="secondary"
                                        onClick={Exit}>
                                        Logout
                                </Button>
                                </div>
                            </>
                        ) : (
                            <Button component={Link}
                                to="/auth"
                                variant="contained"
                                color="primary">
                                Sign In
                            </Button>

                        )
                    } </Toolbar>
            </AppBar>

        </>
    )
}

export default Header
