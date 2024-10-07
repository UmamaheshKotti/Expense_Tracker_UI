import React from "react";
import P from '../store/ProcessConstants';
import { useDispatch, useSelector } from "react-redux";
import UserLogin from "../user/UserLogin";
import UserRegistration from "../user/UserRegistration";
import AddExpense from "../expense/AddExpense";
import AllExpenses from "../expense/AllExpenses";
import UserDetails from "../user/UserDetails";
import DefaultPage from "./DefaultPage";
import GetConfigs from "../AppConfigs/GetConfigs";
import Oops from "./Oops";
import EditExpense from "../expense/EditExpense";
import ChangePassword from "../user/ChangePassword";
import AddIncome from "../income/AddIncome";
import AllIncomes from "../income/AllIncomes";
import EditIncome from "../income/EditIncome";
import DashBoard from "../common/DashBoard";
import EditUser from "../user/EditUser";


const MainContent = ({ token }) => {
    const appstate = useSelector((state) => state.appstate);
    const dispatch = useDispatch();
    let UIComponent;

    switch (appstate.process) {
        case "":
            return (
                UIComponent = <GetConfigs appstate={appstate} dispatch={dispatch} />
            )
        case P.DEFAULT_PAGE:
            return (
                UIComponent = <DefaultPage appstate={appstate} dispatch={dispatch} />
            )
        case P.USER_LOGIN:
            return (
                UIComponent = <UserLogin appstate={appstate} dispatch={dispatch} />
            )
        case P.USER_REGISTERATION:
            return (
                UIComponent = <UserRegistration appstate={appstate} dispatch={dispatch} />
            )
        case P.CHANGE_PASSWORD:
            return (
                UIComponent = <ChangePassword appstate={appstate} dispatch={dispatch} />
            )
        case P.ADD_EXPENSE:
            return (
                UIComponent = <AddExpense appstate={appstate} dispatch={dispatch} />
            )
        case P.ALL_EXPENSES:
            return (
                UIComponent = <AllExpenses appstate={appstate} dispatch={dispatch} />
            )
        case P.ADD_INCOME:
            return (
                UIComponent = <AddIncome appstate={appstate} dispatch={dispatch} />
            )
        case P.ALL_INCOMES:
            return (
                UIComponent = <AllIncomes appstate={appstate} dispatch={dispatch} />
            )
        case P.USER_DETAILS:
            return (
                UIComponent = <UserDetails appstate={appstate} dispatch={dispatch} />
            )
        case P.EDIT_EXPENSE:
            return (
                UIComponent = <EditExpense appstate={appstate} dispatch={dispatch} />
            )
        case P.DASH_BOARD:
            return (
                UIComponent = <DashBoard appstate={appstate} dispatch={dispatch} />
            )
        case P.EDIT_INCOME:
            return (
                UIComponent = <EditIncome appstate={appstate} dispatch={dispatch} />
            )
        case P.EDIT_USER:
            return (
                UIComponent = <EditUser appstate={appstate} dispatch={dispatch} />
            )


        default: UIComponent = <DefaultPage />
    }


    return (
        <div>
            {UIComponent}
        </div>
    )


}

export default MainContent;