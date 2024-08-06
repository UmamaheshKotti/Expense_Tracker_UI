import React, { useState } from "react";
import { callPost } from "../api/Api";
import { setLoading, setProcess, setUserToken } from "../store/AppActions";
import P from '../store/ProcessConstants';
import { jwtDecode } from 'jwt-decode';
import { Link } from "react-router-dom";


const UserLogin = ({ appstate, dispatch }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        let request = {
            email: email,
            password: password
        }

        // const loginUrl = process.env.REACT_APP_API_URL;
        // const securityKey = process.env.REACT_APP_SECCRET_KEY;
        // console.log(securityKey, loginUrl)
        const loginUrl = `${appstate.appConfigs.appEndPoints.BACKEND_URL}/user/login`;
        try {
            dispatch(setLoading(true))
            const response = await callPost(loginUrl, request);
            if (response.status === 200) {
                let token = response.data.token;
                // console.log(JSON.stringify(response.data))
                dispatch(setUserToken(token));
                localStorage.setItem("token", token);
                if (token) {
                    const userId = jwtDecode(token);
                    // console.log(userId)
                    localStorage.setItem("userId", userId.userId)
                }
                alert(response.data.message)
                dispatch(setProcess(P.DASH_BOARD));
            } else {
                alert("Incorrect Email or Password")
                setEmail("")
                setPassword("")
            }
            dispatch(setLoading(false))

        } catch (error) {
            console.log("error", JSON.stringify(error))
            return error;

        }
    }

    const goToForgotPassword = (e) => {
        e.preventDefault()
        dispatch(setProcess(P.CHANGE_PASSWORD))
    }



    return (
        <div className="login-form">
            <form onSubmit={(e) => handleLogin(e)}>
                <h2>Login</h2>
                <div className="userauth" >
                    <label id="email">Email</label><br />
                    <input
                        required={true}
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => handleEmail(e)}
                        placeholder="Enter your email" /><br />
                    <label id="password">Password</label><br />
                    <input
                        required={true}
                        type="password"
                        name="password"
                        value={password} onChange={(e) => handlePassword(e)}
                        placeholder="Enter your password" />
                </div>
                <div>
                    <button className="loginbutton" type="submit">Login</button>
                    <Link className="forgotpassword" onClick={(e) => goToForgotPassword(e)} >Forgot Password?</Link>
                </div><br/>
            </form>
        </div>
    )
}

export default UserLogin;