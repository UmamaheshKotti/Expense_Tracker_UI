import React, { useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { getExpenses } from '../expense/AllExpenses';
import { getIncomes } from '../income/AllIncomes';
import { format } from 'date-fns';
import { Tooltip } from '@mui/material';

const DashBoard = ({ appstate, dispatch }) => {
    let expenses = appstate?.expenses?.expenses;
    let incomes = appstate?.incomes?.incomes;
    const [incomesData, setIncomesData] = useState([])
    const [expensesData, setExpensesData] = useState([])

    const formatedIncomeData = () => {

        let formatedIncomeDate;
        if (incomes != undefined) {
            formatedIncomeDate = incomes.map((income) => {
                return {
                    ...income,
                    date: format(new Date(income.date), "MMM yyyy")
                }
            });
        }
        setIncomesData(formatedIncomeDate)

        console.log("formatted incomes ", JSON.stringify(formatedIncomeDate))
    }

    const formatedExpenseData = () => {

        const formatedExpenseDate = expenses != undefined && expenses.map((expense) => ({
            ...expense,
            date: format(new Date(expense.date), "MMM yyyy")
        }));
        setExpensesData(formatedExpenseDate)

        console.log("formatted expenses ", JSON.stringify(formatedExpenseDate))
    }

    // const totalData = expensesData.map(expense => ({
    //     return {
    //         ...expense,

    //     }
    // }))
    // console.log(totalData)

    useMemo(() => {
        getExpenses(appstate, dispatch);
        getIncomes(appstate, dispatch);
        formatedIncomeData();
        formatedExpenseData();
    }, [])

    return (
        <div className='dashboard' >
            <h3>
                This is dashboard
            </h3>
            <ResponsiveContainer width="50%" height="50%" >
                <BarChart
                    width={100}
                    height={100}
                    data={expensesData}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis dataKey="amount"/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="expense" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>

        </div>
    )
}

export default DashBoard
