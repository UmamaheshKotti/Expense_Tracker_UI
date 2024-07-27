import React, { useEffect } from "react";
import { resetState, setLoading, setProcess, setUserDetails } from "../store/AppActions";
import { callDelete, callGet } from "../api/Api";
import P from '../store/ProcessConstants';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material";

const UserDetails = ({ appstate, dispatch }) => {

    let userDetails = appstate.userDetails;

    const getUserDetails = async () => {
        let userId = localStorage.getItem("userId")
        let userDetailsUrl = `${appstate.appConfigs.appEndPoints.BACKEND_URL}/user/getuser/${userId}`

        try {
            dispatch(setLoading(true));
            const response = await callGet(userDetailsUrl);
            if (response.status === 200) {
                dispatch(setUserDetails(response.data));
                console.log("userDetails ", JSON.stringify(response.data))
                // dispatch(setProcess(P));
            }
            dispatch(setLoading(false));

        } catch (error) {
            console.log("error while getting the userDetails", error)
        }
    }

    useEffect(() => {
        getUserDetails();
    }, [])

    const handleEditUser = () => {
        dispatch(setProcess(P.EDIT_USER));
    }

    const handleDeleteUser = async () => {
        const result = window.confirm("Are you sure!! want to Delete Account??");
        const deleteUserUrl = `${appstate.appConfigs.appEndPoints.BACKEND_URL}/user/delete-user/${userDetails._id}`;
        if (result) {

            try {
                const response = await callDelete(deleteUserUrl);
                if (response.status === 200) {
                    console.log(JSON.stringify(response.data))
                    alert("Account Deleted Successfully");
                    dispatch(resetState())
                    localStorage.clear()
                    dispatch(setProcess(""))
                } else {
                    console.log(response)
                    alert("Something Wrong")
                }

            } catch (error) {
                console.log(error);
                return
            }
        }
    }

    return (
        <div className="userdetails" >
            {
                !appstate.loading && userDetails != undefined && Object.keys(userDetails).length > 0 && (
                    <div >
                        <div className="userdetails-1">
                            <h3>Welcome {userDetails.userName}</h3>
                            <p className="editicon" ><EditIcon onClick={() => handleEditUser()} /></p>
                        </div>
                        <div className="userdetails-2" >
                            <p>
                                UserName: {userDetails.userName}
                            </p>
                            <p>
                                Email: {userDetails.email}
                            </p>
                            <br /><br />
                            <Button className="deleteaccount" onClick={() => handleDeleteUser()} >Delete Account</Button>

                        </div>
                    </div>

                )
            }
        </div>
    )
}

export default UserDetails;