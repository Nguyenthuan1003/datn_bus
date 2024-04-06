import React, { useState } from 'react'
import LeftBookTickets from './left-book-tickets/left-book-tickets.component'
import RightBookTickets from './right-book-tickets/right-book-tickets.component'
import { useParams } from 'react-router-dom'

const BooktickitsComponent = () => {
    const [selectData,setSelectData]=useState<any>([])

    const {id:trip_id} = useParams();
    
    
    const [dataPrice,setDataPrice]=useState<any>(0)
    return (
        <div className='bg-[#f3f3f5]'>
           
            <div className='flex justify-between gap-5 w-[1128px] m-auto '>
                
                <div className='w-[65%] '>
      
                    <LeftBookTickets trip_id={trip_id}  setSelectData={setSelectData} setDataPrice={setDataPrice} selectData={selectData} dataPrice={dataPrice}/>
                </div>

                <div className='w-[35%] py-4'>
                    <RightBookTickets trip_id={trip_id} selectData={selectData} dataPrice={dataPrice}/>
                </div>
            </div>
        </div>

    )
}

export default BooktickitsComponent