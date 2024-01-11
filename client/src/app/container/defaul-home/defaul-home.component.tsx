import React from 'react'
import { Outlet } from 'react-router-dom'

const DefaulHomeComponent = () => {
    return (
        <>
            <div className='mt-3'>
                <Outlet />
            </div>
        </>
    )
}

export default DefaulHomeComponent