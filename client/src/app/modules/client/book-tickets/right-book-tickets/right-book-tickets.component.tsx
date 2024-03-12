import React, { FC } from 'react'
import Infomationticketcomponent from './component/infomation-ticket/infomation-ticket.component'
import Costticketcomponent from './component/cost-ticket/cost-ticket.component'

const RightBookTickets:FC<any> = ({selectData,dataPrice}) => {
    return (
        <>
        <div>
            <Infomationticketcomponent selectData={selectData} dataPrice={dataPrice}/>
        </div>
        <div className='mt-5'>
            <Costticketcomponent selectData={selectData} dataPrice={dataPrice} />
        </div>
        </>
        
    )
}

export default RightBookTickets