import React from 'react'

const LocationScheduleComponent = () => {
  return (
    <div className='mt-2 flex h-96 justify-center overflow-y-auto rounded-b-xl bg-[#FBFBFB] px-1 pb-4'>
      <div className='relative flex w-full flex-col overflow-auto pb-20 '>
        {/* component */}
        <div className='relative flex items-start px-4 text-[15px] text-black'>
          <div className='absolute left-[78px] top-2 h-full border-r-2 border-dotted'></div>
          <span>17:05</span>
          <img className="z-10 mx-4 mt-1" src="https://futabus.vn/images/icons/pickup.svg" alt="start"></img>
          <div className="mb-4">
            <div>An Nhơn</div>
            <div className="text-gray text-[13px] leading-4">02 Nguyễn Văn Linh, P.Bình Định, Tx.An Nhơn, Tỉnh Bình Định
            </div>
          </div>
        </div>
        {/* component */}
        <div className='relative flex items-start px-4 text-[15px] text-black'>
          <div className='absolute left-[78px] top-2 h-full border-r-2 border-dotted'></div>
          <span>17:05</span>
          <img className="z-10 mx-4 mt-1" src="https://futabus.vn/images/icons/pickup.svg" alt="start"></img>
          <div className="mb-4">
            <div>An Nhơn</div>
            <div className="text-gray text-[13px] leading-4">02 Nguyễn Văn Linh, P.Bình Định, Tx.An Nhơn, Tỉnh Bình Định
            </div>
          </div>
        </div>
        <div className="relative flex items-start px-4 text-[15px] text-black">
          <span>06:25</span>
          <img className="z-10 mx-4 mt-1" src="https://futabus.vn/images/icons/station.svg" alt="start" /><div className="mb-4">
            <div>BX Mien Tay</div>
            <div className="text-gray text-[13px] leading-4">VP BX Miền Tây: 395 Kinh Dương Vương , P.An Lạc , Q.Bình Tân , TP.HCM
            </div>
          </div>
        </div>
      </div>
      <div className="relative bottom-0  rounded-b-lg bg-[#F7F7F7] px-4 py-2 text-[13px]">
        <span className="text-[15px] font-medium">Lưu ý</span><br />
        <span>Thời gian các mốc lịch trình là thời gian dự kiến. Lịch trình này có thể thay đổi tuỳ vào tình hình thực tế xuất bến sớm hay trễ.
        </span>
      </div>
    </div>
  )
}

export default LocationScheduleComponent