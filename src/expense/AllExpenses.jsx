import React, { useEffect, useMemo, useState } from "react";
import { callDelete, callGet } from "../api/Api";
import { setLoading, setProcess, setSelectedExpense, storeExpenses } from "../store/AppActions";
import { convertUserName, transFormDate } from "../common/CommonFunctions";
import { Box, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import P from "../store/ProcessConstants"
import { Paginaton } from "./Pagination";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

export const getExpenses = async (appstate, dispatch) => {
    const userId = localStorage.getItem("userId");
    let url = `${appstate.appConfigs.appEndPoints.BACKEND_URL}/expense/getexpenses/${userId}`;
    try {
        dispatch(setLoading(true))
        const response = await callGet(url);
        if (response.status === 200) {
            // console.log("expenses : ", JSON.stringify(response.data));
            await dispatch(storeExpenses(response.data))
            await dispatch(setLoading(false))
        }

    } catch (error) {
        console.log("error occured while getting the expenses : ", error)
        return;
    }
}

const AllExpenses = ({ appstate, dispatch }) => {

    const userName = convertUserName(appstate.expenses.userName);
    const [currentPage, setCurrentPage] = useState(1);
    const expensePerPage = 10;
    const indexOfLastExpense = currentPage * expensePerPage;
    const indexOfFirstExpense = indexOfLastExpense - expensePerPage;


    let expensesList = appstate?.expenses?.expenses.reverse();



    useEffect(() => {
        getExpenses(appstate, dispatch);

    }, []);


    // const getCurrentExpenses = (appstate) => {
    //     if (appstate?.expenses?.expenses != undefined && appstate?.expenses?.expenses?.length != 0) {
    //         const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);
    //         return currentExpenses;
    //     }
    // }


    const currentExpenses = useMemo(() => {
        if (appstate?.expenses?.expenses != undefined && appstate?.expenses?.expenses?.length != 0) {
            return expensesList.slice(indexOfFirstExpense, indexOfLastExpense);
        }
    }, [currentPage, expensesList]);

    // console.log(currentExpenses)

    const setPageNumber = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleEditExpense = async (e, i, expense) => {

        // let expenses = appstate?.expenses?.expenses.reverse();
        e.preventDefault();
        let newExpense = {
            ...expensesList[i],
            date: transFormDate(expense.date)
        }
        console.log("selected expense : ", JSON.stringify(newExpense))
        await dispatch(setSelectedExpense(newExpense));
        await dispatch(setProcess(P.EDIT_EXPENSE))


    }

    const handleDeleteExpense = async (e, i, expense) => {
        const result = window.confirm("Are you sure!! want to Delete??")
        // console.log("index", i)
        e.preventDefault()
        const deleteExpenseUrl = `${appstate.appConfigs.appEndPoints.BACKEND_URL}/expense/delete-expense/${expense._id}`;
        if (result) {

            try {
                const response = await callDelete(deleteExpenseUrl);
                if (response.status === 200) {
                    // console.log(JSON.stringify(response.data))
                    alert("Expense Deleted Successfully");
                    getExpenses(appstate, dispatch);
                } else {
                    // console.log(response)
                    alert("Something Wrong")
                }

            } catch (error) {
                console.log(error);
                return
            }
        }
    }

    const goToAddExpense = () => {
        dispatch(setProcess(P.ADD_EXPENSE));
    }


    return (
        <div className="allexpenses">
            {
                appstate.expenses.expenses != undefined && appstate.expenses.expenses.length === 0 ? (
                    <div className='noincome' >
                        <h1>Welcome </h1>
                        <h2>Please Click on Add Expense to add your expenses</h2>
                        <div>
                            <Button id='expensebutton' onClick={() => goToAddExpense()} >Add Expense</Button>
                        </div>
                    </div>
                ) :
                    (
                        <>
                            <div className="allexpenses-1">
                                <h2>Welcome {userName} </h2>
                                <div className="totalexpense">
                                    <h2 id="total">Total Expense : {appstate?.expenses?.totalAmount}</h2>
                                    {/* <h2 id="income">Total Income : {appstate?.incomes?.totalAmount}</h2>
                                    <h2 id="balance">Total Balance: {appstate?.incomes?.totalAmount - appstate?.expenses?.totalAmount}</h2> */}
                                </div>
                                <div className="table-div" >
                                    <table>
                                        <tbody>
                                            <tr>
                                                {/* <th>Select</th> */}
                                                <th>Expense Name</th>
                                                <th>Amount</th>
                                                <th>Category</th>
                                                <th>Date</th>
                                                <th>Description</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                            {
                                                currentExpenses != undefined && currentExpenses?.map((expense, i) => {

                                                    return (
                                                        <tr key={i}>
                                                            {/* <td>
                                                <input type="checkbox" />
                                            </td> */}
                                                            <td>
                                                                {expense.expenseTitle}
                                                            </td>
                                                            <td>
                                                                {expense.amount}
                                                            </td>
                                                            <td>
                                                                {expense.category}
                                                            </td>
                                                            <td>
                                                                {transFormDate(expense.date)}
                                                            </td>
                                                            <td>
                                                                {expense.description == "" ? "No Information" : expense.description}
                                                            </td>
                                                            <td>
                                                                <EditTwoToneIcon className="editicon" id="editicon" onClick={(e) => handleEditExpense(e, i, expense)} />
                                                            </td>
                                                            <td>
                                                                <DeleteIcon className="deleteicon" id="deleteicon" onClick={(e) => handleDeleteExpense(e, i, expense)} />
                                                            </td>
                                                        </tr>
                                                    )

                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div>
                                {
                                    expensesList != undefined && expensesList.length > 10 &&
                                    <Paginaton
                                        itemesPerPage={expensePerPage}
                                        totalItmes={appstate?.expenses?.expenses?.length}
                                        setPageNumber={setPageNumber}
                                        currentPage={currentPage}
                                    />
                                }
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default AllExpenses;