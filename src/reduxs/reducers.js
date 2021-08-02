import {combineReducers} from "redux";

import counter from 'reduxs/reducers/counter';
import userInfo from 'reduxs/reducers/userInfo';

export default combineReducers({
    counter,
    userInfo
})