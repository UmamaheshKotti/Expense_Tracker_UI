import React, { useState } from "react";
import { callPost } from "../api/Api";
import { setLoading, setProcess, setUserId } from "../store/AppActions";
import P from '../store/ProcessConstants';
import { Button } from "@mui/material";


const AddIncome = ({ appstate, dispatch }) => {

    const [incomeTitle, setIncomeTitle] = useState(String);
    const [amount, setAmount] = useState(Number);
    const [date, setDate] = useState(Date);
    const [category, setCategory] = useState(String);
    const [description, setDescription] = useState(String);

    const handleIncomeTitle = (e) => {
        setIncomeTitle(e.target.value)
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

    const handleAddIncome = async (e) => {
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
        let addIncomeUrl = `${appstate.appConfigs.appEndPoints.BACKEND_URL}/income/add-income`;

        let request = {
            token: token,
            incomeTitle: incomeTitle,
            amount: amount,
            date: date,
            category: category,
            description: description
        }
        try {
            dispatch(setLoading(true))
            const response = await callPost(addIncomeUrl, request);
            if (response.status === 200) {
                // console.log(response.data)
                alert("Income Added Successfully");
                setIncomeTitle("");
                setAmount("");
                setDate("");
                setCategory("");
                setDescription("");
                // dispatch(setProcess(P.DASH_BOARD))
                dispatch(setProcess(P.ALL_INCOMES))
            } else {
                alert("Bad Request")
                // console.log(response)
            }
            dispatch(setLoading(false))


        } catch (error) {
            console.log("error while adding income", error);
            return error
        }
    }

    const handleBack = () => {
        dispatch(setProcess(P.ALL_INCOMES))
    }

    return (
        <div className="addincome-form">
            <form onSubmit={(e) => handleAddIncome(e)}>
                <h2>Add Income</h2>
                <div className="userauth" >
                    <label id="incometitle">Income Ttile</label><br />
                    <input
                        required={true}
                        name="incomename"
                        type="text"
                        placeholder="Income Title"
                        onChange={(e) => handleIncomeTitle(e)}
                        value={incomeTitle} /><br />
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
                        <option value={"Salary"}>Salary</option>
                        <option value={"Youtube"}>Youtube</option>
                        <option value={"Marketing"}>Marketing</option>
                        <option value={"Stock"}>Stock</option>
                        <option value={"Intrest"}>Intrest</option>
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
                    <Button id="backButton" onClick={() => handleBack()} > Back</Button>
                    <Button id="addIncomeButton" type="submit">Add Income</Button>
                </div>
            </form>
        </div>
    )
}

export default AddIncome;