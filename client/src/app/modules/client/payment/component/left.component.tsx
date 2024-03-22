import React, { useCallback, useEffect, useState } from 'react'
import { useCartRedux } from '../../redux/hook/useCartReducer'
import { addBill, paymentVNP } from '~/app/api/bill/bill.api'
import { Link } from 'react-router-dom'
import { getOneUser } from '~/app/api/auth/auth.api'


const LeftComponent = () => {
    
    
    const {data:{cart}}=useCartRedux()
    console.log('cart',cart);
    // const handelDataPaymetSanbox=()=>{
    //  paymentVNP({amount:cart?.total_money_after_discoun}).then((res:any)=>{
    //     // console.log('thanhtoan',res)
    //     window.location.href= res?.data?.url;
        
    //  })
    // }ư
     const [idUser,setIdUser]=useState<any>({})
     const accsetoken:any=localStorage.getItem("token")
     useEffect(()=>{
        getOneUser(accsetoken).then((res:any)=>{
            setIdUser(res?.data?.user)
        })
     },[])
     console.log('idUser',idUser)
    const handelDataPaymetSanbox = async () =>{
        try {
            const billData = {
                full_name: cart?.full_name,
                phone_number: cart?.phone_number,
                email: cart?.email,
                total_money: cart?.total_money,
                total_money_after_discount: cart?.total_money_after_discoun,
                seat_id: JSON.stringify(cart?.seat_id),
                trip_id: cart?.trip_id,
                status_pay: "0",
                type_pay: "0",
                total_seat: cart?.seat_id?.length ,
                code_bill: cart?.code_bill,
                discount_code_id: null,
                user_id:idUser?.id
            };
            // Gọi API để lưu hóa đơn
            console.log('billData',billData);
            
            await addBill(billData);            
        
            // Sau khi hóa đơn được lưu thành công, thực hiện thanh toán
            const res = await paymentVNP({ amount: cart?.total_money_after_discoun , code_bill:cart?.code_bill});
        
            // Sau khi nhận được URL thanh toán, chuyển hướng tới trang thanh toán
            window.location.href = res?.data?.url;
        } catch (error:any) {
            if (error.response) {
                // Lỗi từ API
                console.error('API error:', error.response.data);
            } else if (error.request) {
                // Lỗi từ không có phản hồi từ server
                console.error('No response received:', error.request);
            } else {
                // Lỗi khác
                console.error('Error:', error.message);
            }
        }
    }
    return (
        <div>

             <button className='bg-red-600 px-2 text-white rounded'><Link to={'/buy-search-results'}>Quay lại</Link></button>
 
            <div className="text-xl font-medium"> Chọn phương thức thanh toán</div>
            <div className="ant-radio-group ant-radio-group-outline">
         
                <label className="ant-radio-wrapper m-0 flex items-center border-b py-3" style={{ border: 'none' }}>
                    <span className="ant-radio">
                        <input type="radio" className="ant-radio-input" value="8" onClick={handelDataPaymetSanbox} />
                        <span className="ant-radio-inner"></span>
                    </span>
                    <span>
                        <div className="flex w-full items-center" onClick={handelDataPaymetSanbox}>
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
                </label>
            </div>
    
        </div>

    )
}

export default LeftComponent