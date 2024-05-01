
const TicketComponent = ({ dataTicket, data, dataQr }: any) => {
  const codeTicket = dataTicket?.code_ticket
  const price_trip = data?.trip?.trip_price
  const start_time = data?.trip?.start_time
  const route = localStorage.getItem('route')
  const datas = data
  const dataQrCode = dataQr

  return (
    <div>
      <div className='flex-col border-[2px] rounded-[8px] border-gray-200 pt-4'>
        <div className='flex justify-center align-items-center'>
          <div className='bg-gray-200 rounded-full p-4 ml-5 mr-10'>
            <svg
              className='w-6 h-6'
              stroke='currentColor'
              fill='gray'
              stroke-width='0'
              viewBox='0 0 1024 1024'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M505.7 661a8 8 0 0 0 12.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z'></path>
            </svg>
          </div>
          <div className='mx-2 mt-3'>
            <p className='font-semibold text-[18px]'>{codeTicket}</p>
          </div>
          <div className='bg-gray-200 rounded-full p-4 ml-9 mr-6'>
            <svg
              className='w-6 h-6'
              stroke='currentColor'
              fill='gray'
              stroke-width='0'
              viewBox='0 0 16 16'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z'></path>
            </svg>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexFlow: 'column',
            margin: '18px'
          }}
        >
          <p>
            <a href={dataQrCode?.ticket_url}>
              <img style={{ width: '150px', height: '150px' }} src={dataQrCode?.qr_code_image} alt='ticket-qrcode' />
            </a>
          </p>
        </div>

        {/* <div>
              <img
                alt='qr code'
                loading='lazy'
                decoding='async'
                data-nimg='fill'
                className='w-[270px] mx-auto'
                src='https://api.futabus.vn/ticket-online/api/qrcode?Content=https%3A%2F%2Fgateway.zalopay.vn%2Fopeninapp%3Forder%3DeyJ6cHRyYW5zdG9rZW4iOiJBQ243YkdaU2p5WmZ6OEJHZUZKRC1CbXciLCJhcHBpZCI6MzYwfQ%3D%3D&amp;Size=180&amp;Color=Black&amp;Logo=zalopay.png'
              />
            </div> */}
        <div className='text-justify'>
          <div className='flex gap-28 ml-7'>
            <div className='font-bold text-gray-400'>Tuyến xe</div>
            <div className='text-green-700 font-normal'>{route}</div>
          </div>
          <div className='flex gap-[125px] ml-7'>
            <div className='font-bold text-gray-400'>Thời gian</div>
            <div className='text-green-700 font-normal'>{start_time}</div>
          </div>
          <div className='flex gap-[145px] ml-7'>
            <div className='font-bold text-gray-400'>Mã ghế</div>
            <div className='text-green-700 font-normal'>{dataTicket?.code_seat}</div>
          </div>
          <div className='flex ml-7'>
            <p className='font-bold text-gray-400'>Điểm lên xe</p>
            <div className='flex-col font-normal text-right ml-[12px]'>
              {/* <strong>{dataTicket?.pay_location}</strong> */}
              <p className='w-[195px] text-gray-500'>{dataTicket?.pay_location}</p>
            </div>
          </div>
          <div className='flex ml-7'>
            <p className='font-bold text-gray-400'>Điểm xuống xe</p>
            <div className='flex-col font-normal text-right ml-[12px]'>
              {/* <strong>{dataTicket?.pickup_location}</strong> */}
              <p className='w-[175px] text-gray-500'>{dataTicket?.pickup_location}</p>
            </div>
          </div>
          <div className='flex gap-[195px] ml-7'>
            <div className='font-bold text-gray-400'>Giá vé</div>
            <div className='font-normal'>{price_trip}đ</div>
          </div>
        </div>
        <div className='text-center text-green-700 mt-4 bg-gray-200'>
          {/* <p className='w-[310px] mx-auto leading-[22px] py-2'>
            Mang mã vé đến văn phòng để đổi vé lên xe trước giờ xuất bến ít nhất 60 phút.
          </p> */}
        </div>
      </div>
      <div className='flex justify-center m-5'>
        <div className='bg-[#fbeeea] rounded-full py-3 px-12 flex mr-5'>
          <svg
            className='w-6 h-6'
            stroke='currentColor'
            fill='#e48666'
            stroke-width='0'
            viewBox='0 0 16 16'
            height='1em'
            width='1em'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z'></path>
          </svg>
          <p className='ml-2 text-[#e48666] font-bold'>Chia sẻ</p>
        </div>
        <div className='flex bg-[#fbeeea] rounded-full py-3 px-14'>
          <svg
            className='w-6 h-6'
            stroke='currentColor'
            fill='#e48666'
            stroke-width='0'
            viewBox='0 0 1024 1024'
            height='1em'
            width='1em'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M505.7 661a8 8 0 0 0 12.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z'></path>
          </svg>
          <p className='ml-2 text-[#e48666] font-bold'>Tải về</p>
        </div>
      </div>
    </div>
  )
}

export default TicketComponent
