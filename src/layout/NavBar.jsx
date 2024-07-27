import React from "react";
import '../App.css';
import { resetState, setProcess } from "../store/AppActions";
import P from '../store/ProcessConstants'

const NavBar = ({ dispatch, token, navigate }) => {

    const goToLoginPage = () => {
        dispatch(setProcess(P.USER_LOGIN));
    }

    const goToRegistration = () => {
        dispatch(setProcess(P.USER_REGISTERATION));
    }

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        dispatch(resetState())

    }
    return (
        <nav className="navbar">
            <h4>Expense Tracker</h4>
            <div className="nav-login-register" >
                {
                    token ? (
                        <h5 onClick={(e) => handleLogout(e)}>Logout</h5>
                    ) : (
                        <>
                            <h5 onClick={() => goToLoginPage()}>Login</h5>
                            <h6>/</h6>
                            <h5 onClick={() => goToRegistration()}>Register</h5>
                        </>
                    )
                }
            </div>
        </nav>
    )
}


export default NavBar;