import{combineReducers} from 'redux';
import bugReportReducer from './bugReport';

const rootReducer = combineReducers({
    bugReport: bugReportReducer,
})

export default rootReducer;