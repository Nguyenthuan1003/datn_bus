import { createSlice } from "@reduxjs/toolkit"

const initialState: any = {
    cart: {}
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setDataBill: (state, action) => {
            state.cart = action.payload
        }
    },


})

export const { actions } = cartSlice
export default cartSlice.reducer