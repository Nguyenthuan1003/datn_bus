import React from 'react'
import { css } from '@emotion/react'
const Infomationticketcomponent = () => {
  return (
    <div css={cssInforTicket} className='info bg-white '>
        <h3 className='font-semibold text-[1.5rem] pb-2'>Thông tin lượt đi</h3>
        <div className="body__info">
          <div className='body__info__line'>
            <span className='body__info__text-right'>Tuyến xe </span>
            <span className='body__info__text-left'>BX Mien Tay - BX An Nhon</span>
          </div>
          <div className='body__info__line'>
            <span className='body__info__text-right'>Thời gian</span>
            <span className='body__info__text-left'>18:00 08-01-2024</span>
          </div>
          <div className='body__info__line'>
            <span className='body__info__text-right'>số lượng</span>
            <span className='body__info__text-left'>0 Ghế</span>
          </div>
          <div className='body__info__line'>
            <span className='body__info__text-right'>Số ghế</span>
            <span className='body__info__text-left'></span>
          </div>
          <div className='body__info__line'>
            <span className='body__info__text-right'>Tổng tiền lượt đi</span>
            <span className='body__info__text-left'>0đ</span>
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