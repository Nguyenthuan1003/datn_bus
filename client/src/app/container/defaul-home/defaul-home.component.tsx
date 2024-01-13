import React from 'react'
import { Outlet } from 'react-router-dom'
import FooterComponent from '~/app/component/stacks/footer/footer.component'
import HeaderComponent from '~/app/component/stacks/header/header.component'

const DefaulHomeComponent = () => {
    return (
        <>
            <div>
                <HeaderComponent />
            </div>
            <div className='mt-[140px]'>
                <Outlet />
            </div>
            <div>
                <FooterComponent />
            </div>
        </>
    )
}

export default DefaulHomeComponent