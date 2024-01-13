import React from 'react'
import ButtonRadiusCompoennt from '~/app/component/parts/button/button.component'

const FutapayComponent = () => {
    return (
        <div className='bg-white flex justify-between'>
            < div className='p-4'>
                <p className='w-16 rounded-xl bg-[#00613D] py-1  text-center text-xs text-white'>FUTAPAY</p>
                <b>0đ</b>
            </div >

            <div className='flex p-4'>
                <div><ButtonRadiusCompoennt content='huỷ' bgcolor /></div>
                <div className='px-4'><ButtonRadiusCompoennt content='thanh toán' /></div>
            </div>
        </div >
    )
}

export default FutapayComponent