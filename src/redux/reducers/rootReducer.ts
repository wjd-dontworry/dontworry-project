import {challengeReducer} from './module/challengeReducer';
import userReducer from './module/userReducer';

const { combineReducers } = require('redux');

const rootReducer = combineReducers({
    challengeReducer,
    userReducer
});

export default rootReducer;