import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { resetState, setProcess } from '../store/AppActions';
import P from "../store/ProcessConstants";

const SessionTimeOut = ({ appstate, dispatch }) => {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [isSessionTimeOut, setIsSessionTimeOut] = useState(false);

    const onPrompt = () => {
        !isSessionTimeOut && setDialogOpen(true);
    }

    const onIdle = () => {
        setIsSessionTimeOut(true);
    }

    const onActive = () => {
        var value = !isSessionTimeOut && start();
        console.log("timer started with initial state? ", value)
    }

    const onAction = (event) => {

    }


    const { start } = useIdleTimer({
        onPrompt,
        onIdle,
        onAction,
        onActive,

        promptBeforeIdle: 1000 * 60 * 5,
        timeout: 1000 * 60 * 10,

        events: [
            "keydown",
            "keypress",
            "mousedown",
            "mousemove",
            "wheel",
            "mousewheel",
            "touchmove",
            "keypress"
        ],
        // startOnMount: true
    });

    const handleOk = () => {
        setDialogOpen(false);
        if (isSessionTimeOut) {
            localStorage.clear();
            dispatch(resetState());
            dispatch(setProcess(""));
        } else {
            onActive("Modal Close")
        }
    }

    return (
        <div>
            <Dialog open={dialogOpen} >
                <DialogTitle>
                    Your session is going to expire
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This session will timeout in 5 min.<br />
                        To stop this, press ok to continue.
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={() => handleOk()} >Ok</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default SessionTimeOut
