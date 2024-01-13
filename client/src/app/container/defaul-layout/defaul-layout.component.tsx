import React from 'react'
import { Outlet } from 'react-router-dom'

const DefaulLayoutComponent = () => {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default DefaulLayoutComponent