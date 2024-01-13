import { css } from '@emotion/react'
import React from 'react'

const FilterDataComponent = () => {
    return (
        <div css={filterCss} className='w-[360px]'>
            <div className='p-4'>
                <h2 >BỘ LỌC TÌM KIẾM</h2>
                <div className='mt-4'>
                    Giờ đi

                    <div className='pt-2'>
                        <input type="checkbox" className="h-4 w-4" /> Sáng sớm 00:00 - 06:00 (0)
                    </div>

                    <div className='py-2'>
                        <input type="checkbox" className="h-4 w-4" /> Buổi sáng 06:00 - 12:00 (0)
                    </div>

                    <div>
                        <input type="checkbox" className="h-4 w-4" /> Buổi chiều 12:00 - 18:00 (0)
                    </div>

                    <div className='py-2'>
                        <input type="checkbox" className="h-4 w-4" /> Sáng sớm 00:00 - 06:00 (0)
                    </div>
                </div>

                <hr />
                <div className='my-4'>
                    <h2>Loại xe</h2>

                    <div className='flex mt-2'>
                        <div className='cursor-pointer rounded-md border bg-white py-1 px-3 text-[14px] font-normal border-[#DDE2E8]'>
                            Ghế
                        </div>
                        <div className='px-4'>
                            <div className='cursor-pointer rounded-md border bg-white py-1 px-3 text-[14px] font-normal border-[#DDE2E8]'>
                                Giường
                            </div>
                        </div>
                        <div className='cursor-pointer rounded-md border bg-white py-1 px-3 text-[14px] font-normal border-[#DDE2E8]'>
                            Limousine
                        </div>
                    </div>
                </div>
                <hr />

                <div className='my-4'>
                    <h2>Hàng ghế</h2>

                    <div className='flex mt-2'>
                        <div className='cursor-pointer rounded-md border bg-white py-1 px-3 text-[14px] font-normal border-[#DDE2E8]'>
                            Hàng đầu
                        </div>
                        <div className='px-4'>
                            <div className='cursor-pointer rounded-md border bg-white py-1 px-3 text-[14px] font-normal border-[#DDE2E8]'>
                                Hàng giữa
                            </div>
                        </div>
                        <div className='cursor-pointer rounded-md border bg-white py-1 px-3 text-[14px] font-normal border-[#DDE2E8]'>
                            Hàng cuối
                        </div>
                    </div>
                </div>

                <hr />
                <div className='mt-4'>
                    <h2>Tầng</h2>

                    <div className='flex mt-2'>
                        <div className='cursor-pointer rounded-md border bg-white py-1 px-3 text-[14px] font-normal border-[#DDE2E8]'>
                            Tầng trên
                        </div>
                        <div className='px-4'>
                            <div className='cursor-pointer rounded-md border bg-white py-1 px-3 text-[14px] font-normal border-[#DDE2E8]'>
                                Tầng dưới
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterDataComponent

const filterCss = css`
box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.2);

`