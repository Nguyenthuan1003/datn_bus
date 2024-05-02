import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { cancelBill, updateBillAndSendMail } from '~/app/api/bill/bill.api'
import SuccessComponent from '../success/success.component'
const ResultPage = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [updateCalled, setUpdateCalled] = useState(false)
  const [successData, setSuccessData] = useState<any>({})
  const [billUpdated, setBillUpdated] = useState(false)
  const location = useLocation()

  const navigate = useNavigate()
  const dataBill: any = localStorage.getItem('bill_user')
  const ObDataBill = JSON.parse(dataBill)
  console.log('ObDataBill', ObDataBill)
  const idBill = ObDataBill?.id
  const route = localStorage.getItem('route')
  console.log('id', billUpdated)
  console.log('idBill12222222', idBill)
  console.log('Result Page', successData)

  useEffect(() => {
    const fetchDataAndUpdate = async () => {
      try {
        const cart: any = localStorage.getItem('cart')
        const dataCart = JSON.parse(cart || '[]')
        console.log('dataCartUser', dataCart)

        const urlParams = new URLSearchParams(window.location.search)
        const responseCode = urlParams.get('vnp_ResponseCode')

        // console.log(1);
        // console.log("billUpdated1",billUpdated);
        // console.log("updateSuccess1",updateSuccess);
        // console.log("responseCode1",responseCode);
        // console.log("idBill1",idBill);

        if (responseCode === '00') {
          setIsUpdating(true)
          // console.log("billUpdated",billUpdated);
          // console.log("updateSuccess",updateSuccess);
          // console.log("updateCalled",updateCalled);

          // console.log(2);

          // setUpdateCalled(true);
          const splipRoute: any = route?.split('-')
          const idUpdate = idBill
          const dataUpdate = {
            status_pay: '1',
            type_pay: '0',
            full_name: dataCart?.full_name,
            start_location: splipRoute[0],
            end_location: splipRoute[1],
            pickup_location: dataCart?.location?.start_location,
            pay_location: dataCart?.location?.end_location,
            code_seat: dataCart?.code_seat
          }

          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 2000))

          const res = await updateBillAndSendMail(idUpdate, dataUpdate)
          if (res?.data?.message == 'Cập nhật đơn hàng thành công') {
            localStorage.removeItem('qrBillData');
            localStorage.setItem('qrBillData', JSON.stringify(res?.data?.bill))

            const urlWithoutQueryParams = location.pathname
            setUpdateSuccess(true)
            setSuccessData(res?.data)
            setIsUpdating(false)
            // setBillUpdated(true);
            // console.log(res.data)
            navigate(urlWithoutQueryParams)
          }
        }
        if (responseCode === '24') {
          await cancelBill(idBill)
          // message.error(resCancel.data.message);
          navigate('/fail-payment')
        }
        fetch('http://172.20.10.7:8000/api/rt/seat')
          .then(function (response) {
            if (response.status !== 200) {
              console.log('Lỗi, mã lỗi ' + response.status)
              return
            }
            // parse response data
            response.json().then((data) => {
              console.log('data', data)
            })
          })
          .catch((err) => {
            console.log('Error :-S', err)
          })
        //   else{
        //     const urlWithoutQueryParams = location.pathname;
        //     navigate(urlWithoutQueryParams)
        //     alert("hãy kiểm trả lại thông tin qua email")
        //     window.location.href="/result-payment"
        // }
      } catch (error) {
        console.error('Update failed:', error)
        alert('thanh toan faill')
        window.location.href = '/'
        setIsUpdating(false)
      }
    }
    fetchDataAndUpdate()
  }, [])

  return (
    <div className=''>
      {isUpdating && <div className='fixed inset-0 z-50 bg-black opacity-50'></div>}

      {/* Spin component */}
      {isUpdating ? (
        <div className='fixed z-50 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      ) : (
        <React.Fragment>
          {updateSuccess ? (
            <React.Fragment>
              {/* <SuccessComponent data={successData} /> */}
              <SuccessComponent />
            </React.Fragment>
          ) : (
            <div className='w-[1225px] m-auto'>
              <h1 className='text-center'>Vui lòng check thông tin qua email </h1>
              <p className='text-center'>
                Hoặc vào trang tra cứu vé để check thông tin vé{' '}
                <span
                  className='p-2 text-blue-500
             '
                >
                  <Link to={'/check-ticket'}>Tra cứu vé</Link>
                </span>
              </p>

              <p className='text-center'>
                <span className='inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                  <Link to='/'>Về Trang chủ </Link>
                </span>
              </p>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  )
}

export default ResultPage
