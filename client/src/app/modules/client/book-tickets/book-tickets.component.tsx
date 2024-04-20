import React, { useEffect, useState } from 'react'
import LeftBookTickets from './left-book-tickets/left-book-tickets.component'
import RightBookTickets from './right-book-tickets/right-book-tickets.component'
import { useParams } from 'react-router-dom'
import Pusher from 'pusher-js'
const BooktickitsComponent = ({dataSeatHold}:any) => {
    const [selectData,setSelectData]=useState<any>([])

    const {id:trip_id} = useParams();
    const [seatDataRT, setSeatDataRT] = useState<any>([])
  useEffect(() => {
      // Enable pusher logging - you can disable this in production
  Pusher.logToConsole = false

  const pusher = new Pusher('c4f8e2d57cd915c9e6b6', {
    cluster: 'ap1'
  })

  const channel = pusher.subscribe('hold-seat-channel')
  channel.bind('hold-seat-event', function (data:any) {
    // console.log(data)
    if (data.message) {
      // console.log(data);
      // localStorage.setItem('rt_seatData', JSON.stringify(data.message))
      setSeatDataRT(data.message)
      
    }
  })
  // Clean up subscription when component unmounts
  return () => {
    //   channel.unbind_all()
    //   channel.unsubscribe()
  }
    }, [])
      
    const [dataPrice,setDataPrice]=useState<any>(0)
    return (
        <div className='bg-[#f3f3f5]'>
           
            <div className='flex justify-between gap-5 w-[1128px] m-auto '>
                
                <div className='w-[65%] '>
      
                    <LeftBookTickets trip_id={trip_id} dataSeatHold={seatDataRT}  setSelectData={setSelectData} setDataPrice={setDataPrice} selectData={selectData} dataPrice={dataPrice}/>
                </div>

                <div className='w-[35%] py-4'>
                    <RightBookTickets trip_id={trip_id} selectData={selectData} dataPrice={dataPrice}/>
                </div>
            </div>
        </div>

    )
}

export default BooktickitsComponent