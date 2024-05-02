import { css } from '@emotion/react'
import React from 'react'
import FilterDataComponent from './component/filter-data/filter-data.component'
import MainSearchResults from './component/main-results/main-results.component'
import FormToFromComponent from '../home/component/form-to-from/form-to-from.component'

const BusSearchResults = () => {
  return (
    <div css={buySearchCss} className='flex-col w-[1128px] m-auto'>
      <FormToFromComponent />
      <div className="flex mt-10">
        <div>
          <FilterDataComponent />
        </div>
        <div className='px-6'>
          {/* <div className='flex mt-3'>
            <div className='text-2lg flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border px-4 py-1 icon-orange border-[#FCDACE] bg-[#FEF6F3] text-orange'>
              <img src='	https://futabus.vn/images/icons/save_money.svg' alt='' />
              Giá rẻ bất ngờ
            </div>
            <div className='px-3'>
              <div className='text-2lg flex cursor-pointer items-center  justify-center gap-2 whitespace-nowrap rounded-md border px-4 py-1 icon-orange border-[#FCDACE] bg-[#FEF6F3] text-orange'>
                <img src='	https://futabus.vn/images/icons/clock.svg' alt='' />
                Giờ khởi hành
              </div>
            </div>

            <div className='text-2lg flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border px-4 py-1 icon-orange border-[#FCDACE] bg-[#FEF6F3] text-orange'>
              <img src='https://futabus.vn/images/icons/seat.svg' alt='' />
              Ghế trống
            </div>
          </div> */}
          <MainSearchResults />
        </div>
      </div>
    </div>
  )
}

export default BusSearchResults

const buySearchCss = css``
