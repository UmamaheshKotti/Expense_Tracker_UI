import { Dialog, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";
import { callGet } from "../api/Api";
import { setAppConfigs, setProcess } from "../store/AppActions";
import P from '../store/ProcessConstants';


const GetConfigs = ({ appstate, dispatch }) => {

    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token")

    const getEndPoints = async () => {

        const url = `${process.env.REACT_APP_BACKEND_URL}/endpoints/get-configs`;
        console.log(url)

        try {
            setLoading(true);
            const response = await callGet(url)
            if (response.status === 200) {
                console.log(JSON.stringify(response.data));
                dispatch(setAppConfigs(response.data));
                if(token) {
                    dispatch(setProcess(P.DASH_BOARD));
                } else {
                    dispatch(setProcess(P.DEFAULT_PAGE))
                }
            } else{
                return alert("Please Refresh the page")
            }
            setLoading(false);
        } catch (error) {
            console.log("Error while calling Configs : " , error);
            return
        }
    }


    useEffect(() => {
        getEndPoints()
    }, [])

    return (
        <div>
            <Dialog
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
        </div>
    )
}

export default GetConfigs;