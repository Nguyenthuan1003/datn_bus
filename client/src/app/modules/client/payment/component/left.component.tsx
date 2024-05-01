import { LoadingOutlined } from '@ant-design/icons';
import { Spin, message } from 'antd';
import { useEffect, useState } from 'react';
import { cancelBill, paymentVNP } from '~/app/api/bill/bill.api';
import { useCartRedux } from '../../redux/hook/useCartReducer';
const LeftComponent = () => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
    const { data: { cart } } = useCartRedux()
    // console.log('paymentRef',paymentRef);
    useEffect(() => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang khi component được load lại
    }, []); // useEf
    const dataBill: any = localStorage.getItem('bill_user')
    const ObDataBill = JSON.parse(dataBill)

    const handelDataPaymetSanbox = () => {
        // paymentVNP({ amount: cart?.total_money_after_discoun, code_bill: cart?.code_bill })
        paymentVNP({ amount: ObDataBill?.total_money_after_discount, code_bill: ObDataBill?.code_bill })
            .then((res: any) => {
                // Chuyển hướng đến trang thanh toán của bên thứ ba
                window.location.href = res?.data?.url;
            }) 
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
                    localStorage.removeItem("bill_user")
                    localStorage.removeItem("cart")

                fetch('http://192.168.1.7:8000/api/rt/seat')
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

                if (data) {
                    message.success("Hủy đơn hàng thành công!");
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