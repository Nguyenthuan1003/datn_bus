import React, { useEffect, useState } from 'react'
import { updateBillAndSendMail } from '~/app/api/bill/bill.api';
import { useCartRedux } from '../redux/hook/useCartReducer';
import { LoadingOutlined } from '@ant-design/icons';
import SuccessComponent from '../success/success.component';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';

const ResultPage = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateCalled, setUpdateCalled] = useState(false);
  const [successData, setSuccessData] = useState<any>({});
  const [billUpdated, setBillUpdated] = useState(false);
  console.log('Result Page', successData);

  useEffect(() => {
    const cart: any = localStorage.getItem('cart');
    const cartUser = JSON.parse(cart);
    const dataCartUser = cartUser?.payload;

    const urlParams = new URLSearchParams(window.location.search);
    const responseCode = urlParams.get('vnp_ResponseCode');

    const dataBill: any = localStorage.getItem('bill_user');
    const route = localStorage.getItem('route');
    const ObDataBill = JSON.parse(dataBill);

    if (responseCode === '00' && !updateCalled) {
      setIsUpdating(true);
      setUpdateCalled(true);
      const splipRoute: any = route?.split("-");
      const idUpdate = ObDataBill?.id;
      const dataUpdate = {
        status_pay: "1",
        type_pay: "0",
        full_name: dataCartUser?.full_name,
        start_location: splipRoute[0],
        end_location: splipRoute[1],
        pickup_location: dataCartUser?.location?.start_location,
        pay_location: dataCartUser?.location?.end_location,
        code_seat: dataCartUser?.code_seat
      };

      // Simulate API call
      setTimeout(() => {
        // Assuming updateBillAndSendMail returns a Promise
        updateBillAndSendMail(idUpdate, dataUpdate)
          .then((res) => {
            setUpdateSuccess(true);
            setSuccessData(res?.data);
            setIsUpdating(false);
            setBillUpdated(true)
          })
          .catch(error => {
            console.error("Update failed:", error);
            setIsUpdating(false);
          });
      }, 2000); // Simulate 2 seconds delay, adjust as needed
    }

  }, [updateCalled,billUpdated]);

  return (
    <div className=''>
      {isUpdating && (
        <div className="fixed inset-0 z-50 bg-black opacity-50"></div>
      )}

      {/* Spin component */}
      {isUpdating ? (
        <div className="fixed z-50 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
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
            <h1>Vui lòng check thông tin email </h1>
             <p>Hoặc vào trang tra cứu vé để check thông tin vé  <span><Link to={'/check-ticket'}>Tra cứu vé</Link></span></p>
         </div>

            // You can render an error component or message here
          )}
        </React.Fragment>
      )}
    </div>
  )
}

export default ResultPage