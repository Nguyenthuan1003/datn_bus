import React, { useEffect, useRef, useState } from 'react'
import LeftComponent from '../payment/component/left.component'
import { useCartRedux } from '../redux/hook/useCartReducer'
import { cancelBill } from '~/app/api/bill/bill.api'
import moment from 'moment-timezone'
import { Button, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'

const PaymentComponent = () => {
    // const {data:{cart}}=useCartRedux()
    // const cart:any = localStorage.getItem("cart")\
    const navigate = useNavigate()
    const getBillData:any = localStorage.getItem("bill_user")
    const billUser = JSON.parse(getBillData)
    const getCart:any = localStorage.getItem("cart")
    const cart = JSON.parse(getCart)
    const  [delayEmptyCart, setDelayEmptycart] = useState(!cart)
    setTimeout(() => {
        setDelayEmptycart(!cart)
    }, 3000);
    // const time =  moment.utc(billUser?.created_at).local().format('DD/MM/YYYY HH:mm:ss')
    const createdAt = moment.utc(billUser?.created_at).local().valueOf();

    const price = cart?.total_money_after_discoun
    const paymentRef = useRef<any>(null);
    const [remainingTime, setRemainingTime] = useState(100);
    const [orderCancelled, setOrderCancelled] = useState(false);
    const [modalEmptyCart, setModalEmptyCart] = useState(false);
    useEffect(() => {
        // Kiểm tra nếu paymentRef tồn tại và không phải là null
        if (paymentRef.current) {
            // Cuộn đến vị trí của phần tử paymentRef
            paymentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [price]); // Trigger lại useEffect khi giá trị của cart thay đổi
    useEffect(() => {
        const currentTime = moment().valueOf();
        const elapsedTime = currentTime - createdAt;
        const timeRemaining = 5 * 60 * 1000 - elapsedTime; // 5 phút tính bằng millisecond

        // Khởi tạo thời gian đếm ngược ban đầu
        setRemainingTime(timeRemaining);

        // Đếm ngược thời gian
        const countdownInterval = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 1000);
        }, 1000);

        // Xóa interval khi component unmount
        return () => clearInterval(countdownInterval);
    }, []);
    const minutes = Math.floor(remainingTime / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    const dataBill: any = localStorage.getItem('bill_user')
    const ObDataBill = JSON.parse(dataBill)
    const idBill =ObDataBill?.id
    
    const handleOk = () =>{
        setModalEmptyCart(true)
        navigate("/")
    }

    useEffect(() => {

        const deleteOrderAsync = async () => {
            try {
                // Gọi API để xóa đơn hàng
                await  cancelBill(idBill);
                localStorage.removeItem("bill_user")
                localStorage.removeItem("cart")
                setOrderCancelled(true);
                // Sau khi xóa đơn hàng thành công, điều hướng về trang chủ
                window.location.href = '/';
                 fetch('http://127.0.0.1:8000/api/rt/seat')
                .then(
                    function(response) {
                    if (response.status !== 200) {
                        console.log('Lỗi, mã lỗi ' + response.status);
                        return;
                    }
                    // parse response data
                    response.json().then(data => {
                        console.log("data",data);
                    })
                    }
                )
                .catch(err => {
                    console.log('Error :-S', err)
                });
            } catch (error) {
                // Xử lý lỗi nếu có
                console.error('Error deleting order:', error);
                // Điều hướng về trang chủ dù có lỗi xảy ra hoặc không
                window.location.href = '/';

            }
        };
    
        if (remainingTime <= 0) {
            deleteOrderAsync();
        }
        
    
    }, [remainingTime]);
    const codeSeat = cart?.seat_id?.map((seat: string) => `'${seat}'`).join(', ')
    
    return (
        <div className='w-full'>
           {
             delayEmptyCart ? ( <Modal
                title='Có điều gì đó sai, vui lòng tìm chuyến xe đặt lại vé'
                visible={true}
                onOk={handleOk}
                width={450}
                centered
                footer={
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <Button onClick={handleOk} style={{ width: '90px' }}>
                      ok
                    </Button>
                  </div>
                }
              >
              </Modal>) : (
                <div>
                     <div className='layout flex flex-wrap  py-5 px-40'>
                
                <div className="w-[320px] flex-col flex">
                    
                    <LeftComponent />
                </div>
                <div className=':grid-cols-1 flex flex-wrap gap-6'>
                    <div className="flex-col items-center overflow-x-hidden text-center w-[360px] ml-16">
                        <div className="text-gray text-base font-medium">Tổng thanh toán</div>
                        <div className="mb-6 text-5xl font-semibold text-orange">{cart?.total_money_after_discoun?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                        <div className="rounded-2xl bg-[#FAFAFC] p-4">
                        <span className="text-[13px] text-[#EC9B04]">
                                Thời gian giữ chỗ còn lại{' '}
                                <span className="font-medium">
                                    {minutes.toString().padStart(2, '0')} : {seconds.toString().padStart(2, '0')}
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className="flex w-[430px]">
                        <div className="mx-auto flex min-w-[345px] flex-col gap-6 px-16">
                            <div className="w-full rounded-xl border border-[#DDE2E8] bg-white px-4 py-3 text-[15px]">
                                <p className="text-xl font-medium text-black">Thông tin hành khách</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-gray w-28">Họ và tên</span>
                                    <span className="text-black">{cart?.full_name}</span>
                                </div>
                                <div className="mt-1 flex items-center justify-between">
                                    <span className="text-gray w-28">Số điện thoại</span>
                                    <span className="text-black">{cart?.phone_number}</span>
                                </div>
                                <div className="mt-1 flex items-center justify-between">
                                    <span className="text-gray w-28">Email</span>
                                    <span className="text-black">{cart?.email}</span>
                                </div>
                            </div>
                            <div className="w-full rounded-xl border border-[#DDE2E8] bg-white px-4 py-3 text-[15px]">
                                <p className="icon-orange flex gap-4 text-xl font-medium text-black">Thông tin lượt đi</p>
                                <div className="mt-4 flex justify-between">
                                    <span className="text-gray w-20">Tuyến xe</span>
                                    <span className="text-right text-black">{cart?.route}</span>
                                </div>
                                <div className="mt-1 flex items-center justify-between">
                                    <span className="text-gray w-28">Số lượng ghế</span>
                                    <span className="text-black">{cart?.total_seat}</span>
                                </div>
                                <div className="mt-1 flex items-center justify-between">
                                    <span className="text-gray w-28">Số ghế</span>
                                    <span className="text-[#00613D]">{codeSeat}</span>

                                </div>
                                <div className="mt-1 flex items-center justify-between">
                                    <span className="text-gray w-40">Điểm lên xe</span>
                                    <span className="text-right text-black">{cart?.location?.start_location}</span>
                                </div>
                                <div className="mt-1 flex items-center justify-between">
                                    <span className="text-gray">Tổng tiền lượt đi</span>
                                    <span className="text-[#00613D]">{cart?.total_money?.toLocaleString('vi', { style: 'currency', currency: 'VND' }) }</span>
                                </div>
                            </div>
                            <div className="w-full rounded-xl border border-[#DDE2E8] bg-white px-4 py-3 text-[15px]">
                                <div className="icon-orange flex gap-2 text-xl font-medium text-black">Chi tiết giá</div>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-gray">Giá vé lượt đi</span>
                                    <span className="text-orange">{cart?.total_money?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                                </div>
                                <div className="mt-1 flex items-center justify-between">
                                    <span className="text-gray">Phí thanh toán</span>
                                    <span className="text-black">0đ</span>
                                </div>
                                <div className="divide my-3"></div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray">Tổng tiền</span>
                                    <span className="text-orange">{cart?.total_money_after_discoun?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                </div>
             )
           }
           
        </div>
    )
}

export default PaymentComponent