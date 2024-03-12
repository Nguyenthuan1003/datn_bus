import React, { FC, useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { CiCircleInfo } from "react-icons/ci";
import { getTripId } from '~/app/api/trip/trip.api';
const Costticketcomponent:FC<any> = ({selectData,dataPrice}) => {
  const [dataChair,setDataChair]=useState<any>()
    useEffect(()=>{
        getTripId().then((res:any)=>{
            setDataChair(res?.data)
        })
    },[])

    
  return (
    <div css={cssCostTicket} className='bg-white '>
      <h3 className='font-semibold text-[1.5rem] pb-2 flex items-center'>Chi tiết giá <CiCircleInfo color='red' className='ml-1 cursor-pointer'/> </h3>
      <div className="info__body__line">
        <span className="info__body__text-right ">Giá vé lượt đi</span>
        <span className="info__body__price text-red-600">
        {dataPrice}đ
        </span>
      </div>
      <div className="info__body__line">
        <span className="info__body__text-right">Phí thanh toán</span>
        <span className="info__body__price">
          0đ
        </span>
      </div>
      <div className="info__body__line info__body__line__total-price pt-4">
        <span className="info__body__text-right ">Tổng tiền</span>
        <span className="info__body__price text-red-600">
        {dataPrice}đ
        </span>
      </div>
    </div>
  )
}

export default Costticketcomponent
const cssCostTicket = css`
margin: auto;
padding: 1rem;
border-radius: 6px;
box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 15px -7px;

.info__body__line{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .8rem;
}
.info__body__text-right{
  color: #637280;
}
.info__body__line__total-price{
  border-top: 1px solid black;
}
`