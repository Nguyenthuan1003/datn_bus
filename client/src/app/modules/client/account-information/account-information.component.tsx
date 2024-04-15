import React from 'react'
import MenuAccount from '~/app/component/stacks/menu-account/menu-account.component'
import MainRight from './component/main-right/main-right.component'

const AccountInformation = () => {
    return (
        <div className='flex w-[1128px] m-auto '>
            <div className='w-[22%]'>
                <MenuAccount />
            </div>
            <div className='px-8 w-[78%]'>
                <MainRight />
            </div>
        </div>
    )
}

export default AccountInformation