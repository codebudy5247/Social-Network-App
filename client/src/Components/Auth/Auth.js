import React, { useContext, useState } from "react";
import useStyles from "./style";
import Input from "./input";

import Nav from "../Navbar/Header"

import AuthContext from "../../Context/Auth/AuthContext"

import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const initialState = {
    name: "",
    email: "",
    password: "",
    avatar: "",
    username: ""
};


const Auth = () => {
    const classes = useStyles();

    const authContext = useContext(AuthContext);
    //console.log(authContext);
    const { register, login } = authContext

    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setisSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const history = useHistory();


    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(formData);
        if (isSignup) {
            register(formData, history);
        } else {
            login(formData, history);
        }
    };
    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const switchMode = () => {
        setisSignup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false);
    };
    return (
        <>
         
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}></Avatar>
                    <Typography component="h1" variant="h5">
                        {isSignup ? "Sign up" : "Sign in"}
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {isSignup && (
                                <>
                                    <Input
                                        name="name"
                                        label="Name"
                                        handleChange={handleChange}
                                        autoFocus
                                    />
                                    <Input
                                        name="username"
                                        label="UserName"
                                        handleChange={handleChange}
                                        autoFocus
                                    />
                                </>
                            )}
                            <Input
                                name="email"
                                label="Email Address"
                                handleChange={handleChange}
                                type="email"
                            />

                            <Input
                                name="password"
                                label="Password"
                                handleChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                handleShowPassword={handleShowPassword}
                            />

                            {/*{isSignup && (
<Input
name="confirmPassword"
label="Repeat Password"
handleChange={handleChange}
type="password"
/>
)}*/}
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {isSignup ? "Sign Up" : "Sign In"}
                        </Button>
                        {/* 
<GoogleAuth />
<LinkedinAuth /> */}
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignup
                                        ? "Already have an account? Sign in"
                                        : "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default Auth
