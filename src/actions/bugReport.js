export const GetBugReports = (list)=>{
    return {
        type: 'GET_BUG_REPORTS',
        payload: list,
    }
}
export const SetSearchValue= (searchTerm)=>{
    return {
        type: 'SET_SEARCH_TERM',
        payload:searchTerm,
    }
}
export const SetTab= (tab)=>{
    return {
        type: 'SET_TAB',
        payload:tab,
    }
}
export const AddNewBugReport = (report)=>{
    return {
        type: 'ADD_NEW_BUG_REPORT',
        payload: report,
    }
}

export const ControlToast = (value) => {
    return {
        type: 'CONTROL_TOAST',
        payload:value
    }
}