import React from 'react'
import FormToFromComponent from "../home/component/form-to-from/form-to-from.component"
import VoucherComponent from "../home/component/voucher/voucher.component"
import NewsComponent from "../home/component/news/news.component"
import AppreciateComponent from "../home/component/appreciate/appreciate.component"
import ConnectComponent from "../home/component/connect/connect.component"
import PoppularComponent from "../home/component/popular/popular.component"

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
                <div style={{marginTop: '45px'}}>
                    <PoppularComponent />
                </div>
                <div>
                    <NewsComponent />
                </div>
                <div style={{marginTop: '45px'}}>
                    <AppreciateComponent />
                </div>

                <div style={{marginTop: '45px'}}>
                    <ConnectComponent />
                </div>
            </div>
        </div>

    )
}

export default HomeComponent
