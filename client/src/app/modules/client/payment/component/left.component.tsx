import React, { useCallback, useEffect, useState } from 'react'
import { useCartRedux } from '../../redux/hook/useCartReducer'
import { addBill, cancelBill, paymentVNP } from '~/app/api/bill/bill.api'
import { Link } from 'react-router-dom'
import { getOneUser } from '~/app/api/auth/auth.api'
import { updateBillAndSendMail } from '~/app/api/bill/bill.api'
import { Spin, message } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
const LeftComponent = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
    const { data: { cart } } = useCartRedux()
    console.log('cart', cart);
    const dataBill: any = localStorage.getItem('bill_user')
    const ObDataBill = JSON.parse(dataBill)
    // const handelDataPaymetSanbox = () => {
    //     paymentVNP({ amount: cart?.total_money_after_discoun, code_bill: cart?.code_bill }).then((res: any) => {
    //         window.location.href = res?.data?.url;
    //     }).then(() => {
    //         const splipRoute = cart?.route?.split("-")
    //         const idUpdate: any = ObDataBill?.id
    //         const dataUpdate = {
    //             status_pay: "1",
    //             type_pay: "0",
    //             full_name: cart?.full_name,
    //             start_location: splipRoute[0],
    //             end_location: splipRoute[1],
    //             pickup_location: cart?.location?.start_location,
    //             pay_location: cart?.location?.end_location,
    //             code_seat: cart?.code_seat

    //         }
    //         updateBillAndSendMail(idUpdate, dataUpdate)
    //     })
    // }
    const handelDataPaymetSanbox = () => {
        paymentVNP({ amount: cart?.total_money_after_discoun, code_bill: cart?.code_bill })
            .then((res: any) => {
                // Chuyển hướng đến trang thanh toán của bên thứ ba
                window.location.href = res?.data?.url;
                // Trả về một promise để tiếp tục xử lý
                // return new Promise<void>((resolve, reject) => {
                //     resolve(); // Không cần xử lý gì ở đây, chỉ để đảm bảo then() tiếp theo được gọi
                // });
            })
       
            
            // .then(() => {
            //     // Chỉ gọi API cập nhật hóa đơn sau khi thanh toán thành công
            //     const splipRoute = cart?.route?.split("-");
            //     const idUpdate: any = ObDataBill?.id;
            //     const dataUpdate = {
            //         status_pay: "1",
            //         type_pay: "0",
            //         full_name: cart?.full_name,
            //         start_location: splipRoute[0],
            //         end_location: splipRoute[1],
            //         pickup_location: cart?.location?.start_location,
            //         pay_location: cart?.location?.end_location,
            //         code_seat: cart?.code_seat
            //     };
            //     updateBillAndSendMail(idUpdate, dataUpdate);
            // })
            .catch((error: any) => {
                // Xử lý lỗi nếu có
                console.error("Error:", error);
            });
    };
    const idBill: any = ObDataBill?.id
    const onHandleRemoveBill = async (idBill: any) => {
        setIsLoading(true);
        try {
            const confirmed = window.confirm('Bạn có muốn hủy đơn hàng không ?');
            if (confirmed) {
                const { data }: any = await cancelBill(idBill);
                console.log('delete data', data);

                if (data) {
                    message.success(data.message);
                    // Chờ 10 giây trước khi chuyển hướng sang trang chủ
                    setTimeout(() => {
                        window.location.href = '/'; // Điều hướng đến trang chủ
                    }, 2000); // 10 giây
                } else {
                    // Xử lý khi có lỗi hoặc không có kết quả từ hàm cancelBill
                    message.error('Failed to delete bill.');
                }
            }
        } catch (error: any) {
            // Xử lý lỗi trong trường hợp yêu cầu xóa không thành công
            message.error(error.response.data.message || 'An error occurred while deleting the bill.');
        } finally {
            setIsLoading(false);
        }

    }
    const handlePaymentSelection = (value: string) => {
        setSelectedPayment(value);
    };

    const handlePayment = () => {
        if (selectedPayment === null) {
            alert('Vui lòng chọn phương thức thanh toán');
            return;
        }

        // Gọi hàm xử lý thanh toán tương ứng với phương thức đã chọn
        if (selectedPayment === 'vnpay') {
            handelDataPaymetSanbox(); // Thay thế bằng hàm xử lý thanh toán thực tế
        }
    };

    //  const [idUser,setIdUser]=useState<any>({})
    //  const accsetoken:any=localStorage.getItem("token")
    //  useEffect(()=>{
    //     getOneUser(accsetoken).then((res:any)=>{
    //         setIdUser(res?.data?.user)
    //     })
    //  },[])
    //  console.log('idUser',idUser)
    // const handelDataPaymetSanbox = async () =>{
    //     try {
    //         const billData = {
    //             full_name: cart?.full_name,
    //             phone_number: cart?.phone_number,
    //             email: cart?.email,
    //             total_money: cart?.total_money,
    //             total_money_after_discount: cart?.total_money_after_discoun,
    //             seat_id: JSON.stringify(cart?.seat_id),
    //             trip_id: cart?.trip_id,
    //             status_pay: "0",
    //             type_pay: "0",
    //             total_seat: cart?.seat_id?.length ,
    //             code_bill: cart?.code_bill,
    //             discount_code_id: null,
    //             user_id:idUser?.id
    //         };
    //         // Gọi API để lưu hóa đơn
    //         console.log('billData',billData);

    //         await addBill(billData);            

    //         // Sau khi hóa đơn được lưu thành công, thực hiện thanh toán
    //         const res = await paymentVNP({ amount: cart?.total_money_after_discoun , code_bill:cart?.code_bill});

    //         // Sau khi nhận được URL thanh toán, chuyển hướng tới trang thanh toán
    //         window.location.href = res?.data?.url;
    //     } catch (error:any) {
    //         if (error.response) {
    //             // Lỗi từ API
    //             console.error('API error:', error.response.data);
    //         } else if (error.request) {
    //             // Lỗi từ không có phản hồi từ server
    //             console.error('No response received:', error.request);
    //         } else {
    //             // Lỗi khác
    //             console.error('Error:', error.message);
    //         }
    //     }
    // }
    return (
        <div>
            {isLoading && (
                <div className="fixed inset-0 z-50 bg-black opacity-50"></div>
            )}

            {/* Spin component */}
            {isLoading && (
                <div className="fixed z-50 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                </div>
            )}
            <button className='bg-red-600 px-2 text-white rounded' onClick={() => onHandleRemoveBill(idBill)}>quay lại</button>

            <div className="text-xl font-medium"> Chọn phương thức thanh toán</div>
            <div className="ant-radio-group ant-radio-group-outline">
                {/* 
                <label className="ant-radio-wrapper m-0 flex items-center border-b py-3" style={{ border: 'none' }}>
                    <span className="ant-radio">
                        <input type="radio" className="ant-radio-input" value="8"  />
                        <span className="ant-radio-inner"></span>
                    </span>
                    
                    <span>
                        <div className="flex w-full items-center" >
                            <img className="ml-4 mr-4 w-[40px]"
                                src="https://storage.googleapis.com/futa-busline-web-cms-prod/vnpay_fdc107eeec/vnpay_fdc107eeec.svg" alt="" />
                            <div className="flex w-full flex-col">
                                <div className="flex w-52 items-end justify-between">
                                    <span className="text-base text-black">VNPay</span>

                                </div>
                                <span className="whitespace-pre-wrap text-xs font-medium text-orange"></span>
                            </div>
                        </div>
                    </span>
                </label> */}
                <label className="ant-radio-wrapper m-0 flex items-center border-b py-3" style={{ border: 'none' }}>
                    <span className="ant-radio">
                        <input type="radio" className="ant-radio-input" value="vnpay" onChange={() => handlePaymentSelection('vnpay')} />
                        <span className="ant-radio-inner"></span>
                    </span>
                    <span>
                        <div className="flex w-full items-center" >
                            <img className="ml-4 mr-4 w-[40px]" src="https://storage.googleapis.com/futa-busline-web-cms-prod/vnpay_fdc107eeec/vnpay_fdc107eeec.svg" alt="" />
                            <div className="flex w-full flex-col">
                                <div className="flex w-52 items-end justify-between">
                                    <span className="text-base text-black">VNPay</span>
                                </div>
                                <span className="whitespace-pre-wrap text-xs font-medium text-orange"></span>
                            </div>
                        </div>
                    </span>
                </label>
                {/* Thêm các label khác ở đây */}

                {/* Nút thanh toán chỉ hiển thị khi có phương thức thanh toán được chọn */}
                {selectedPayment && (
                    <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded" onClick={handlePayment}>Thanh toán</button>
                )}
            </div>

        </div>

    )
}

export default LeftComponent