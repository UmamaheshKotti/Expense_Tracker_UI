import { Button, Dialog, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { setAppConfigs, setLoading, setProcess } from "../store/AppActions";
import { callGet } from "../api/Api";
import { GridLoader } from "react-spinners";
import P from '../store/ProcessConstants';

export const getEndPoints = async (regsiter, login, dispatch) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/endpoints/get-configs`;
    // console.log(url)
    const token = localStorage.getItem("token")

    try {
        dispatch(setLoading(true));
        const response = await callGet(url)
        if (response.status === 200) {
            // console.log(JSON.stringify(response.data));
            dispatch(setAppConfigs(response.data));
            if (token) {
                dispatch(setProcess(P.DASH_BOARD));
            }
            else {
                dispatch(setProcess(P.DEFAULT_PAGE))
            }
            if (regsiter) {
                dispatch(setProcess(P.USER_REGISTERATION))
            }
            if (login) {
                dispatch(setProcess(P.USER_LOGIN))
            }
        } else {
            return alert("Please Refresh the page")
        }
        dispatch(setLoading(false));

    } catch (error) {
        dispatch(setLoading(false));

        // console.log("Error while calling Configs : " , error);
        return
    }

}

const DefaultPage = ({ appstate, dispatch }) => {

    const goToLoginPage = () => {
        dispatch(setProcess(P.USER_LOGIN));
    }

    const goToRegistration = () => {
        dispatch(setProcess(P.USER_REGISTERATION));
    }

    return (
        <div className="defaultpage">
            <h1>
                Welcome to Expense Tracker
            </h1>
            <h4>Let's Claculate your Expenses</h4>
            <p>
                If you're new here, please <Link onClick={() => goToRegistration()} >register</Link> to get started.<br />
                Already have an account? <Link onClick={() => goToLoginPage()} >Login</Link> to continue.
            </p>
            {/* {
                loading && <Dialog
                    open={loading}
                    // onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <GridLoader
                        color="brown"
                        loading={loading}
                        size={15}
                        aria-label="Loading Spinner"
                        speedMultiplier={1}
                        className="RingLoader"
                    />
                    <DialogTitle id="alert-dialog-title">
                        Please Wait...
                    </DialogTitle>
                </Dialog>
            } */}
            {/* <br/>
            <br/>
            <Button id="defaultpagebutton">Let's Get Started</Button> */}
        </div>
    )
}

export default DefaultPage;