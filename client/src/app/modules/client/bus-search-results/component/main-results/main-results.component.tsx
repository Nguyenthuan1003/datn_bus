import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import ButtonRadiusCompoennt from '~/app/component/parts/button/button.component'
import { useTripRedux } from '../../../redux/hook/useTripReducer'

const MainSearchResults = () => {
    const { data: { trips }, actions } = useTripRedux()
    useEffect(() => {
        actions.getAllTrip()
    }, [])

    console.log(trips)
    return (
        <div css={MainSearchCss}>
            {trips?.data?.trips?.map((item: any) => (
                <div className='mt-3'>
                    <h2 className='font-semibold'>{item?.route?.start_location}-{item?.route?.end_location}</h2>
                    
                    <div className='result mt-3'>
                        <div className='p-4'>
                            <div className='flex items-center'>
                                <div className='text-[20px]  font-bold px-2'>
                                    17:00
                                </div>

                                <div className='flex items-center'>
                                    <img src="https://futabus.vn/images/icons/pickup.svg" alt="" />
                                    <div className="text-gray-300">---------------</div>


                                    <span className='text-gray-400 text-center leading-4'>8 giờ
                                        <br />
                                        <span>(Asian/Ho Chi Minh)</span>
                                    </span>

                                    <div className="text-gray-300">---------------</div>
                                    <img src="https://futabus.vn/images/icons/station.svg" alt="" />

                                    <div className='text-[20px]  font-bold pl-2 pr-4'>
                                        17:00
                                    </div>
                                    <div className='h-[6px]  w-[6px] rounded-full bg-[#C8CCD3]'>

                                    </div>
                                    <span className='text-gray-400 px-2 text-[17px]'>{item?.car?.name}</span>

                                    <div className='h-[6px]  w-[6px] rounded-full bg-[#C8CCD3]'>

                                    </div>
                                    <span className='text-gray-400 px-2  text-[17px]'>22 chỗ trống</span>
                                </div>

                            </div>

                            <div className='flex items-center my-4 justify-between '>
                                <div className='font-medium'>
                                {item?.start_location}
                                </div>
                                <div>
                                    <img className='w-[90px]' src="https://static.vexere.com/production/images/1690435601693.jpeg?w=250&h=250" alt="" />
                                </div>
                                <div className='font-medium'>
                                    {item?.end_location}
                                </div>


                                <div className='text-[20px] font-bold text-[var(--color-orange)]'>
                                    {item?.trip_price}đ
                                </div>
                            </div>

                            <hr />

                            <div className='flex justify-between mt-4'>
                                <div className='flex'>
                                    <div className='font-medium'>
                                        Chọn ghế
                                    </div>
                                    <div className='px-3 font-medium'>
                                        Lịch trình
                                    </div>
                                    <div className='font-medium'>
                                        Trung chuyển
                                    </div>
                                    <div className='px-3 font-medium'>
                                        Chính sách
                                    </div>
                                </div>
                                <div>
                                    <ButtonRadiusCompoennt content='chọn chuyến' />
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            ))}




        </div>
    )
}

export default MainSearchResults

const MainSearchCss = css`
.result{
    box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.2);
}

`