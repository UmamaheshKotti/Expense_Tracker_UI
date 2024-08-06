import React, { useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, Rectangle, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { getExpenses } from '../expense/AllExpenses';
import { getIncomes } from '../income/AllIncomes';
import { format } from 'date-fns';
import { Tooltip } from '@mui/material';

const DashBoard = ({ appstate, dispatch }) => {
    let expenses = appstate?.expenses?.expenses;
    let incomes = appstate?.incomes?.incomes;
    let userDetails = appstate.userDetails;
    const [incomesData, setIncomesData] = useState([])
    const [expensesData, setExpensesData] = useState([]);

    let totaExpense = appstate.expenses.totalAmount;
    let totlaIncome = appstate.incomes.totalAmount;
    let totalSavings = appstate.incomes.totalAmount - appstate.expenses.totalAmount;
    // let newIncomesList = {};

    const formatedIncomeData = async () => {

        const formatedIncomeDate = incomes != undefined && incomes.map((income) => ({
            ...income,
            date: format(new Date(income.date), "MMM yyyy")

        }));

        setIncomesData(formatedIncomeDate);

        // const incomeTotals = incomesData.length > 0 && incomesData?.reduce((acc, income) => {
        //     const { date, amount } = income;
        //     console.log(JSON.stringify(income));
        //     console.log(JSON.stringify(acc));
        //     acc[date] = (acc[date] || 0) + amount;
        //     return acc


        // })

        // console.log("Updated incomes amount " + JSON.stringify(incomeTotals))
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

    const aggregateDataByMonth = (expenses, incomes) => {

        const result = {};

        if (expenses != undefined) {

            expenses.length > 0 && expenses?.forEach(item => {
                const month = item.date.split(' ')[0];
                if (result[month]) {
                    result[month] += item.amount;
                } else {
                    result[month] = item.amount;
                }
            });

            return Object.keys(result).map(month => ({
                month,
                expense: result[month]
            }))
        }

        if (incomes != undefined) {
            incomes.length > 0 && incomes?.forEach(item => {
                const month = item.date.split(' ')[0];
                if (result[month]) {
                    result[month] += item.amount;
                } else {
                    result[month] = item.amount;
                }
            });

            return Object.keys(result).map(month => ({
                month,
                income: result[month]
            }))
        }



    }

    const monthlyExpenses = expensesData.length > 0 && aggregateDataByMonth(expensesData, undefined);
    const monthlyIncomes = incomesData.length > 0 && aggregateDataByMonth(undefined, incomesData);

    console.log("aggregatedData of expenses " + JSON.stringify(monthlyExpenses));
    console.log("aggregatedData of incomes " + JSON.stringify(monthlyIncomes));

    useMemo(() => {
        if (Object.keys(appstate.expenses).length <= 0) {
            getExpenses(appstate, dispatch);
        }
        if (Object.keys(appstate.incomes).length <= 0) {
            getIncomes(appstate, dispatch);
        }
        formatedIncomeData();
        formatedExpenseData();
    }, [expenses, incomes]);

    const renderCustomLegend = (expense, income) => {
        if (expense != undefined) {
            return (
                <div style={{ display: 'flex', alignItems: 'center', marginTop: "20px" }}>
                    <div
                        style={{
                            width: 10,
                            height: 10,
                            backgroundColor: 'red',
                            marginRight: 4,
                        }}
                    />
                    <span style={{ color: 'red' }}>Expense</span>
                </div>
            );
        }
        if (income != undefined) {
            return (
                <div style={{ display: 'flex', alignItems: 'center', marginTop: "20px" }}>
                    <div
                        style={{
                            width: 10,
                            height: 10,
                            backgroundColor: 'green',
                            marginRight: 4,
                        }}
                    />
                    <span style={{ color: 'green' }}>Income</span>
                </div>
            );
        }
    };

    return (
        <div className='dashboard' >
            <h3>
                Hi {appstate.expenses.userName}
            </h3>
            <div className='showamount' >
                <h4 id="expense" >
                    Total Expense : ₹{totaExpense?.toFixed(2)}
                </h4>
                <h4 id='income' >
                    Total Income : ₹{totlaIncome?.toFixed(2)}
                </h4>
                <h4 id='savings' >
                    Total Savings : ₹{totalSavings?.toFixed(2)}
                </h4>
            </div>
            {/* <ResponsiveContainer className={"responsivecontainer"} width="50%" height="80%"> */}
            <div className={"responsivecontainer"}>
                <BarChart
                    width={400}
                    height={300}
                    data={monthlyExpenses}
                    margin={{
                        top: 5, right: 80, left: 20, bottom: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend content={renderCustomLegend(monthlyExpenses, undefined)} />
                    <Bar markerHeight={10} dataKey="expense" fill="red" />
                </BarChart>
                <BarChart
                    width={400}
                    height={300}
                    data={monthlyIncomes}
                    margin={{
                        top: 20, right: 80, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend content={renderCustomLegend(undefined, monthlyIncomes)} />
                    <Bar type="monotone" dataKey="income" fill="green" />
                </BarChart>
                <PieChart width={500} height={400}>
                    <Pie data={monthlyExpenses} dataKey="expense" cx="50%" cy="50%" outerRadius={60} fill="red" />
                    <Pie data={monthlyIncomes} dataKey="income" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="green" label />
                </PieChart>
            </div>
            {/* <div>
                <PieChart width={400} height={400}>
                    <Pie data={monthlyExpenses} dataKey="expense" cx="50%" cy="50%" outerRadius={60} fill="red" />
                    <Pie data={monthlyIncomes} dataKey="income" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
                </PieChart>
            </div> */}

            {/* </ResponsiveContainer> */}
            {/* <div>
                <ResponsiveContainer width="70%" height="50%">
                    <PieChart width={400} height={400}>
                        <Pie data={monthlyExpenses} dataKey="expense" cx="50%" cy="50%" outerRadius={60} fill="red" />
                        <Pie data={monthlyIncomes} dataKey="income" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
                    </PieChart>
                </ResponsiveContainer>
            </div> */}

        </div>
    )
}

export default DashBoard
