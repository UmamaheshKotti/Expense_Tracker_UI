import React, { useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, Rectangle, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { getExpenses } from '../expense/AllExpenses';
import { getIncomes } from '../income/AllIncomes';
import { format } from 'date-fns';
import { Button, Tooltip } from '@mui/material';
import { getUserDetails } from '../user/UserDetails';
import P from '../store/ProcessConstants'
import { setProcess } from '../store/AppActions';
import { getEndPoints } from '../main/DefaultPage';

const DashBoard = ({ appstate, dispatch }) => {
    let appConfigs = appstate?.appConfigs;
    let expenses = appstate?.expenses?.expenses;
    let incomes = appstate?.incomes?.incomes;
    let userDetails = appstate.userDetails;
    const [incomesData, setIncomesData] = useState([])
    const [expensesData, setExpensesData] = useState([]);
    // const [totalData, setTotalData] = useState([]);

    let totaExpense = appstate.expenses.totalAmount;
    let totlaIncome = appstate.incomes.totalAmount;
    let totalSavings = appstate.incomes.totalAmount - appstate.expenses.totalAmount;
    let combinedData = [];

    const formatedIncomeData = async () => {

        const formatedIncomeDate = incomes != undefined && incomes.map((income) => ({
            ...income,
            date: format(new Date(income.date), "MMM yyyy")

        }));

        setIncomesData(formatedIncomeDate);

        // combinedData = 




        // console.log("combined List :: ", JSON.stringify(combinedData))
        // const incomeTotals = incomesData.length > 0 && incomesData?.reduce((acc, income) => {
        //     const { date, amount } = income;
        //     console.log(JSON.stringify(income));
        //     console.log(JSON.stringify(acc));
        //     acc[date] = (acc[date] || 0) + amount;
        //     return acc


        // })

        // console.log("Updated incomes amount " + JSON.stringify(incomeTotals))
        // console.log("formatted incomes ", JSON.stringify(formatedIncomeDate))
    }

    const formatedExpenseData = () => {

        const formatedExpenseDate = expenses != undefined && expenses.map((expense) => ({
            ...expense,
            date: format(new Date(expense.date), "MMM yyyy")
        }));
        setExpensesData(formatedExpenseDate)

        // console.log("formatted expenses ", JSON.stringify(formatedExpenseDate))
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

            console.log(result)

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

    let monthlyExpenses = expensesData.length > 0 && aggregateDataByMonth(expensesData, undefined);
    let monthlyIncomes = incomesData.length > 0 && aggregateDataByMonth(undefined, incomesData);

    // console.log("aggregatedData of expenses " + JSON.stringify(monthlyExpenses));
    // console.log("aggregatedData of incomes " + JSON.stringify(monthlyIncomes));

    useEffect(() => {
        if (Object.keys(appstate.appConfigs).length === 0) {
            getEndPoints(undefined, undefined, dispatch)
        }
        if (Object.keys(appstate.expenses).length == 0 && Object.keys(appstate.appConfigs).length != 0) {
            getExpenses(appstate, dispatch);
        }
        if (Object.keys(appstate.incomes).length == 0 && Object.keys(appstate.appConfigs).length != 0) {
            getIncomes(appstate, dispatch);
        }
        if (Object.keys(appstate.userDetails).length === 0 && Object.keys(appstate.appConfigs).length != 0) {
            getUserDetails(appstate, dispatch)
        }
        formatedIncomeData();
        formatedExpenseData();
    }, [appConfigs, expenses, incomes]);

    const combineIncomesAndExpenses = () => {
        let extractIncomes = [];
        let extractExpenses = [];

        extractIncomes = monthlyIncomes.map((income, i) => {
            return {
                date: income.month,
                incomeAmount: income.income
            }
        })

        // console.log("extractIncomes data :: ", JSON.stringify(extractIncomes))

        extractExpenses = monthlyExpenses.map((expense, i) => {
            return {
                date: expense.month,
                expenseAmount: expense.expense
            }

            // for (let j = 0; j < extractIncomes.length; j++) {
            // console.log(extractIncomes[i]?.date)
            //     if (extractIncomes[i]?.date === expense.date) {
            //         return {
            //             incomeAmount: expense.amount
            //         }
            //     }
            // }
        })

        // console.log("extractExpenses data :: ", JSON.stringify(extractExpenses))

        let newData = [...extractIncomes, ...extractExpenses]

        // console.log("newData ::" + JSON.stringify(newData))

        combinedData = newData.reduce((acc, current) => {
            // Check if the current date already exists in the accumulator
            const existing = acc.find(item => item.date === current.date);

            if (existing) {
                // Update expenseAmount if it exists
                if (current.expenseAmount !== undefined) {
                    existing.expenseAmount += current.expenseAmount;
                }
                // Update incomeAmount if it exists
                if (current.incomeAmount !== undefined) {
                    existing.incomeAmount += current.incomeAmount;
                }
            } else {
                // Push a new entry into the accumulator with both expenseAmount and incomeAmount
                acc.push({
                    date: current.date,
                    expenseAmount: current.expenseAmount || 0,
                    incomeAmount: current.incomeAmount || 0
                });
            }

            return acc;
        }, []);

        // console.log("combined data :: ", JSON.stringify(combinedData))
    }

    useMemo(() => {
        if (incomesData.length > 0 && expensesData.length > 0) {
            combineIncomesAndExpenses();
        }
    }, [expensesData, incomesData, combinedData])

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

    const goToAddExpense = () => {
        dispatch(setProcess(P.ADD_EXPENSE));
    }
    const goToAddIncome = () => {
        dispatch(setProcess(P.ADD_INCOME));
    }

    return (
        <div className='dashboard' >
            {
                (expenses?.length > 0 || incomes?.length > 0) ?
                    (
                        <div>
                            <h2>
                                Hi {appstate.expenses.userName}
                                <div className='dashboardButtons'>
                                    <Button onClick={() => goToAddExpense()} id="addExpenseButton">Add Expense</Button>{"   "}
                                    <Button onClick={() => goToAddIncome()} id="addIncomeButton">Add Income</Button>
                                </div>
                            </h2>


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
                                {
                                    monthlyExpenses.length > 0 && <BarChart
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
                                }
                                {
                                    monthlyIncomes.length > 0 && <BarChart
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
                                }
                                {
                                    monthlyExpenses.length > 0 && monthlyIncomes.length > 0 && <BarChart
                                        width={400}
                                        height={300}
                                        data={combinedData}
                                        margin={{
                                            top: 20, right: 80, left: 20, bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="expenseAmount" fill="red" />
                                        <Bar type="monotone" dataKey="incomeAmount" fill="green" />
                                    </BarChart>
                                }
                                {/* <PieChart width={500} height={400}>
                                    <Pie data={monthlyExpenses} dataKey="expense" cx="50%" cy="50%" outerRadius={60} fill="red" />
                                    <Pie data={monthlyIncomes} dataKey="income" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="green" label />
                                </PieChart> */}
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
                    ) :
                    (
                        <div className='noincome' >
                            <h2>Welcome  {userDetails.userName}</h2>
                            <h3>Please Add your expenses and Incomes </h3>
                            <h3>To Compare.</h3>
                            <div className='dashboardButtons'>
                                <Button id='incomebutton' onClick={() => goToAddIncome()} >Add Income</Button>
                                <Button id='expensebutton' onClick={() => goToAddExpense()} >Add Expense</Button>
                            </div>
                        </div>
                    )
            }


        </div>
    )
}

export default DashBoard
