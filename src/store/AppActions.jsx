import C from './AppConstants';

export const setProcess = (data) => ({
    type: C.SET_PROCESS,
    payload: data
})

export const setAppConfigs = (data) => ({
    type: C.SET_APP_CONFIGS,
    payload: data
})

export const setUserToken = (data) => ({
    type: C.SET_USER_TOKEN,
    payload: data
});

export const setLoading = (data) => ({
    type: C.SET_LOADING,
    payload: data
})

export const setUserId = (data) => ({
    type: C.SET_USER_ID,
    payload: data
})

export const storeExpenses = (data) => ({
    type: C.GET_EXPENSES,
    payload: data
})

export const setSelectedExpense = (data) => ({
    type: C.SELECTED_EXPENSE,
    payload: data
})

export const storeIncomes = (data) => ({
    type: C.GET_INCOMES,
    payload: data
})

export const setSelectedIncome = (data) => ({
    type: C.SELECTED_INCOME,
    payload: data
})

export const setUserDetails = (data) => ({
    type: C.SET_USER_DETAILS,
    payload: data
})

export const setSelectedLi = (data) => ({
    type: C.SET_SELECTED_LI,
    payload: data
})

export const resetState = () => ({
    type: C.RESET_STATE
})