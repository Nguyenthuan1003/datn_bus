import { log } from 'console';
import React from 'react'
import { updateBillAndSendMail } from '~/app/api/bill/bill.api';
import { useCartRedux } from '../redux/hook/useCartReducer';

const ResultPage = () => {
  const cart: any = localStorage.getItem('cart')
  const cartUser = JSON.parse(cart)
  const dataCartUser = cartUser?.payload
  console.log('cart-repayment', dataCartUser);
  const urlParams = new URLSearchParams(window.location.search);
  const responseCode = urlParams.get('vnp_ResponseCode');
  console.log('url',responseCode);
  const dataBill: any = localStorage.getItem('bill_user')
  const route: any = localStorage.getItem('route')

  const ObDataBill = JSON.parse(dataBill)
  // console.log(ObDataBill);
  
  if (responseCode === '00') {
    console.log('thanhf coong');
    
    const splipRoute = route?.split("-");
    const idUpdate: any = ObDataBill?.id;
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
    console.log('dataUpdate',dataUpdate);
    
    updateBillAndSendMail(idUpdate, dataUpdate);
}else{
    console.log("thaat baij")
}
  
  return (
  
    <div className='w-[1128px] m-auto'>
        <h1>Thánh toán thành công !</h1>
    </div>
  )
}

export default ResultPage