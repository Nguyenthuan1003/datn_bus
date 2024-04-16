import React, { useState, useEffect } from 'react'
import { Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { css } from '@emotion/react'
import ButtonRadiusCompoennt from '~/app/component/parts/button/button.component'
import { DatePicker, Select } from 'antd'
import dayjs from 'dayjs'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { axiosPrivate } from '~/app/api/confighHTTp'

const { RangePicker } = DatePicker
const { Option } = Select

const initialFormState = {
  startLocation: '',
  endLocation: '',
  startDate: dayjs(),
  endDate: dayjs(),
  ticketCount: 1
}

const FormToFromComponent = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const [formData, setFormData] = useState({
    startLocation: searchParams.get('start_location') || '',
    endLocation: searchParams.get('end_location') || '',
    startDate: searchParams.get('start_time') ? dayjs(searchParams.get('start_time')) : dayjs(),
    endDate: searchParams.get('end_time') ? dayjs(searchParams.get('end_time')) : dayjs(),
    ticketCount: searchParams.get('ticket_count') || 1
  })
  const [value, setValue] = useState(1)
  const [errorMessage, setErrorMessage] = useState<any>(null)
  const [searchResults, setSearchResults] = useState<any>([])
  const [locations, setLocations] = useState<any>([])
  const navigate = useNavigate()

  const inputWidth = value === 1 ? '250px' : '200px'

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }

  const disablePastDate = (current: any) => {
    return current && current < dayjs().startOf('day')
  }

  const ButtonRadiusComponent = ({ content, onClick }: any) => <button onClick={onClick}>{content}</button>

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axiosPrivate.get('/getparentlocations')
        const locations = response.data

        if (!formData.startLocation && locations.length > 0) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            startLocation: locations[0].name,
            endLocation: locations.length > 1 ? locations[1].name : locations[0].name
          }))
        }

        setLocations(locations)

        const searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]')
        setSearchResults(searchHistory)
      } catch (error) {
        console.log('Failed to fetch locations:', error)
      }
    }

    fetchLocations()
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      const storedFormData = localStorage.getItem('formData')
      if (storedFormData) {
        const parsedData = JSON.parse(storedFormData)
        setFormData({
          ...parsedData,
          startDate: dayjs(parsedData.startDate),
          endDate: dayjs(parsedData.endDate)
        })
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    try {
      const response = await axiosPrivate.get(
        `/search/trip?start_location=${formData.startLocation}&end_location=${
          formData.endLocation
        }&start_time=${formData.startDate.format('YYYY-MM-DD')}&ticket_count=${formData.ticketCount}`
      )

      console.log('Search results:', response.data)

      const data = await response.data
      setSearchResults(data)

      let searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]')
      searchHistory.unshift(formData)
      if (searchHistory.length > 3) {
        searchHistory = searchHistory.slice(0, 3)
      }
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
      localStorage.setItem('formData', JSON.stringify(formData))

      navigate(
        `/buy-search-results?start_location=${formData.startLocation}&end_location=${
          formData.endLocation
        }&start_time=${formData.startDate.format('YYYY-MM-DD')}&ticket_count=${formData.ticketCount}`,
        { state: { formData } }
      )

      window.location.reload()
    } catch (error) {
      console.log('Failed to fetch data:', error)
    }
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
          <Link to='' className='text-orange-600'>
            Hướng dẫn mua vé
          </Link>
        </div>

        <div className='mt-2 flex justify-between' style={{ '--input-width': inputWidth }}>
          <div className='flex'>
            <div>
              <div className='mb-2 font-semibold text'>điểm đi</div>
              <Select
                className='custom-select font-semibold'
                value={formData.startLocation}
                onChange={(value) => setFormData({ ...formData, startLocation: value })}
              >
                {locations
                  .filter((location) => location.name !== formData.endLocation)
                  .map((location) => (
                    <Option key={location.id} value={location.name}>
                      {location.name}
                    </Option>
                  ))}
              </Select>
            </div>
            <img src='https://futabus.vn/images/icons/switch_location.svg' alt='' className='mt-7' />

            <div>
              <div className='mb-2 font-semibold text'>điểm đến</div>
              <Select
                className='custom-select font-semibold'
                value={formData.endLocation}
                onChange={(value) => setFormData({ ...formData, endLocation: value })}
              >
                {locations
                  .filter((location) => location.name !== formData.startLocation)
                  .map((location) => (
                    <Option key={location.id} value={location.name}>
                      {location.name}
                    </Option>
                  ))}
              </Select>
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
                onChange={(date) => {
                  if (date) {
                    setFormData({ ...formData, startDate: dayjs(date) })
                  }
                }}
                // disabledDate={disablePastDate}
                minDate={dayjs()}
              />
            </p>
          </div>
          {value === 2 && (
            <div>
              <div className='mb-2 font-semibold text'>ngày về</div>
              <p className='input-search font-semibold'>
                {' '}
                <DatePicker
                  defaultValue={formData.endDate}
                  suffixIcon={null}
                  style={{ border: 'none' }}
                  onChange={(date) => {
                    if (date) {
                      setFormData({ ...formData, endDate: dayjs(date) })
                    }
                  }}
                  disabledDate={disablePastDate}
                />
              </p>
            </div>
          )}

          <div>
            <div className='mb-2 font-semibold text'>số vé</div>
            <Select
              className='font-semibold custom-select'
              value={formData.ticketCount}
              onChange={(value) => setFormData({ ...formData, ticketCount: value })}
            >
              {[1, 2, 3, 4, 5].map((number) => (
                <Option key={number} value={number}>
                  {number}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div className='mt-3 '>
          <div className='font-semibold text'>Tìm kiếm gần đây</div>
          <div className='flex gap-5'>
            {Array.isArray(searchResults) &&
              searchResults.map((result, index) => (
                <div key={index} className='mt-2 bg-gray-100 view-search'>
                  <p className='font-medium'>
                    {' '}
                    {result.startLocation} - {result.endLocation}
                  </p>
                  <p className='text-gray-500 font-semibold text-[14px]'>
                    {dayjs(result.startDate).format('DD-MM-YYYY')}
                  </p>
                </div>
              ))}
          </div>
        </div>

        <div className='button-wrapper'>
          <ButtonRadiusCompoennt content='Tìm chuyến xe' onClick={handleSubmit} />
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
    width: var(--input-width);
    height: 56.7px;
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
  .custom-select .ant-select-selector {
    width: var(--input-width);
    height: 56.7px;
  }
  .custom-select .ant-select-selector .ant-select-selection-item {
    margin-top: 10px;
    margin-left: 10px;
    font-size: 17px;
    font-weight: 500;
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
