import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { Controller, useForm } from 'react-hook-form'
import ButtonRadiusCompoennt from '~/app/component/parts/button/button.component'
import { yupResolver } from '@hookform/resolvers/yup'
import { validateCheckBill } from '../../../utils/validateForm'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { axiosPrivate } from '~/app/api/confighHTTp'
import { Link } from 'react-router-dom'
import { AiOutlineCheck } from 'react-icons/ai'

const CheckBillComponent = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(validateCheckBill)
  })

  useEffect(() => {
    // Get the URLSearchParams object from the URL
    const params = new URLSearchParams(window.location.search)

    // Get the value of the 'phone_number' parameter
    const phoneNumber = params.get('phone_number')

    // Get the value of the 'code_ticket' parameter
    const codeBill = params.get('code_bill')

    // Set the values of the input fields using setValue
    setValue('phoneNumber', phoneNumber || '') // If phoneNumber is null, set an empty string
    setValue('bill', codeBill || '') // If codeTicket is null, set an empty string
  }, [setValue]) // Dependency array includes setValue to ensure it's called only once after the component mounts

  const [errorMessage, setErrorMessage] = useState(null)
  const [showModal, setShowModal] = React.useState(false)
  const [billData, setBillData] = useState(null)
  const [isBillCheckedIn, setIsBillCheckedIn] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)

  const onSubmit = async (data: any) => {
    event.preventDefault()
    try {
      const response = await axiosPrivate.get(`/bill/find-bill?phone_number=${data.phoneNumber}&code_bill=${data.bill}`)
      if (response.status >= 200 && response.status < 300 && response.data && response.data.bill) {
        setBillData(response.data.bill)
        setShowModal(false)
        setErrorMessage(null)
      } else {
        setBillData(null)
        setShowModal(true)
        setErrorMessage(response.data.message)
      }
    } catch (error) {
      toast.error('Error: ' + error.response.data.message)
      setBillData(null)
      setShowModal(true)
      setErrorMessage(error.response.data.message)
    }
  }

  // Hàm để checkin một vé cụ thể
  const handleSingleCheckIn = async (ticketCode, status, status_pay) => {
    if (status === 1 && status_pay === 1) {
      return
    }
    try {
      const response = await axiosPrivate.post(`/ticket/checkin`, { code_ticket: ticketCode })

      if (response.status >= 200 && response.status < 300 && !response.data.error) {
        setBillData((prevState) =>
          prevState.map((ticket) =>
            ticket.code_ticket === ticketCode ? { ...ticket, status: 1, status_pay: 1 } : ticket
          )
        )
        toast.success(response.data.message)
        setSuccessMessage(response.data.message)
        setShowSuccessModal(true)
      } else {
        setShowModal(true)
        setErrorMessage(response.data.message)
      }
    } catch (error) {
      toast.error('Error: ' + error.response.data.message)
      setShowModal(true)
      setErrorMessage(error.response.data.message)
    }
  }

  // Hàm để checkin tất cả vé
  //   const handleAllCheckIn = async () => {
  //     for (let ticket of billData) {
  //       await handleSingleCheckIn(ticket.code_ticket, ticket.status, ticket.status_pay)
  //     }
  //   }
  const handleAllCheckIn = async () => {
    const checkInPromises = billData
      .filter((ticket) => ticket.status !== 1 || ticket.status_pay !== 1)
      .map((ticket) => ({
        promise: axiosPrivate.post(`/ticket/checkin`, { code_ticket: ticket.code_ticket }),
        ticket
      }))

    try {
      const responses = await Promise.all(checkInPromises.map(({ promise }) => promise))

      responses.forEach((response, index) => {
        if (response.status >= 200 && response.status < 300 && !response.data.error) {
          const { ticket } = checkInPromises[index]

          setBillData((prevState) => {
            // Update the ticket status in the state
            return prevState.map((t) => (t.code_ticket === ticket.code_ticket ? { ...t, status: 1, status_pay: 1 } : t))
          })

          toast.success(response.data.message)
          setSuccessMessage(response.data.message)
          setShowSuccessModal(true)
        } else {
          setShowModal(true)
          setErrorMessage(response.data.message)
        }
      })
    } catch (error) {
      toast.error('Error: ' + error.response.data.message)
      setShowModal(true)
      setErrorMessage(error.response.data.message)
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
            defaultValue='' // Set default value to an empty string
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
            name='bill'
            defaultValue='' // Set default value to an empty string
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
          {errors && <span className='text-red-600'>{errors.bill?.message}</span>}
        </div>

        <div className='text-center'>
          <ButtonRadiusCompoennt type='submit' content='Tra cứu' />
        </div>
      </form>
      {billData && (
        <div className='border-[2px] border-gray-200 mt-5 rounded-[10px] overflow-hidden grid grid-cols-2 gap-4 justify-items-center mx-auto'>
          <h2 className='text-[25px] font-bold py-4 text-center col-span-2'>Thông tin vé</h2>
          {billData.map((ticket, index) => (
            <div className='flex my-10 gap-10 justify-center w-full sm:w-auto'>
              <div className='relative'>
                <div className='flex-col border-[2px] rounded-[8px] border-gray-200 pt-4 w-full sm:w-[380px]'>
                  <div className='flex'>
                    <div className='mt-3 mx-auto'>
                      <p className='font-semibold text-[18px] text-center'>Mã vé {ticket.code_ticket}</p>
                    </div>
                  </div>
                  <div className='text-justify'>
                    <div className='flex ml-7 mt-10 justify-between'>
                      <div className='font-bold text-gray-400'>Tuyến xe</div>
                      <div className='text-green-700 font-normal w-[200px]'>{ticket.route_name}</div>
                    </div>
                    <div className='flex ml-7 mt-2 justify-between'>
                      <div className='font-bold text-gray-400'>Thời gian</div>
                      <div className='text-green-700 font-normal w-[170px]'>{ticket.start_time}</div>
                    </div>
                    <div className='flex justify-between ml-7 mt-2'>
                      <div className='font-bold text-gray-400'>Số ghế</div>
                      <div className='text-green-700 font-normal w-[160px]'>{ticket.code_seat}</div>
                    </div>
                    <div className='flex ml-7 mt-2 justify-between'>
                      <div className='font-bold text-gray-400'>Điểm lên xe</div>
                      <div className=' font-normal w-[145px]'>{ticket.pickup_location}</div>
                    </div>
                    <div className='flex ml-7 mt-2 mb-5 justify-between'>
                      <div className='font-bold text-gray-400'>Giá vé</div>
                      <div className='font-normal w-[128px]'>{ticket.ticket_money}đ</div>
                    </div>
                  </div>
                  <div className='used-ticket-overlay'>
                    {ticket.status === 1 && ticket.status_pay === 1 && <div>đã checkin</div>}
                  </div>
                </div>
                {!(ticket.status === 1 && ticket.status_pay === 1) && (
                  <button
                    className='bg-[#fbeeea] rounded-full py-3 px-12 flex mx-auto mt-3'
                    onClick={() => handleSingleCheckIn(ticket.code_ticket)}
                  >
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
                )}
              </div>
            </div>
          ))}
          {billData && billData.some((ticket) => ticket.status !== 1 || ticket.status_pay !== 1) && (
            <button
              className='my-4 flex bg-[#fbeeea]  py-3 px-12 text-[#e48666] font-bold rounded-full col-span-2'
              onClick={handleAllCheckIn}
            >
              <svg
                className='w-5 h-5 mr-2'
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
              Checkin toàn bộ vé
            </button>
          )}
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
                  {errorMessage && <div className='error-message'>{errorMessage}</div>}
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
      {showSuccessModal && (
        <div
          id='success-modal'
          tabindex='-1'
          class={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 mt-28 ml-[640px] z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
            showSuccessModal ? '' : 'hidden'
          }`}
        >
          <div class='relative p-4 w-full max-w-md max-h-full'>
            <div class='relative bg-white rounded-lg shadow dark:bg-gray-700'>
              <button
                type='button'
                class='absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-hide='success-modal'
                onClick={() => setShowSuccessModal(false)}
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
                <h3 class='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>{successMessage}</h3>
                <button
                  data-modal-hide='success-modal'
                  type='button'
                  class='text-white bg-[#007aff] hover:bg-[#5ac8fa] focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center'
                  onClick={() => setShowSuccessModal(false)}
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

export default CheckBillComponent

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
    transform: translate(-50%, -50%);
    color: red;
    font-size: 2em;
    font-weight: bold;
    text-transform: uppercase;
    pointer-events: none; /* allows clicks to pass through the overlay */
    z-index: 2; /* make sure it's above other content */
    text-align: center;
    width: 100%;
  }
`
