import { createStore, applyMiddleware } from "redux";
import { ThunkDispatch } from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { ChallengeActions } from './actions/challengeActions';
import { UserAction } from "./actions/userActions";

const thunk = require('redux-thunk').thunk;
const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, ChallengeActions | UserAction>;

export default store;