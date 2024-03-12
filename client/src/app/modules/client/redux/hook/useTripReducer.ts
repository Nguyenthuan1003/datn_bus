import { shallowEqual } from "react-redux"
import { useAppDispatch,useAppSelector } from "~/app/store/hooks"
import {actions as tripAction} from "../reducer/tripSlice/tripSlice"
import { getAllTrip } from "../reducer/tripSlice/thunk/trip.thunk"
import { useMemo } from "react"
import { bindActionCreators } from "redux"

export const useTripRedux=()=>{
    const data=useAppSelector((state:any)=>state.client.tripReducer as any,shallowEqual)
    const dispatch=useAppDispatch()
    const allActions={
        ...tripAction,
        getAllTrip
    }
    const actions=useMemo(()=>bindActionCreators(allActions,dispatch),[dispatch])
    return {data,actions}
}