import React, { useReducer } from 'react'
import { ContextDevTool } from 'react-context-devtool';

import axios from "axios";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import { AUTH, LOGOUT } from "../Constants/userConstants"
import { NOTIFY } from "../Constants/notifyConstants"

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        user: null,
        loading: true
    };
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Login User
    const login = async (formData, history) => {
        try {

            dispatch({
                type: NOTIFY, payload: { loading: true }
            })
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const { data } = await axios.post("http://localhost:5000/api/users/signin", formData, config);
            dispatch({ type: AUTH, payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data))
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    };


    // Register User
    const register = async (formData, history) => { // console.log(formData);
        try {


            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const res = await axios.post("http://localhost:5000/api/users/signup", formData, config);
            console.log(res.data)
            dispatch({ type: AUTH, payload: res.data })
            localStorage.setItem('userInfo', JSON.stringify(res.data))
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    // Logout User
    const logout = (history) => {
        dispatch({ type: LOGOUT })
        history.push("/auth");
    }

    return (<AuthContext.Provider value={
        {
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            register,
            login,
            logout

        }
    }>
        <ContextDevTool
            context={AuthContext}
            id="uniqContextId"
            displayName="Auth"
        />


        {
            props.children
        } </AuthContext.Provider>);


}


export default AuthState
