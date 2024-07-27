
// import P from './ProcessConstants';
import C from './AppConstants';

const intitialState = {
    process: "",
    appConfigs: {},
    userToken: "",
    loading: false,
    userId: "",
    expenses: {},
    incomes: {},
    selectedExpense: {},
    selectedIncome: {},
    userDetails: {}
}


const appstate = (state = intitialState, action = {}) => {
    switch (action.type) {
        case C.SET_PROCESS:
            return {
                ...state,
                process: action.payload
            }
        case C.SET_APP_CONFIGS:
            return {
                ...state,
                appConfigs: action.payload
            }
        case C.SET_USER_TOKEN:
            return {
                ...state,
                userToken: action.payload
            }
        case C.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case C.SET_USER_ID:
            return {
                ...state,
                userId: action.payload
            }
        case C.GET_EXPENSES:
            return {
                ...state,
                expenses: action.payload
            }
        case C.SELECTED_EXPENSE:
            return {
                ...state,
                selectedExpense: action.payload
            }
        case C.GET_INCOMES:
            return {
                ...state,
                incomes: action.payload
            }
        case C.SELECTED_INCOME:
            return {
                ...state,
                selectedIncome: action.payload
            }
        case C.SET_USER_DETAILS:
            return {
                ...state,
                userDetails: action.payload
            }
        case C.RESET_STATE:
            return intitialState
        default:
            return {
                ...state
            }
    }
}

export default appstate;