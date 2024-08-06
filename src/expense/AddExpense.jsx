import React, { useState } from "react";
import { callPost } from "../api/Api";
import { setLoading, setProcess, setUserId } from "../store/AppActions";
import P from '../store/ProcessConstants';


const AddExpense = ({ appstate, dispatch }) => {

    const [expenseTitle, setExpenseTitle] = useState(String);
    const [amount, setAmount] = useState(Number);
    const [date, setDate] = useState(Date);
    const [category, setCategory] = useState(String);
    const [description, setDescription] = useState(String);

    const handleExpense = (e) => {
        setExpenseTitle(e.target.value)
    }
    const handleAmount = (e) => {
        setAmount(e.target.value)
    }
    const handleDate = (e) => {
        setDate(e.target.value)
    }
    const handleCategory = (e) => {
        setCategory(e.target.value)
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleAddExpense = async (e) => {
        let token = localStorage.getItem("token")
        e.preventDefault();
        if (category === '') {
            alert('Please fill out required fileds');
            return
        }
        if (!token) {
            alert("Please login to add the expenses");
            localStorage.clear();
            dispatch(setProcess(undefined));
            return
        }
        let addExpenseUrl = `${appstate.appConfigs.appEndPoints.BACKEND_URL}/expense/add-expense`;

        let request = {
            token: token,
            expenseTitle: expenseTitle,
            amount: amount,
            date: date,
            category: category,
            description: description
        }
        try {
            dispatch(setLoading(true))
            const response = await callPost(addExpenseUrl, request);
            if (response.status === 200) {
                console.log(response.data)
                alert("Expense Added Successfully");
                setExpenseTitle("");
                setAmount("");
                setDate("");
                setCategory("");
                setDescription("");
                dispatch(setProcess(P.ALL_EXPENSES))
            } else {
                alert("Please Logout and Login again to continue")
                console.log(response)
            }
            dispatch(setLoading(false))


        } catch (error) {
            console.log("error while adding expense", error);
            return error
        }
    }
    return (
        <div className="addexpense-form">
            <form onSubmit={(e) => handleAddExpense(e)}>
                <h2>Add Expense</h2>
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
                        value={category}
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
                        id="description"
                        type="text"
                        placeholder="Detailed Description"
                        onChange={(e) => handleDescription(e)}
                        value={description} />
                </div>
                <div>
                    <button type="submit">Add Expense</button>
                </div>
            </form>
        </div>
    )
}

export default AddExpense;