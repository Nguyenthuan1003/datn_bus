import React, { useState } from 'react'
import { css } from '@emotion/react'
import { Controller, useForm } from 'react-hook-form'
import ButtonRadiusCompoennt from '~/app/component/parts/button/button.component'
import { yupResolver } from '@hookform/resolvers/yup'
import { validateCheckTicket } from '../../../utils/validateForm'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { axiosPrivate } from '~/app/api/confighHTTp'
import { Link } from 'react-router-dom'
import { AiOutlineCheck } from 'react-icons/ai'

const CheckTicketComponent = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validateCheckTicket)
  })

  const [errorMessage, setErrorMessage] = useState(null)
  const [showModal, setShowModal] = React.useState(false)
  const [ticketData, setTicketData] = useState(null)
  const [isTicketCheckedIn, setIsTicketCheckedIn] = useState(false)

  const onSubmit = async (data: any) => {
    event.preventDefault()
    try {
      const response = await axiosPrivate.get(
        `/ticket/find-ticket?phone_number=${data.phoneNumber}&code_ticket=${data.ticket}`
      )
      if (response.status >= 200 && response.status < 300 && response.data && response.data.ticket) {
        const isCheckedIn = localStorage.getItem(`ticket_${response.data.ticket.code_ticket}_isCheckedIn`) === 'true'
        // const isCheckedIn = response.data.ticket.isCheckedIn
        setTicketData(response.data)
        setIsTicketCheckedIn(isCheckedIn)
        setShowModal(false)
        setErrorMessage(null)
      } else {
        setTicketData(null)
        setShowModal(true)
      }
    } catch (error) {
      console.error('Error:', error)
      setTicketData(null)
      setShowModal(true)
    }
  }

  const handleCheckIn = async () => {
    console.log('handleCheckIn called')

    if (!ticketData || !ticketData.ticket) {
      console.log('No ticket data available for checkin')
      toast.error('No ticket data available for checkin')
      return
    }

    try {
      console.log('Calling checkin API')
      const response = await axiosPrivate.post('/ticket/checkin', {
        code_ticket: ticketData.ticket.code_ticket
      })

      console.log('Checkin API response:', response)

      if (response.status >= 200 && response.status < 300) {
        setIsTicketCheckedIn(true)
        localStorage.setItem(`ticket_${ticketData.ticket.code_ticket}_isCheckedIn`, 'true')
        alert('Checkin thành công')
      } else {
        console.log('Checkin failed')
      }
    } catch (error) {
      console.error('Failed to check in:', error)
      toast.error('Checkin failed')
    }
  }
  return (
    <div css={ticketCss} className='w-[1128px] mx-auto mt-[50px] mb-[20px]'>
      <h2>TRA CỨU THÔNG TIN ĐẶT VÉ</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='w-[600px] m-auto'>
        <div className=''>
          <Controller
            control={control}
            name='phoneNumber'
            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
              <input
                placeholder='Vui lòng nhập số điện thoại'
                className=''
                type='text'
                value={value}
                onChange={onChange}
                ref={ref}
              />
            )}
          />
          {errors && <span className='text-red-600'>{errors.phoneNumber?.message}</span>}
        </div>

        <div className='my-5'>
          <Controller
            control={control}
            name='ticket'
            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
              <input
                placeholder='Vui lòng nhập mã vé'
                className=''
                type='text'
                value={value}
                onChange={onChange}
                ref={ref}
              />
            )}
          />
          {errors && <span className='text-red-600'>{errors.ticket?.message}</span>}
        </div>

        <div className='text-center'>
          <ButtonRadiusCompoennt type='submit' content='Tra cứu' />
        </div>
      </form>
      {ticketData && ticketData.ticket && (
        <div className='border-[2px] border-gray-200 mx-12 mt-5 rounded-[10px] overflow-hidden'>
          <div className='bg-gray-100'>
            <h2 className='text-[25px] font-bold py-4 text-center'>Thông tin vé</h2>
          </div>
          <div className='flex my-10 gap-10 justify-center'>
            <div className='flex-col border-[2px] rounded-[8px] border-gray-200 pt-4'>
              <div className='flex '>
                <Link to='' className='bg-gray-200 rounded-full p-4 ml-5 mr-10'>
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
                </Link>
                <div className='mx-2 mt-3'>
                  <p className='font-semibold text-[18px]'>Mã vé {ticketData.ticket.code_ticket}</p>
                </div>
                <Link to='' className='bg-gray-200 rounded-full p-4 ml-9 mr-6'>
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
                </Link>
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
                <div className='flex ml-7 mt-10 justify-between'>
                  <div className='font-bold text-gray-400'>Tuyến xe</div>
                  <div className='text-green-700 font-normal w-[200px]'>{ticketData.ticket.route_name}</div>
                </div>
                <div className='flex ml-7 mt-2 justify-between'>
                  <div className='font-bold text-gray-400'>Thời gian</div>
                  <div className='text-green-700 font-normal w-[170px]'>{ticketData.ticket.start_time}</div>
                </div>
                <div className='flex justify-between ml-7 mt-2'>
                  <div className='font-bold text-gray-400'>Số ghế</div>
                  <div className='text-green-700 font-normal w-[160px]'>{ticketData.ticket.code_seat}</div>
                </div>
                <div className='flex ml-7 mt-2 justify-between'>
                  <div className='font-bold text-gray-400'>Điểm lên xe</div>
                  <div className=' font-normal w-[145px]'>{ticketData.ticket.pickup_location}</div>
                </div>
                <div className='flex ml-7 my-2 justify-between'>
                  <div className='font-bold text-gray-400'>Giá vé</div>
                  <div className='font-normal w-[128px]'>{ticketData.ticket.ticket_money}đ</div>
                </div>
              </div>
              {isTicketCheckedIn && <div className='used-ticket-overlay'>đã in vé</div>}
            </div>
          </div>
          <div className='flex justify-center mb-10'>
            {!isTicketCheckedIn ? (
              <button className='bg-[#fbeeea] rounded-full py-3 px-12 flex mr-5' onClick={handleCheckIn}>
                <svg
                  className='w-5 h-5'
                  stroke='currentColor'
                  fill='#e48666'
                  stroke-width='0'
                  viewBox='0 0 1024 1024'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z'></path>
                </svg>
                <p className='ml-2 text-[#e48666] font-bold'>Checkin</p>
              </button>
            ) : (
              <button className='bg-gray-400 rounded-full py-3 px-12 flex mr-5' disabled>
                <svg
                  className='w-5 h-5'
                  stroke='currentColor'
                  fill='white'
                  stroke-width='0'
                  viewBox='0 0 1024 1024'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z'></path>
                </svg>
                <p className='ml-2 text-white font-bold'>Checkin</p>
              </button>
            )}
          </div>
        </div>
      )}
      {showModal && (
        <div
          id='popup-modal'
          tabindex='-1'
          class={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 mt-28 ml-[640px] z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
            showModal ? '' : 'hidden'
          }`}
        >
          <div class='relative p-4 w-full max-w-md max-h-full'>
            <div class='relative bg-white rounded-lg shadow dark:bg-gray-700'>
              <button
                type='button'
                class='absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-hide='popup-modal'
                onClick={() => setShowModal(false)}
              >
                <svg
                  class='w-3 h-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
                <span class='sr-only'>Close modal</span>
              </button>
              <div class='p-4 md:p-5 text-center'>
                <svg
                  class='mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                  />
                </svg>
                <h3 class='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                  Không tìm thấy vé, vui lòng kiểm tra lại thông tin
                </h3>
                <button
                  data-modal-hide='popup-modal'
                  type='button'
                  class='text-white bg-[#007aff] hover:bg-[#5ac8fa] focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center'
                  onClick={() => setShowModal(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckTicketComponent

const ticketCss = css`
  input {
    width: 100%;
    padding: 6px 12px;
    border-radius: 8px;
    border: 1px solid #dde2e8;
    outline: none;
  }

  input:focus {
    border-color: orange;
    outline: none;
  }

  h2 {
    text-align: center;
    margin-bottom: 12px;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    color: #00613d;
  }
  .used-ticket-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: 200px;
    margin-left: 100px;
    transform: translate(-50%, -50%);
    color: red;
    font-size: 2em;
    font-weight: bold;
    text-transform: uppercase;
    pointer-events: none; /* allows clicks to pass through the overlay */
    z-index: 2; /* make sure it's above other content */
    padding: 10px;
    text-align: center;
    width: 100%;
  }
`
