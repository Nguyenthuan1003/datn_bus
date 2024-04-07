import React, { useEffect, useState } from 'react'
import { Button, Result } from 'antd'
import { getOneBillById } from '~/app/api/bill/bill.api'
import TicketComponent from './TicketComponent'

// type Props = {
//   data:any
// }

const SuccessComponent = () => {
  const [data, setData] = useState<any>({})
  const dataTicket = data?.ticket_order
  console.log('data',dataTicket);
  
  const [loading, setLoading] = useState(true)

  const getStatusText = (status:any) => {
    if (status === 1) {
      return "Thanh toán thành công";
    } else {
      return "Chưa thanh toán";
    }
  };
  const getStatusPay = (status:any) => {
    if (status == 0) {
      return "VNP";
    } else {
      return "Tại nhà xe";
    }
  };


  // useEffect(()=>{
  //   const dataBill: any = localStorage.getItem('bill_user')
  //   const ObDataBill = JSON.parse(dataBill)
  //   const idUpdate: any = ObDataBill?.id;
  //   getOneBillById(idUpdate)
  //   .then((res) => {
  //     if(res.status === 200){
  //       setData(res?.data?.bill)
  //       setLoading(false)
  //       localStorage.removeItem('bill_user');
  //       localStorage.removeItem('cart')
  //     }
  //   })
  //   },[])


  useEffect(() => {
    const dataBill: any = localStorage.getItem('bill_user');
    const ObDataBill = JSON.parse(dataBill);
    const idUpdate: any = ObDataBill?.id;
  
    const fetchData = async () => {
      try {
        const res = await getOneBillById(idUpdate);
        if (res.status === 200) {
          setData(res?.data?.bill);
          setLoading(false);
          setTimeout(() => {
            localStorage.removeItem('bill_user');
            localStorage.removeItem('cart');
            localStorage.removeItem('route');
            localStorage.removeItem('seat_id');
            localStorage.removeItem('seat');
            localStorage.removeItem('location');

          }, 3000); // Đợi 3 giây trước khi xóa localStorage
        }
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);


    // const  handleBackHome=()=>{
    //   window.location.href='/'
    // }
    
    // const [visible, setVisible] = useState<boolean>(false);
    // const showModal = () => {
    //     setVisible(true);
    //     };
    //     const handleOk = (e: any) => {
    //         console.log(e);
    //         setVisible(false);
    //         };
    //     const handleCancel = (e: any) => {
    //         console.log(e);
    //         setVisible(false);
    //     };

      
  return (
    <div >
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
              <strong className='ml-14'>{data?.full_name}</strong>
            </div>
            <div className='flex py-4'>
              <p className='text-gray-400 font-medium'>Số điện thoại:</p>
              <strong className='ml-8'>{data?.phone_number}</strong>
            </div>
            <div className='flex'>
              <p className='text-gray-400 font-medium'>Email:</p>
              <strong className='ml-[85px]'>{data?.email}</strong>
            </div>
          </div>

          <div className='flex-col ml-[450px]'>
            <div className='flex'>
              <p className='text-gray-400 font-medium'>Tổng giá vé:</p>
              <strong className='ml-5'>{data?.total_money_after_discount}đ</strong>
            </div>
            <div className='flex py-4'>
              <p className='text-gray-400 font-medium'>PTTT:</p>
              <strong className='ml-[65px]'> {getStatusPay(data?.type_pay)}</strong>
            </div>
            <div className='flex'>
              <p className='text-gray-400 font-medium'>Trạng thái:</p>
              <strong className='ml-[30px] text-green-400'>{getStatusText(data?.status_pay)}</strong>
            </div>
          </div>
        </div>

        <div className='flex my-10 gap-10 justify-center'>
          {
            dataTicket?.map((item: any,index: number)=>(
              <TicketComponent key={index} dataTicket={item} data={data} />
            ))
          }
            
        </div>
   
      </div>
    </div>
  )
}

export default SuccessComponent
