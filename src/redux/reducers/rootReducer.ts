import boardReducer from "./module/boardReducers"
import { challengeReducer } from "./module/challengeReducer"
import userReducer from "./module/userReducer"

const { combineReducers } = require("redux")

const rootReducer = combineReducers({
  challengeReducer,
  userReducer,
  boardReducer,
})

export default rootReducer
