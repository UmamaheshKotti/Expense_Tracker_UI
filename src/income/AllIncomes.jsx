import React, { useEffect, useMemo, useState } from "react";
import { callDelete, callGet } from "../api/Api";
import { setLoading, setProcess, setSelectedIncome, storeIncomes } from "../store/AppActions";
import { convertUserName, transFormDate } from "../common/CommonFunctions";
import { Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import P from "../store/ProcessConstants";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Paginaton } from "../expense/Pagination";

export const getIncomes = async (appstate, dispatch) => {
    const userId = localStorage.getItem("userId");
    let url = `${appstate.appConfigs.appEndPoints.BACKEND_URL}/income/getincomebyuserid/${userId}`;
    try {
        dispatch(setLoading(true))
        const response = await callGet(url);
        if (response.status === 200) {
            // console.log("incomes : ", JSON.stringify(response.data));
            await dispatch(storeIncomes(response.data))
            await dispatch(setLoading(false))
        }

    } catch (error) {
        console.log("error occured while getting the incomes : ", error)
        return;
    }
}

const AllIncomes = ({ appstate, dispatch }) => {

    const userName = convertUserName(appstate.incomes.userName);
    const [currentPage, setCurrentPage] = useState(1);
    const incomesPerPage = 10;
    const indexOfLastIncome = currentPage * incomesPerPage;
    const indexOfFirstIncome = indexOfLastIncome - incomesPerPage;


    let incomesList = appstate?.incomes?.incomes;



    useEffect(() => {
        getIncomes(appstate, dispatch);

    }, []);


    // const getCurrentIncomes = (appstate) => {
    //     if (appstate?.incomes?.incomes != undefined && appstate?.incomes?.incomes?.length != 0) {
    //         const currentIncomes = incomes.slice(indexOfFirstIncome, indexOfLastIncome);
    //         return currentIncomes;
    //     }
    // }


    const currentIncomes = useMemo(() => {
        if (appstate?.incomes?.incomes != undefined && appstate?.incomes?.incomes?.length != 0) {
            return incomesList.slice(indexOfFirstIncome, indexOfLastIncome);
        }
    }, [currentPage, incomesList]);

    // console.log(currentIncomes)

    const setPageNumber = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleEditIncome = async (e, i, income) => {
        let incomes = appstate?.incomes?.incomes;
        e.preventDefault();
        let newIncome = {
            ...incomes[i],
            date: transFormDate(income.date)
        }
        // console.log("selected income : ", JSON.stringify(newIncome))
        await dispatch(setSelectedIncome(newIncome));
        dispatch(setProcess(P.EDIT_INCOME))


    }

    const handleDeleteIncome = async (e, i, income) => {
        const result = window.confirm("Are you sure!! want to Delete??")
        // console.log("index", i)
        e.preventDefault()
        const deleteIncomeUrl = `${appstate.appConfigs.appEndPoints.BACKEND_URL}/income/delete-income/${income._id}`;
        if (result) {

            try {
                const response = await callDelete(deleteIncomeUrl);
                if (response.status === 200) {
                    // console.log(JSON.stringify(response.data))
                    alert("Income Deleted Successfully");
                    getIncomes();
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


    return (
        <div className="allincomes">
            {
                appstate.incomes.incomes != undefined && appstate.incomes.incomes.length === 0 ? (
                    <div className='noincome' >
                        <h1>Welcome </h1>
                        <h1>Add your Incomes </h1>
                    </div>
                ) :
                    (
                        <>
                            <div className="allincomes-1">
                                <h2>Welcome {userName} </h2>
                                <div className="totalincome">
                                    <h2 id="total">Total Income : {appstate?.incomes?.totalAmount}</h2>
                                    {/* <h2 id="balance">Total Balance: 56655565</h2> */}
                                </div>
                                <div className="table-div" >
                                    <table>
                                        <tbody>
                                            <tr>
                                                {/* <th>Select</th> */}
                                                <th>Income Name</th>
                                                <th>Amount</th>
                                                <th>Category</th>
                                                <th>Date</th>
                                                <th>Description</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                            {
                                                currentIncomes != undefined && [...currentIncomes].reverse().map((income, i) => {

                                                    return (
                                                        <tr key={i}>
                                                            {/* <td>
                                                <input type="checkbox" />
                                            </td> */}
                                                            <td>
                                                                {income.incomeTitle}
                                                            </td>
                                                            <td>
                                                                {income.amount}
                                                            </td>
                                                            <td>
                                                                {income.category}
                                                            </td>
                                                            <td>
                                                                {transFormDate(income.date)}
                                                            </td>
                                                            <td>
                                                                {income.description}
                                                            </td>
                                                            <td>
                                                                <EditTwoToneIcon className="editicon" id="editicon" onClick={(e) => handleEditIncome(e, i, income)} />
                                                            </td>
                                                            <td>
                                                                <DeleteIcon className="deleteicon" id="deleteicon" onClick={(e) => handleDeleteIncome(e, i, income)} />
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
                                    incomesList != undefined && incomesList.length > incomesPerPage &&
                                    <Paginaton
                                        itemesPerPage={incomesPerPage}
                                        totlaItems={appstate?.incomes?.incomes?.length}
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

export default AllIncomes;