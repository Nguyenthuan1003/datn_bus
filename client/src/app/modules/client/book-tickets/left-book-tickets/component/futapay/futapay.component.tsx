import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ButtonRadiusCompoennt from '~/app/component/parts/button/button.component'

const FutapayComponent:FC<any> = ({dataPrice})=>{
    return (
        <div className='bg-white flex justify-between'>
            < div className='p-4'>
                <b>{dataPrice}đ</b>
            </div >

            <div className='flex p-4'>
                {/* <div><ButtonRadiusCompoennt content='huỷ' bgcolor /><Link to={'/'}></Link></div> */}
                <span><Link to={'/'}>Huy</Link></span>
                <div className='px-4'><ButtonRadiusCompoennt content='thanh toán' /></div>
            </div>
        </div >
    )
}

export default FutapayComponent