import { Button } from "@mui/material";
import React from "react";

const DefaultPage = () => {
    return (
        <div className="defaultpage">
            <h1>
                Welcome to Expense Tracker
            </h1>
            <h4>Let's Claculate your Expenses</h4>
            <p>
                If you're new here, please register to get started.<br />
                Already have an account? Log in to continue.
            </p>
            {/* <br/>
            <br/>
            <Button id="defaultpagebutton">Let's Get Started</Button> */}
        </div>
    )
}

export default DefaultPage;