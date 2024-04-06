import React, { useEffect, useState } from 'react'
import { updateBillAndSendMail } from '~/app/api/bill/bill.api';
import { useCartRedux } from '../redux/hook/useCartReducer';
import { LoadingOutlined } from '@ant-design/icons';
import SuccessComponent from '../success/success.component';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useLocation , useNavigate } from 'react-router-dom';
const ResultPage = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateCalled, setUpdateCalled] = useState(false);
  const [successData, setSuccessData] = useState<any>({});
  const [billUpdated, setBillUpdated] = useState(false);
  const [id,setId]  = useState();
  const location = useLocation();
  const route = localStorage.getItem('route');
  const dataBill: any = localStorage.getItem('bill_user');
  const ObDataBill = JSON.parse(dataBill);
  const currentId = ObDataBill?.id;
  const navigate = useNavigate()

  console.log('id',billUpdated);
  console.log("currentId12222222",currentId);
  console.log('Result Page', successData);
  useEffect(() => {
    const fetchDataAndUpdate = async () => {
      try {
        const cart: any = localStorage.getItem('cart');
        const cartUser = JSON.parse(cart);
        const dataCartUser = cartUser?.payload;

        const urlParams = new URLSearchParams(window.location.search);
        const responseCode = urlParams.get('vnp_ResponseCode');

        
        console.log(1);
        console.log("billUpdated1",billUpdated);
        console.log("updateSuccess1",updateSuccess);
        console.log("responseCode1",responseCode);
        console.log("currentId1",currentId);

        
        
        if (responseCode === '00') {
          setIsUpdating(true);
          console.log("billUpdated",billUpdated);
          console.log("updateSuccess",updateSuccess);
          console.log("updateCalled",updateCalled);
          
          console.log(2);
          
          // setUpdateCalled(true);
          const splipRoute: any = route?.split("-");
          const idUpdate = currentId;
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
          await new Promise((resolve) => setTimeout(resolve, 2000));

          const res = await updateBillAndSendMail(idUpdate, dataUpdate);
          if(res?.data?.message == "Cập nhật đơn hàng thành công"){
            const urlWithoutQueryParams = location.pathname;
            setUpdateSuccess(true);
            setSuccessData(res?.data);
            setIsUpdating(false);
            // setBillUpdated(true);
            console.log(res.data);
            navigate(urlWithoutQueryParams)
          }else{
              const urlWithoutQueryParams = location.pathname;
              navigate(urlWithoutQueryParams)
              alert('đơn hàng chưa thanh toán thành công vui lòng thử lại ')
          }
     
        }
      } catch (error) {
        console.error("Update failed:", error);
        window.location.href="/"
        setIsUpdating(false);
      }
    };

    fetchDataAndUpdate();
  }, []);
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