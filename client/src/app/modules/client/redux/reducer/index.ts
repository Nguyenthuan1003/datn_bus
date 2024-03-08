import { combineReducers } from "redux"
import tripReducer from "./tripSlice/tripSlice"

export const clientReducer=combineReducers({
    tripReducer
})

export default clientReducer