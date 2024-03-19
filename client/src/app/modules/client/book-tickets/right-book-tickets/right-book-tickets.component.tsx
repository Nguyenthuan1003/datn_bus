import React, { FC } from 'react'
import Infomationticketcomponent from './component/infomation-ticket/infomation-ticket.component'
import Costticketcomponent from './component/cost-ticket/cost-ticket.component'

const RightBookTickets:FC<any> = ({trip_id,selectData,dataPrice}) => {
    return (
        <>
        <div>
            <Infomationticketcomponent trip_id={trip_id} selectData={selectData} dataPrice={dataPrice}/>
        </div>
        <div className='mt-5'>
            <Costticketcomponent trip_id={trip_id} selectData={selectData} dataPrice={dataPrice} />
        </div>
        </>
        
    )
}

export default RightBookTickets