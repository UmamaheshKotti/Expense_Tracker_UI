import React, { useState } from "react";
import { callPost, callPut } from "../api/Api";
import GridLoader from "react-spinners/GridLoader";
import { setLoading, setProcess } from "../store/AppActions";
import P from '../store/ProcessConstants'

const EditUser = ({ appstate, dispatch }) => {

    const [userName, setUserName] = useState(String);
    const [email, setEmail] = useState(String);
    const [password, setPassword] = useState(String);
    // const [confirmPassword, setConfirmPassword] = useState(String);
    let userDetails = appstate.userDetails;


    const handleUsername = (e) => {
        setUserName(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    // const handleConfirmPassword = (e) => {
    //     setConfirmPassword(e.target.value)
    // }

    const handleEditUser = async (e) => {
        e.preventDefault();

        // if (password !== confirmPassword) {
        //     alert("Password you entered is not matching ");
        //     return;
        // }
        let userEditUrl = `${appstate.appConfigs.appEndPoints.BACKEND_URL}/user/update-user/${userDetails._id}`;
        let request = {
            userName: userName,
            email: email,
            password: password
        }

        try {
            dispatch(setLoading(true))
            const response = await callPut(userEditUrl, request);
            if (response.status === 200) {
                console.log(response.data)
                alert(response.data.message);
                dispatch(setProcess(P.USER_DETAILS))
            } else if (response.response.status === 404) {
                alert("Incorrect Password")
            }
            else {
                alert("Bad Request")
            }
            dispatch(setLoading(false))


        } catch (error) {
            console.log(" unexpected error occured when trying to edit user : ", error);
            return

        }
    }


    return (
        <>
            <div className="edituser-form">
                <form onSubmit={(e) => handleEditUser(e)}>
                    <h2>Edit User</h2>
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
                        {/* <label>Confirm Password</label><br />
                        <input
                            required
                            name="password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => handleConfirmPassword(e)}
                            placeholder="Enter the password again" /> */}
                    </div>
                    <div>
                        <button type="submit">Edit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditUser;