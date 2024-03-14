import { combineReducers } from "redux"
import tripReducer from "./tripSlice/tripSlice"
import cartReducer from "./cartSlice/cartSlice"
export const clientReducer=combineReducers({
    tripReducer,
    cartReducer
})

export default clientReducer