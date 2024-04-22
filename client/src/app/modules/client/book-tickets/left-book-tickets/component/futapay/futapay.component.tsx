import { Button } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ButtonCanelCompoennt from '~/app/component/parts/button/button-cancel.component'
import ButtonRadiusCompoennt from '~/app/component/parts/button/button.component'

const FutapayComponent:FC<any> = ({dataPrice})=>{
    const handelCanel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        window.history.back();
    }
    
    return (
        <div className='bg-white flex justify-between'>
            < div className='p-4'>
                <b>{dataPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</b>
            </div >

            <div className='flex p-4'>
                <div><ButtonCanelCompoennt type="reset" content='huỷ' onchange={handelCanel} bgcolor /></div>
                <div className='px-4'><ButtonRadiusCompoennt content='thanh toán' /></div>
            </div>
        </div >
    )
}

export default FutapayComponent