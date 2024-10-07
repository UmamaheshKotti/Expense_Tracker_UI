import React from "react";
import '../App.css';
import { getUserDetails, setLoading, setProcess, setSelectedLi } from "../store/AppActions";
import P from '../store/ProcessConstants'
import { callGet } from "../api/Api";
import { TfiDashboard } from "react-icons/tfi";
import { GiExpense } from "react-icons/gi";
import DashboardIcon from '@mui/icons-material/Dashboard';
import C from '../store/AppConstants'


const SideBar = ({ appstate, dispatch, token }) => {

    const goToDashBoard = () => {
        dispatch(setSelectedLi(C.DASHBOARD_LI))
        dispatch(setProcess(P.DASH_BOARD))
    }

    const goToAddExpense = () => {
        dispatch(setSelectedLi(C.EXPENSE_LI))
        dispatch(setProcess(P.ADD_EXPENSE));
    }

    const goToAllExpenses = () => {
        dispatch(setSelectedLi(C.ALL_EXPENSES_LI))
        dispatch(setProcess(P.ALL_EXPENSES));
    }

    const goToUserDetails = async (e) => {
        e.preventDefault();
        dispatch(setSelectedLi(C.MY_DETAILS_LI))
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
        dispatch(setSelectedLi(C.INCOME_LI))
        dispatch(setProcess(P.ADD_INCOME));
    }

    const goToAllIncomes = () => {
        dispatch(setSelectedLi(C.ALL_INCOMES_LI))
        dispatch(setProcess(P.ALL_INCOMES));
    }

    return (
        <nav className="sidebar">
            <ul>
                {
                    token &&
                    <>
                        <li className={appstate.selectedLi === C.DASHBOARD_LI ? "dash-li" : ""} onClick={() => goToDashBoard()}><TfiDashboard color="red" /> DashBoard</li>
                        <li className={appstate.selectedLi === C.EXPENSE_LI ? "expense-li" : ""} onClick={() => goToAddExpense()}>Add Expense</li>
                        <li className={appstate.selectedLi === C.ALL_EXPENSES_LI ? "allexpenses-li" : ""} onClick={() => goToAllExpenses()}>All Expenses</li>
                        <li className={appstate.selectedLi === C.INCOME_LI ? "income-li" : ""} onClick={(e) => gotToAddIncome(e)}>Add Income</li>
                        <li className={appstate.selectedLi === C.ALL_INCOMES_LI ? "allincomes-li" : ""} onClick={(e) => goToAllIncomes(e)}>All Incomes</li>
                        <li className={appstate.selectedLi === C.MY_DETAILS_LI ? "mydetails-li" : "mydetails"} onClick={(e) => goToUserDetails(e)}>My Details</li>
                    </>
                }
            </ul>
        </nav>
    )
}


export default SideBar;