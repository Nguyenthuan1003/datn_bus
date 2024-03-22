import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import ButtonRadiusCompoennt from '~/app/component/parts/button/button.component'
import { useTripRedux } from '../../../redux/hook/useTripReducer'
import moment from 'moment'
import 'moment/locale/vi' // Import locale của bạn nếu cần thiết
import LocationScheduleComponent from '../location-schedule/location-schedule.component'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const MainSearchResults = () => {
  const { data, actions } = useTripRedux()
  const tripSearchResults = data?.searchResults || []
  const tripState = useSelector((state) => state.trip)
  const searchResults = tripState?.searchResults || []
  const [activeData, setActiveData] = useState({})
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const dispatch = useDispatch()

  const setActiveToTrips = (tripId: any, dataIndex: any) => {
    setActiveData((prevData: any) => ({
      ...prevData,
      [tripId]: prevData[tripId] === dataIndex ? null : dataIndex
    }))
  }

  useEffect(() => {
    const params = {
      start_location: searchParams.get('start_location'),
      end_location: searchParams.get('end_location'),
      start_time: searchParams.get('start_time'),
      ticket_count: searchParams.get('ticket_count')
    }
    actions.getAllTrip(params)
  }, [])

  console.log(tripState, 'store trip')
  

  return (
    <div css={MainSearchCss}>
      {Array.isArray(searchResults) ? (
        searchResults.length > 0 ? (
          searchResults.map((item: any) => (
            <div className='mt-3' key={item.id}>
              <h2>
                {' '}
                <span className='font-semibold'>Tuyến đường : </span>
                {item?.start_location}-{item?.end_location}
              </h2>

              <div className='result mt-3'>
                <div className='p-4'>
                  <div className='flex items-center'>
                    <div className='flex items-center'>
                      <div className='text-[15px]  font-bold mx-6'>
                        Thời gian bắt đầu
                        <br />
                        <span className='font-medium flex justify-center mt-3'>
                          {' '}
                          {moment(item?.start_time).format('HH:mm DD/MM/YYYY')}
                        </span>
                      </div>

                      <div className='text-[15px]  font-bold mx-6'>
                        Tổng thời gian đi
                        <br />
                        <span className='font-medium flex justify-center mt-3'>{item?.interval_trip} giờ</span>
                      </div>

                      <div className='text-[15px]  font-bold mx-6'>
                        Loại xe
                        <br />
                        <span className='font-medium flex justify-center mt-3'>{item?.car?.name}</span>
                      </div>

                      <div className='text-[15px]  font-bold mx-6'>
                        Chỗ ngồi
                        <br />
                        <span className='font-medium flex justify-center mt-3'>8gio</span>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center my-4 justify-between px-6'>
                    <div className='font-medium'>{item?.start_location}</div>
                    <div className=''>
                      <img
                        className='w-[200px] '
                        src='../../../../../../../public/image/A-car-B-removebg-preview.png'
                        alt=''
                      />
                    </div>
                    <div className='font-medium'>{item?.end_location}</div>

                    <div className='text-[20px] font-bold text-[var(--color-orange)] px-6'>{item?.trip_price}đ</div>
                  </div>

                  <hr />

                  <div className='flex justify-between mt-4'>
                    <div className='flex'>
                      <div
                        className={`font-medium ${activeData[item.id] == 1 ? 'active' : ''}`}
                        onClick={() => setActiveToTrips(item.id, 1)}
                      >
                        Chọn ghế
                      </div>
                      <div
                        className={`font-medium px-3 ${activeData[item.id] == 2 ? 'active' : ''}`}
                        onClick={() => setActiveToTrips(item.id, 2)}
                      >
                        Lịch trình
                      </div>
                      <div
                        className={`font-medium px-3 ${activeData[item.id] == 4 ? 'active' : ''}`}
                        onClick={() => setActiveToTrips(item.id, 4)}
                      >
                        Chính sách
                      </div>
                    </div>
                    <div>
                      <Link to={'/book-tickets'}>
                        <ButtonRadiusCompoennt content='chọn chuyến' />
                      </Link>
                    </div>
                  </div>
                </div>
                <div>
                  {activeData[item.id] === 1 && <div>một</div>}
                  {activeData[item.id] === 2 && <LocationScheduleComponent />}
                  {activeData[item.id] === 4 && (
                    <div>
                      <div className='ant-tabs-content ant-tabs-content-top'>
                        <div className='mt-2 flex h-96 justify-center overflow-y-auto rounded-b-xl bg-[#FBFBFB] px-1 pb-4'>
                          <div className='px-4 py-2'>
                            <div className='pb-2 text-lg font-medium'>chính sách hủy vé </div>
                            <div className='flex w-full flex-col'>
                              <div className='content-editor has-bullet no-margin text-[15px]'>
                                <ul>
                                  <li>
                                    <p>Chỉ được chuyển đổi vé 1 lần duy nhất</p>
                                  </li>
                                  <li>
                                    <p>
                                      Chi phí hủy vé từ 10% – 30% giá vé tùy thuộc thời gian hủy vé so với giờ khởi hành
                                      ghi trên vé và số lượng vé cá nhân/tập thể áp dụng theo các quy định hiện hành.
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      Quý khách khi có nhu cầu muốn thay đổi hoặc hủy vé đã thanh toán, cần liên hệ với
                                      Trung tâm tổng đài 1900 6067 hoặc quầy vé chậm nhất trước 24h so với giờ xe khởi
                                      hành được ghi trên vé, trên email hoặc tin nhắn để được hướng dẫn thêm.
                                    </p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className='flex flex-col'>
                              <div className='divide h-[6px] bg-[#F7F7F7]'></div>

                              <div className='pb-2 text-lg font-medium'>Yêu cầu khi lên xe</div>
                              <div className='content-editor has-bullet no-margin text-[15px]'>
                                <ul>
                                  <li>
                                    <p>
                                      Có mặt tại Văn phòng/Bến xe (Địa điểm xe đón trực tiếp) trước 30 phút để làm thủ
                                      tục lên xe (đối với ngày lễ tết cần ra trước 60 phút).
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      Xuất trình thông tin vé được gửi qua SMS/Email/ hoặc liên hệ quầy vé để nhận thông
                                      tin vé trước khi lên xe.
                                    </p>
                                  </li>
                                  <li>
                                    <p>Không mang thức ăn/đồ uống có mùi lên xe.</p>
                                  </li>
                                  <li>
                                    <p>
                                      Không hút thuốc, không sử dụng đồ uống có cồn hoặc sử dụng chất kích thích trên
                                      xe.
                                    </p>
                                  </li>
                                  <li>
                                    <p>Không mang các vật dễ cháy nổ lên xe.</p>
                                  </li>
                                  <li>
                                    <p>Không vứt rác trên xe.</p>
                                  </li>
                                  <li>
                                    <p>Không mang động vật lên xe.</p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className='flex flex-col'>
                              <div className='divide h-[6px] bg-[#F7F7F7]'></div>
                              <div className=''>
                                <div className='pb-2 text-lg font-medium'>Hành lý xách tay</div>
                                <div className='content-editor has-bullet no-margin text-[15px]'>
                                  <ul>
                                    <li>
                                      <p>Tổng trọng lượng hành lý không vượt quá 20kg</p>
                                    </li>
                                    <li>
                                      <p>Không vận chuyển hàng hoá cồng kềnh</p>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className='flex flex-col'>
                              <div className='divide h-[6px] bg-[#F7F7F7]'></div>
                              <div className=''>
                                <div className='pb-2 text-lg font-medium'>Trẻ em dưới 6 tuổi và phụ nữ có thai</div>
                                <div className='content-editor has-bullet no-margin text-[15px]'>
                                  <ul>
                                    <li>
                                      <p>
                                        Trẻ em dưới 6 tuổi, cao từ 1.3m trở xuống, cân nặng dưới 30kg thì không phải mua
                                        vé.
                                      </p>
                                    </li>
                                    <li>
                                      <p>
                                        Trong trường hợp trẻ em không thoả 1 trong 3 tiêu chí trên sẽ mua 01 vé tương
                                        đương với người lớn.
                                      </p>
                                    </li>
                                    <li>
                                      <p>Mỗi người lớn sẽ đi kèm tối đa một trẻ em.</p>
                                    </li>
                                    <li>
                                      <p>Phụ nữ có thai cần đảm bảo sức khoẻ trong suốt quá trình di chuyển.</p>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className='flex flex-col'>
                              <div className='divide h-[6px] bg-[#F7F7F7]'></div>
                              <div className=''>
                                <div className='pb-2 text-lg font-medium'>Vé đón đường</div>
                                <div className='content-editor has-bullet no-margin text-[15px]'>
                                  <ul>
                                    <li>
                                      <p>
                                        Trường hợp có nhu cầu lên xe dọc đường, Quý khách vui lòng liên hệ tổng đài
                                        19006067 để đăng kí trước ít nhất 2 tiếng so với giờ xe khởi hành và vui lòng
                                        chuẩn bị hành lý nhỏ gọn (tối đa 20kg).
                                      </p>
                                    </li>
                                    <li>
                                      <p>
                                        Lưu ý, chúng tôi chỉ hỗ trợ đón ở một số địa điểm thuận tiện nằm trên lộ trình
                                      </p>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='flex flex-col items-center'>
            <div className='ant-empty mb-4 mt-32 ml-72'>
              <div className='ml-16 mb-2'>
                <img src='https://futabus.vn/images/empty_list.svg' alt='empty_list' width='160' />
              </div>
              <div className='ant-empty-description'>Không có kết quả được tìm thấy.</div>
            </div>
          </div>
        )
      ) : (
        console.log('Error: searchResults is not an array.')
      )}
    </div>
  )
}

export default MainSearchResults

const MainSearchCss = css`
  .result {
    box-shadow:
      0 3px 6px rgba(0, 0, 0, 0.16),
      0 3px 6px rgba(0, 0, 0, 0.2);
  }
`
