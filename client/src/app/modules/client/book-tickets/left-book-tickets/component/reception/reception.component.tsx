import { css } from '@emotion/react'
import { BsInfoLg } from "react-icons/bs";

const Reception = () => {
    return (
        <div css={receptioncss} className='bg-white px-4'>
            <div className=''>
                <h2 className='flex items-center py-3 font-semibold text-[18px]'>Thông tin đón trả <span><BsInfoLg className='text-orange-600 text-[20px]' /></span></h2>
            </div >

            <div className='flex justify-between'>
                <div className='w-[340px]'>
                    <h2 className='text-[17px] font-medium'>Điểm đón</h2>
                    <div className='flex'>

                        <div className='flex items-center'>
                            <input type="radio" />
                            <p className='px-2'>Điểm đón</p>
                        </div>

                        <div className='flex items-center'>
                            <input type="radio" />
                            <p className='px-2'>Trung chuyển</p>
                        </div>
                        <div>
                            <span><BsInfoLg className='text-orange-600 text-[20px]' /></span>
                        </div>
                    </div>

                    <div className='py-6'>
                        <input type="text" className='w-[315px]' />
                    </div>
                </div>

                <div className='border-l-2 border-gray-300 px-3'></div>
                <div className='w-[340px]'>
                    <h2 className='text-[17px] font-medium'>Điểm trả</h2>
                    <div className='flex'>

                        <div className='flex items-center'>
                            <input type="radio" />
                            <p className='px-2'>Điểm đón</p>
                        </div>

                        <div className='flex items-center'>
                            <input type="radio" />
                            <p className='px-2'>Trung chuyển</p>
                        </div>

                        <div>
                            <span><BsInfoLg className='text-orange-600 text-[20px]' /></span>
                        </div>
                    </div>

                    <div className='py-6'>
                        <input type="text" className='w-[315px]' />
                    </div>
                </div>
            </div>
        </div >

    )
}

export default Reception

const receptioncss = css`
input {
    padding: 6px 12px;
    border-radius: 8px;
    border: 1px solid #dde2e8;
    outline: none;
}
input:focus {
border-color: black;

`