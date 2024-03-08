import React, { useState } from 'react'
import { Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { css } from '@emotion/react'
import ButtonRadiusCompoennt from '~/app/component/parts/button/button.component'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { axiosPrivate } from '~/app/api/configHTTp'

const { RangePicker } = DatePicker

const initialFormState = {
  startLocation: '',
  endLocation: '',
  startDate: dayjs('2024-01-01'),
  endDate: dayjs('2024-01-01'),
  ticketCount: 1
}

const FormToFromComponent = () => {
  const [formData, setFormData] = useState(initialFormState)
  const [value, setValue] = useState(1)
  const [errorMessage, setErrorMessage] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }
  const ButtonRadiusComponent = ({ content, onClick }) => <button onClick={onClick}>{content}</button>
  // const defaultDate = dayjs('2024-01-01')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axiosPrivate.get(
        `/search/trip?start_location=${formData.startLocation}&end_location=${
          formData.endLocation
        }&start_time=${formData.startDate.toISOString()}&ticket_count=${formData.ticketCount}`
      )

      const data = await response.data
      console.log(data)
      setSearchResults(data)

      // history.push(`/buy-search-results`);
    } catch (error) {
      console.log('Failed to fetch data')
    }

    setFormData(initialFormState)
  }
  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p>{errorMessage}</p>}
      <div css={formCss}>
        <div className='flex justify-between'>
          <div>
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>Một chiều</Radio>
              <Radio value={2}>Khứ hồi</Radio>
            </Radio.Group>
          </div>
          <div className='text-orange-600'>Hướng dẫn mua vé</div>
        </div>

        <div className='mt-2 flex justify-between'>
          <div className='flex'>
            <div>
              <div className='mb-2 font-semibold text'>điểm đi</div>
              <input
                className='input-search font-semibold'
                value={formData.startLocation}
                onChange={(e) => setFormData({ ...formData, startLocation: e.target.value })}
              />
            </div>
            <img src='https://futabus.vn/images/icons/switch_location.svg' alt='' className='mt-7' />

            <div>
              <div className='mb-2 font-semibold text'>điểm đến</div>
              <input
                className='input-search font-semibold'
                value={formData.endLocation}
                onChange={(e) => setFormData({ ...formData, endLocation: e.target.value })}
              />
            </div>
          </div>

          <div>
            <div className='mb-2 font-semibold text'>ngày đi</div>
            <p className='input-search font-semibold'>
              {' '}
              <DatePicker
                defaultValue={formData.startDate}
                suffixIcon={null}
                style={{ border: 'none' }}
                onChange={(date) => setFormData({ ...formData, startDate: dayjs(date) })}
              />
            </p>
          </div>

          <div>
            <div className='mb-2 font-semibold text'>ngày về</div>
            <p className='input-search font-semibold'>
              {' '}
              <DatePicker
                defaultValue={formData.endDate}
                suffixIcon={null}
                style={{ border: 'none' }}
                onChange={(date) => setFormData({ ...formData, endDate: dayjs(date) })}
              />
            </p>
          </div>

          <div>
            <div className='mb-2 font-semibold text'>số vé</div>
            <input
              className='input-search font-semibold'
              value={formData.ticketCount}
              onChange={(e) => setFormData({ ...formData, ticketCount: parseInt(e.target.value) })}
            />
          </div>
        </div>

        <div className='mt-3 '>
          <div className='font-semibold text'>Tìm kiếm gần đây</div>
          <div className=' mt-2 bg-gray-100 view-search'>
            <p className='font-medium'> An Giang - Bà Rịa- Vũng Tàu</p>
            <p className='text-gray-500 font-semibold text-[14px]'>18-01-2024</p>
          </div>
        </div>

        <div className='button-wrapper'>
          <Link
            to={`/buy-search-results?start_location=${formData.startLocation}&end_location=${
              formData.endLocation
            }&start_time=${formData.startDate.toISOString()}&ticket_count=${formData.ticketCount}`}
          >
            <ButtonRadiusCompoennt content='Tìm chuyến xe' onSubmit={handleSubmit} />
          </Link>
        </div>
      </div>
    </form>
  )
}

export default FormToFromComponent
const formCss = css`
  background: #fff;
  border: 1px solid var(--color-blue-primary);
  border-radius: 1rem;
  padding: 1.5rem;
  outline: 8px solid #e0f2fe;

  .input-search {
    width: 200px;
    border: 1px solid #dde2e8;
    padding: 12px 5px;
    border-radius: 8px;
    line-height: 37px;
  }
  .view-search {
    width: 200px;
    border: 1px solid #dde2e8;
    padding: 0px 5px;
    border-radius: 8px;
    line-height: 37px;
    font-size: 14px;
  }
  .text {
    font-size: 15px;
    margin-left: 20px;
  }

  .button-wrapper {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
`
