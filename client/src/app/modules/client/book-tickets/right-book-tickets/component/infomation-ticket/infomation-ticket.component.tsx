import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { getTripId } from '~/app/api/trip/trip.api'
import moment from 'moment-timezone'

const Infomationticketcomponent = ({trip_id,selectData,dataPrice}:any) => {
  const [dataTripTicket,setDataTripTicket]=useState<any>([])
  const [dataSeat,setDataSeat]=useState<any>([])
  // console.log('dataTripTicket',dataSeat);
  
  useEffect(()=>{
      getTripId(trip_id).then((res:any)=>{
        setDataTripTicket(res?.data?.trip)
        setDataSeat(res?.data)
      })
  },[])

  
  const routeName = dataTripTicket?.route?.name
  const timeStart = moment(dataTripTicket?.start_time).format('DD/MM/YYYY HH:mm')
  // const  timeEnd = moment(dataTripTicket?.end_time).format('HH:mm')  
  return (
    <div css={cssInforTicket} className='info bg-white '>
        <h3 className='font-semibold text-[1.5rem] pb-2'>Thông tin lượt đi</h3>
        <div className="body__info">
          <div className='body__info__line'>
            <span className='body__info__text-right'>Tuyến xe </span>
            <span className='body__info__text-left'>{routeName}</span>
          </div>
          <div className='body__info__line'>
            <span className='body__info__text-right'>Thời gian</span>
            <span className='body__info__text-left'>{timeStart}</span>
          </div>
          <div className='body__info__line'>
            <span className='body__info__text-right'>số lượng</span>
            <span className='body__info__text-left'>{selectData.length} Ghế</span>
          </div>
          <div className='body__info__line'>
            <span className='body__info__text-right'>Số ghế</span>
            <span className='body__info__text-left'>{selectData.join(', ')}</span>
          </div>
          <div className='body__info__line'>
            <span className='body__info__text-right'>Tổng tiền lượt đi</span>
            <span className='body__info__text-left'>{dataPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
          </div>
        </div>
    </div>
  )
}

export default Infomationticketcomponent
const cssInforTicket = css`

    margin: auto;
    padding: 1rem;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 15px -7px;
.body__info__line{
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.8rem;
}
.body__info__text-right{
  color: #637280;
}


  
`