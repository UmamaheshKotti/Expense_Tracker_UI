import React, { useState } from "react";
import { callPost, callPut } from "../api/Api";
import { setLoading, setProcess, setUserId } from "../store/AppActions";
import P from '../store/ProcessConstants';
import { transFormDate } from "../common/CommonFunctions";


const EditIncome = ({ appstate, dispatch }) => {

    const convertDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month}-${day}`;
    };

    const [incomeTitle, setIncomeTitle] = useState(appstate.selectedIncome.incomeTitle);
    const [amount, setAmount] = useState(appstate.selectedIncome.amount);
    const [date, setDate] = useState(convertDate(appstate.selectedIncome.date));
    const [category, setCategory] = useState(appstate.selectedIncome.category);
    const [description, setDescription] = useState(appstate.selectedIncome.description);

    const handleIncome = (e) => {
        setIncomeTitle(e.target.value)
    }
    const handleAmount = (e) => {
        setAmount(e.target.value)
    }
    const handleDate = (e) => {
        console.log(e.target.value)
        setDate(e.target.value)
    }
    const handleCategory = (e) => {
        setCategory(e.target.value)
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleEditIncome = async (e) => {
        e.preventDefault();
        if (category === '') {
            alert('Please fill out required fileds');
            return
        }
        let incomeId = appstate.selectedIncome._id
        let editIncomeUrl = `${appstate.appConfigs.appEndPoints.BACKEND_URL}/income/edit-income/${incomeId}`;

        let request = {
            incomeTitle: incomeTitle,
            amount: amount,
            date: date,
            category: category,
            description: description
        }
        try {
            dispatch(setLoading(true))
            const response = await callPut(editIncomeUrl, request);
            if (response.status === 200) {
                console.log(response.data)
                alert("Income Updated Successfully");
                setIncomeTitle("");
                setAmount("");
                setDate("");
                setCategory("");
                setDescription("");
                dispatch(setProcess(P.ALL_INCOMES))
            } else {
                alert("Bad Request")
                console.log(response)
            }
            dispatch(setLoading(false))


        } catch (error) {
            console.log("error while adding income", error);
            return error
        }
    }
    return (
        <div className="addincome-form">
            <form onSubmit={(e) => handleEditIncome(e)}>
                <h2>Edit Income</h2>
                <div className="userauth" >
                    <label id="incometitle">IncomeTitle</label><br />
                    <input
                        required={true}
                        name="incomeName"
                        type="text"
                        placeholder="Income Title"
                        onChange={(e) => handleIncome(e)}
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
                        value={category[0]}
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
                        required
                        id="description"
                        type="text"
                        placeholder="Detailed Description"
                        onChange={(e) => handleDescription(e)}
                        value={description} />
                </div>
                <div>
                    <button type="submit">EDIT Income</button>
                </div>
            </form>
        </div>
    )
}

export default EditIncome;