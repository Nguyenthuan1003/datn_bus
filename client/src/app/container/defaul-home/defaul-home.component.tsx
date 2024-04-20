import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import FooterComponent from '~/app/component/stacks/footer/footer.component'
import HeaderComponent from '~/app/component/stacks/header/header.component'
import Pusher from  'pusher-js'
const DefaulHomeComponent = () => {
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
         localStorage.setItem('rt_seatData', JSON.stringify(data.message))
         setSeatDataRT(data.message)
         
       }
     })
     // Clean up subscription when component unmounts
     return () => {
       //   channel.unbind_all()
       //   channel.unsubscribe()
     }
       }, [])

      //  setInterval(())
      // nếu có bill trong local
    return (
        <>
            <div>
                <HeaderComponent />
            </div>
            <div className='mt-[140px]'>
                <Outlet />
            </div>
            <div>
                <FooterComponent dataSeatHold={seatDataRT} />
            </div>
        </>
    )
}

export default DefaulHomeComponent