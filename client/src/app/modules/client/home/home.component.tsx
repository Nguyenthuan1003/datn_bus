import React from 'react'
import FormToFromComponent from './component/form-to-from/form-to-from.component'
import VoucherComponent from './component/voucher/voucher.component'

const HomeComponent = () => {
    return (
        <div >
            <div className='w-[1128px] m-auto '>
                <div>
                    <FormToFromComponent />
                </div>
                <div>
                    <VoucherComponent />
                </div>
            </div>
        </div>

    )
}

export default HomeComponent
