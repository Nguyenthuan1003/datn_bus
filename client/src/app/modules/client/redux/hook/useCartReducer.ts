import { shallowEqual } from "react-redux"
import { useAppDispatch,useAppSelector } from "~/app/store/hooks"
import {actions as cartAction} from "../reducer/cartSlice/cartSlice"

import { useMemo } from "react"
import { bindActionCreators } from "redux"

export const useCartRedux=()=>{
    const data=useAppSelector((state:any)=>state.client.cartReducer as any,shallowEqual)
    const dispatch=useAppDispatch()
    const allActions={
        ...cartAction,
        
    }
    const actions=useMemo(()=>bindActionCreators(allActions,dispatch),[dispatch])
    return {data,actions}
}