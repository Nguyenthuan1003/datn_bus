import React from 'react'
import { Button, Result } from 'antd'
import { BsFillShareFill } from 'react-icons/bs'

type Props = {}

const SuccessComponent = (props: Props) => {

    const tickets = [];

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <button type="button">Next</button>,
      prevArrow: <button type="button">Prev</button>,
    };
  return (
    <>
      <Result
        status='success'
        title='Mua vé xe thành công'
        subTitle='LetGo5 đã gửi thông tin vé đã đặt vào email của bạn. Vui lòng kiểm tra email để xem thông tin chi tiết. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!'
      />
      <div className='border-[2px] border-gray-200 mx-12 rounded-[10px] overflow-hidden'>
        <div className='bg-gray-100'>
          <h2 className='text-[25px] font-bold py-4 text-center'>Thông tin mua vé</h2>
        </div>
        <div className='flex mt-8'>
          <div className='flex-col ml-10'>
            <div className='flex'>
              <p className='text-gray-400 font-medium'>Họ và tên:</p>
              <strong className='ml-14'>Nguyễn Phan Tùng Dương</strong>
            </div>
            <div className='flex py-4'>
              <p className='text-gray-400 font-medium'>Số điện thoại:</p>
              <strong className='ml-8'>0987654321</strong>
            </div>
            <div className='flex'>
              <p className='text-gray-400 font-medium'>Email:</p>
              <strong className='ml-[85px]'>duong.nguyen@futa.vn</strong>
            </div>
          </div>

          <div className='flex-col ml-[450px]'>
            <div className='flex'>
              <p className='text-gray-400 font-medium'>Tổng giá vé:</p>
              <strong className='ml-5'>2,000,000đ</strong>
            </div>
            <div className='flex py-4'>
              <p className='text-gray-400 font-medium'>PTTT:</p>
              <strong className='ml-[65px]'>VNPAY</strong>
            </div>
            <div className='flex'>
              <p className='text-gray-400 font-medium'>Trạng thái:</p>
              <strong className='ml-[30px] text-green-400'>Thanh toán thành công</strong>
            </div>
          </div>
        </div>

        <div className='flex my-10 gap-10 justify-center'>
          <div className='flex-col border-[2px] rounded-[8px] border-gray-200 pt-4'>
            <div className='flex '>
              <div className='bg-gray-200 rounded-full p-3 ml-5 mr-10'>
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
                <p className='font-semibold text-[18px]'>Mã vé E7GZF8</p>
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
            <div>
              <img
                alt='qr code'
                loading='lazy'
                decoding='async'
                data-nimg='fill'
                className='w-[270px] mx-auto'
                src='https://api.futabus.vn/ticket-online/api/qrcode?Content=https%3A%2F%2Fgateway.zalopay.vn%2Fopeninapp%3Forder%3DeyJ6cHRyYW5zdG9rZW4iOiJBQ243YkdaU2p5WmZ6OEJHZUZKRC1CbXciLCJhcHBpZCI6MzYwfQ%3D%3D&amp;Size=180&amp;Color=Black&amp;Logo=zalopay.png'
              />
            </div>
            <div className='text-justify'>
              <div className='flex gap-28 ml-7'>
                <div className='font-bold text-gray-400'>Tuyến xe</div>
                <div className='text-green-700 font-normal'>Sài Gòn - Cần Thơ</div>
              </div>
              <div className='flex gap-[125px] ml-7'>
                <div className='font-bold text-gray-400'>Thời gian</div>
                <div className='text-green-700 font-normal'>23:00 27/5/2022</div>
              </div>
              <div className='flex gap-[230px] ml-7'>
                <div className='font-bold text-gray-400'>Số ghế</div>
                <div className='text-green-700 font-normal'>A08</div>
              </div>
              <div className='flex ml-7'>
                <p className='font-bold text-gray-400'>Điểm lên xe</p>
                <div className='flex-col font-normal text-right ml-[12px]'>
                  <strong>VP BX Miền Tây</strong>
                  <p className='w-[210px] text-gray-400'>395 Kinh Dương Vương, P. An Lạc, Q. Bình Tân, TP.HCM</p>
                </div>
              </div>
              <div className='flex gap-[195px] ml-7'>
                <div className='font-bold text-gray-400'>Giá vé</div>
                <div className='font-normal'>160,000đ</div>
              </div>
            </div>
            <div className='text-center text-green-700 mt-4 bg-gray-200'>
              <p className='w-[310px] mx-auto leading-[22px] py-2'>
                Mang mã vé đến văn phòng để đổi vé lên xe trước giờ xuất bến ít nhất 60 phút.
              </p>
            </div>
          </div>
        </div>
        <div className='flex justify-center mb-10'>
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
    </>
  )
}

export default SuccessComponent
