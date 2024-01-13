import React from 'react'
import Infomationticketcomponent from './component/infomation-ticket/infomation-ticket.component'
import Costticketcomponent from './component/cost-ticket/cost-ticket.component'

const RightBookTickets = () => {
    return (
        <>
        <div>
            <Infomationticketcomponent />
        </div>
        <div className='mt-5'>
            <Costticketcomponent />
        </div>
        </>
        
    )
}

export default RightBookTickets