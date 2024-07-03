import { createStore, applyMiddleware } from "redux"
import { ThunkDispatch } from "redux-thunk"
import rootReducer from "./reducers/rootReducer"
import { ChallengeActions } from "./actions/challengeActions"
import { UserActions } from "./actions/userActions"
import { BoardActions } from "./actions/boardActions"

const thunk = require("redux-thunk").thunk
const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, unknown, ChallengeActions | UserActions | BoardActions>

export default store
