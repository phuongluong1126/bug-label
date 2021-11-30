const initialState = {
  listBugReports: [],
  searchTerm: "",
  filter: null,
  loadToast: false,
};

const bugReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BUG_REPORTS": {
      return {
        ...state,
        listBugReports: action.payload,
        renderList: action.payload,
      };
    }
    case "SET_SEARCH_TERM": {
      return {
        ...state,
        searchTerm: action.payload,
      };
    }
    case "SET_TAB": {
      console.log('payload', action.payload)
      return {
        ...state,
        filter: action.payload,
      };
    }
    case "ADD_NEW_BUG_REPORT": {
      const newList = [...state.listBugReport];
      // console.log('dispatch', action.payload);
      newList.push(action.payload);
      return {
        ...state,
        listBugReport: newList,
        renderList: newList,
        filter: null,
      };
    }
    case "CONTROL_TOAST": {
      return {
        ...state,
        loadToast: action.payload,
      };
    }
    default:
      return state;
  }
};

export default bugReportReducer;
