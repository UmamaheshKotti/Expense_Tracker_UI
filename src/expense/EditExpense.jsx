import React, { useState } from "react";
import { callPost, callPut } from "../api/Api";
import { setLoading, setProcess, setUserId } from "../store/AppActions";
import P from '../store/ProcessConstants';
import { transFormDate } from "../common/CommonFunctions";
import { Button } from "@mui/material";


const EditExpense = ({ appstate, dispatch }) => {

    const convertDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month}-${day}`;
    };

    const [expenseTitle, setExpenseTitle] = useState(appstate.selectedExpense.expenseTitle);
    const [amount, setAmount] = useState(appstate.selectedExpense.amount);
    const [date, setDate] = useState(convertDate(appstate.selectedExpense.date));
    const [category, setCategory] = useState(appstate.selectedExpense.category);
    const [description, setDescription] = useState(appstate.selectedExpense.description);

    const handleExpense = (e) => {
        setExpenseTitle(e.target.value)
    }
    const handleAmount = (e) => {
        setAmount(e.target.value)
    }
    const handleDate = (e) => {
        // console.log(e.target.value)
        setDate(e.target.value)
    }
    const handleCategory = (e) => {
        setCategory(e.target.value)
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleEditExpense = async (e) => {
        e.preventDefault();
        if (category === '') {
            alert('Please fill out required fileds');
            return
        }
        let expenseId = appstate.selectedExpense._id
        let editExpenseUrl = `${appstate.appConfigs.appEndPoints.BACKEND_URL}/expense/edit-expense/${expenseId}`;

        let request = {
            expenseTitle: expenseTitle,
            amount: amount,
            date: date,
            category: category,
            description: description
        }
        try {
            dispatch(setLoading(true))
            const response = await callPut(editExpenseUrl, request);
            if (response.status === 200) {
                // console.log(response.data)
                alert("Expense Updated Successfully");
                setExpenseTitle("");
                setAmount("");
                setDate("");
                setCategory("");
                setDescription("");
                dispatch(setProcess(P.ALL_EXPENSES))
            } else {
                alert("Bad Request")
                // console.log(response)
            }
            dispatch(setLoading(false))


        } catch (error) {
            console.log("error while adding expense", error);
            return error
        }
    }

    const handleBack = () => {
        dispatch(setProcess(P.ALL_EXPENSES))
    }

    return (
        <div className="addexpense-form">
            <form onSubmit={(e) => handleEditExpense(e)}>
                <h2>Edit Expense</h2>
                <div className="userauth" >
                    <label id="expenseTitle">ExpenseTitle</label><br />
                    <input
                        required={true}
                        name="expenseName"
                        type="text"
                        placeholder="Expense Title"
                        onChange={(e) => handleExpense(e)}
                        value={expenseTitle} /><br />
                    <label id="amount">Amount</label><br />
                    <input
                        required={true}
                        name="amount"
                        type="Number"
                        placeholder="Enter the Amount"
                        onChange={(e) => handleAmount(e)}
                        value={amount} /><br />
                    <label id="date">Date</label>
                    <input
                        name="date"
                        required={true}
                        id="date"
                        type="date"
                        onChange={(e) => handleDate(e)}
                        value={date} />
                    <label id="category">Category</label>
                    <select
                        required
                        value={category[0]}
                        onChange={(e) => handleCategory(e)}
                        id="category"
                        name="category" >
                        <option value={"Please Select"}>Please Select</option>
                        <option value={"Education"}>Education</option>
                        <option value={"Groceries"}>Groceries</option>
                        <option value={"Medical"}>Medical</option>
                        <option value={"Shopping"}>Shopping</option>
                        <option value={"Travelling"}>Travelling</option>
                        <option value={"Others"}>Others</option>
                    </select><br />
                    <label id="description">Description</label><br />
                    <textarea
                        required
                        id="description"
                        type="text"
                        placeholder="Detailed Description"
                        onChange={(e) => handleDescription(e)}
                        value={description} />
                </div>
                <div>
                    <Button id="backButton" onClick={() => handleBack()} > Back</Button>
                    <Button id="addExpenseButton" type="submit">Edit Expense</Button>
                </div>
            </form>
        </div>
    )
}

export default EditExpense;