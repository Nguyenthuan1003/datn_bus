import React from 'react'
import { css } from '@emotion/react';
const RouteScheduleComponent = () => {
    
    return (
        <div css={cssRouteSchedule} className="w-[1128px] m-auto">
            <h3 className="text-4xl font-bold text-center">Route Schedule</h3>
            <div className="overflow-x-auto">
                <div className="mt-6 flex w-full flex-col gap-4 overflow-auto">
                    <div className='ant-row schedule-card'>
                        <div className='ant-col ant-col-6'>Tuyến xe</div>
                        <div className="ant-col ant-col-2">Loại xe</div>
                        {/* <div className="ant-col ant-col-3">Quãng đường</div>
                        <div className="ant-col ant-col-4">Thời gian hành trình </div>
                        <div className="ant-col ant-col-2">Giá vé</div> */}
                    </div>
                    <div className='schedule-card flex w-full flex-col gap-[6px] text-left'>
                        <div className='ant-row items-center'>
                            <div className='ant-col ant-col-6'>
                                <div className='flex w-full items-center gap-2'>
                                    <span className="font-medium text-orange">An Nhơn</span>
                                    {/* <img src="./images/icons/ic_double_arrow.svg" alt="arrow"></img> */}
                                    --
                                    <span>TP. Hồ Chí Minh</span>
                                </div>
                            </div>
                            <div className="ant-col ant-col-2">Limoshine</div>
                            {/* <div className="ant-col ant-col-3">100km</div>
                            <div className="ant-col ant-col-4">2 giờ </div>
                            <div className="ant-col ant-col-2">250.000đ</div> */}
                            <div className="ant-col ant-col-6 ">
                               <div className='flex justify-end'>
                               <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                    <span>Tìm tuyến xe</span>
                                </button>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RouteScheduleComponent
const cssRouteSchedule = css`
.schedule-card {
    border: 1px solid #dde2e8;
    border-radius: 16px;
    max-height: 144px;
    padding: 16px 12px 12px;
    overflow: overlay;
    min-width: 810px;
}
.ant-col {
    position: relative;
    max-width: 100%;
    min-height: 1px;
}

.ant-row {
    flex-flow: row wrap;
    min-width: 0;
}
.ant-row, .ant-row:after, .ant-row:before {
    display: flex;
}
.ant-col-6 {
    display: block;
    flex: 0 0 25%;
    max-width: 25%;
}
.ant-col-2 {
    display: block;
    flex: 0 0 8.33333333%;
    max-width: 8.33333333%;
}
.ant-col-3 {
    display: block;
    flex: 0 0 12.5%;
    max-width: 12.5%;
}
.ant-col-4 {
    display: block;
    flex: 0 0 16.66666667%;
    max-width: 16.66666667%;
}

.items-center {
    align-items: center !important;
}
.ant-btn-round {
    height: 32px;
    padding: 4px 16px;
    font-size: 14px;
    border-radius: 32px;
}
.ant-btn, .ant-btn:active, .ant-btn:focus {
    outline: 0;
}
`