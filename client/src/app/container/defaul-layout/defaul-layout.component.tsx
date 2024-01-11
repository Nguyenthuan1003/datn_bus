import React from 'react'
import { Outlet } from 'react-router-dom'

const DefaulLayoutComponent = () => {
    return (
        <div>
            <header>Header</header>
            <Outlet />
            <footer>footer</footer>
        </div>
    )
}

export default DefaulLayoutComponent