import { css } from '@emotion/react'
import React from 'react'
import ButtonRadiusCompoennt from '~/app/component/parts/button/button.component'

const MainSearchResults = () => {
    return (
        <div css={MainSearchCss}>
            <h2 className='font-semibold'>TP. Hồ Chí Minh - Bình Dương (51)</h2>

            <div className='flex mt-3'>
                <div className='text-2lg flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border px-4 py-1 icon-orange border-[#FCDACE] bg-[#FEF6F3] text-orange'>
                    <img src="	https://futabus.vn/images/icons/save_money.svg" alt="" />Giá rẻ bất ngờ
                </div>
                <div className='px-3'>
                    <div className='text-2lg flex cursor-pointer items-center  justify-center gap-2 whitespace-nowrap rounded-md border px-4 py-1 icon-orange border-[#FCDACE] bg-[#FEF6F3] text-orange'>
                        <img src="	https://futabus.vn/images/icons/clock.svg" alt="" />Giờ khởi hành
                    </div>
                </div>

                <div className='text-2lg flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border px-4 py-1 icon-orange border-[#FCDACE] bg-[#FEF6F3] text-orange'>
                    <img src="https://futabus.vn/images/icons/seat.svg" alt="" />Ghế trống
                </div>
            </div>

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
                            <span className='text-gray-400 px-2 text-[17px]'>Limousine</span>

                            <div className='h-[6px]  w-[6px] rounded-full bg-[#C8CCD3]'>

                            </div>
                            <span className='text-gray-400 px-2  text-[17px]'>22 chỗ trống</span>
                        </div>

                    </div>

                    <div className='flex items-center my-4 justify-between '>
                        <div className='font-medium'>
                            bến xe miền tây
                        </div>
                        <div>
                            <img className='w-[90px]' src="https://static.vexere.com/production/images/1690435601693.jpeg?w=250&h=250" alt="" />
                        </div>
                        <div className='font-medium'>
                            bến xe miền tây
                        </div>


                        <div className='text-[20px] font-bold text-[var(--color-orange)]'>
                            228.000đ
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
    )
}

export default MainSearchResults

const MainSearchCss = css`
.result{
    box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.2);
}

`