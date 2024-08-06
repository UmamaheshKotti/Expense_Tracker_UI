import React from "react";
import '../App.css';
import { getUserDetails, setLoading, setProcess } from "../store/AppActions";
import P from '../store/ProcessConstants'
import { callGet } from "../api/Api";
import { TfiDashboard } from "react-icons/tfi";
import { GiExpense } from "react-icons/gi";
import DashboardIcon from '@mui/icons-material/Dashboard';


const SideBar = ({ appstate, dispatch, token }) => {

    const goToDashBoard = () => {
        dispatch(setProcess(P.DASH_BOARD))
    }

    const goToAddExpense = () => {
        dispatch(setProcess(P.ADD_EXPENSE));
    }

    const goToAllExpenses = () => {
        dispatch(setProcess(P.ALL_EXPENSES));
    }

    const goToUserDetails = async (e) => {
        e.preventDefault();
        dispatch(setProcess(P.USER_DETAILS));
        // let userId = localStorage.getItem("userId")
        // let userDetailsUrl = `${appstate.appConfigs.appEndPoints.BACKEND_URL}/user/getuser/${userId}`

        // try {
        //     dispatch(setLoading(true));
        //     const response = await callGet(userDetailsUrl);
        //     if (response.status === 200) {
        //         dispatch(getUserDetails(response.data));
        //         console.log("userDetails ", JSON.stringify(response.data))
        //         dispatch(setProcess(P.USER_DETAILS));
        //     }
        //     dispatch(setLoading(false));

        // } catch (error) {
        //     console.log("error while getting the userDetails")
        // }

    }

    const gotToAddIncome = () => {
        dispatch(setProcess(P.ADD_INCOME));
    }

    const goToAllIncomes = () => {
        dispatch(setProcess(P.ALL_INCOMES));
    }

    return (
        <nav className="sidebar">
            <ul>
                {
                    token &&
                    <>
                        <li onClick={() => goToDashBoard()}><TfiDashboard color="red" /> DashBoard</li>
                        <li onClick={() => goToAddExpense()}>Add Expense</li>
                        <li onClick={() => goToAllExpenses()}>All Expenses</li>
                        <li onClick={(e) => gotToAddIncome(e)}>Add Income</li>
                        <li onClick={(e) => goToAllIncomes(e)}>All Incomes</li>
                        <li className="mydetails" onClick={(e) => goToUserDetails(e)}>My Details</li>
                    </>
                }
            </ul>
        </nav>
    )
}


export default SideBar;