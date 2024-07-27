import React, { useEffect } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import MainContent from "../main/MainContent";
import { useDispatch, useSelector, useStore } from "react-redux";
import { setAppConfigs, setLoading } from "../store/AppActions";
import GridLoader from "react-spinners/GridLoader";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";




const Home = () => {
    const appstate = useSelector((state) => state.appstate);
    const dispatch = useDispatch();
    const appConfigs = require("../AppConfigs/AppEndPoints.json");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setAppConfigs(appConfigs))
    }, [])

    // const handleClose = () => {
    //     dispatch(setLoading(false))
    // }
    return (
        <>
            <NavBar dispatch={dispatch} token={token} navigate={navigate} />
            <div className='app-sidebar-maincontent'>
                <SideBar appstate={appstate} dispatch={dispatch} token={token} />
                <div className="maincontent" >
                    <MainContent token={token} />
                    <Dialog
                        open={appstate.loading}
                        // onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <GridLoader
                            color="brown"
                            loading={appstate.loading}
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
            </div>
        </>

    )
}

export default Home;