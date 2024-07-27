import React, { useState } from "react";
import { callPost } from "../api/Api";
import GridLoader from "react-spinners/GridLoader";
import { setLoading, setProcess } from "../store/AppActions";
import P from '../store/ProcessConstants'

const UserRegistration = ({ appstate, dispatch }) => {

    const [userName, setUserName] = useState(String);
    const [email, setEmail] = useState(String);
    const [password, setPassword] = useState(String);
    const [confirmPassword, setConfirmPassword] = useState(String);


    const handleUsername = (e) => {
        setUserName(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleRegistration = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Password you entered is not matching ");
            return;
        }
        let userRegisterUrl = `${appstate.appConfigs.appEndPoints.BACKEND_URL}/user/register`;
        let request = {
            userName: userName,
            email: email,
            password: password
        }

        try {
            dispatch(setLoading(true))
            const response = await callPost(userRegisterUrl, request);
            if (response.status === 200) {
                console.log(response.data.message)
                alert(response.data.message);
                dispatch(setProcess(P.USER_LOGIN))
            } else if(response.response.status === 500) {
                alert("Email Already Taken")
            }
             else {
                alert("Bad Request")
            }
            dispatch(setLoading(false))


        } catch (error) {
            console.log(" unexpected error occured when trying to register : ", error);
            return

        }
    }


    return (
        <>
            <div className="register-form">
                <form onSubmit={(e) => handleRegistration(e)}>
                    <h2>Register</h2>
                    <div className="userauth" >
                        <label>User Name</label><br />
                        <input
                            required
                            name="Username"
                            type="text"
                            value={userName}
                            onChange={(e) => handleUsername(e)}
                            placeholder="Enter your Name" /><br />
                        <label>Email</label><br />
                        <input
                            required
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => handleEmail(e)}
                            placeholder="Enter your email" /><br />
                        <label>Password</label><br />
                        <input
                            required
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => handlePassword(e)}
                            placeholder="Enter your password" /><br />
                        <label>Confirm Password</label><br />
                        <input
                            required
                            name="password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => handleConfirmPassword(e)}
                            placeholder="Enter the password again" />
                    </div>
                    <div>
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UserRegistration;