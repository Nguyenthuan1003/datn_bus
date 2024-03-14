import React, { useCallback } from 'react'
import { useCartRedux } from '../../redux/hook/useCartReducer'
import { paymentVNP } from '~/app/api/bill/bill.api'


const LeftComponent = () => {
    
    const {data:{cart}}=useCartRedux()
    console.log('cart',cart);
    
    const handelDataPaymetSanbox=()=>{
     paymentVNP({amount:23000}).then((res:any)=>{
        // console.log('thanhtoan',res)
        window.location.href= res?.data?.url;
     })
    }
    return (
        <div>
               <button className='' >tếp tục thanh toán</button>
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
            <div className="ant-radio-group ant-radio-group-outline mt-3 border-t pt-3">
                <label className="ant-radio-wrapper m-0 flex items-center border-b py-3" style={{ border: 'none' }}>
                    <span className="ant-radio">
                        <input type="radio" className="ant-radio-input" value="5" />
                        <span className="ant-radio-inner"></span>
                    </span>
                    <span>
                        <div className="flex w-full items-center">
                            <img className="ml-4 mr-4 w-[40px]"
                                src="https://storage.googleapis.com/futa-busline-web-cms-prod/atn_logo_fd4ba999a5/atn_logo_fd4ba999a5.png" alt="" />
                            <div className="flex w-full flex-col">
                                <div className="flex w-52 items-end justify-between">
                                    <span className="text-base text-black">Thẻ ATM nội địa</span>
                                </div>
                            </div>
                        </div>
                    </span>
                </label>
                <label className="ant-radio-wrapper m-0 flex items-center border-b py-3" style={{ border: 'none' }}>
                    <span className="ant-radio">
                        <input type="radio" className="ant-radio-input" value="3" />
                        <span className="ant-radio-inner"></span>
                    </span>
                    <span>
                        <div className="flex w-full items-center">
                            <img className="ml-4 mr-4 w-[40px]"
                                src="https://storage.googleapis.com/futa-busline-web-cms-prod/visa_logo_3d2a20b162/visa_logo_3d2a20b162.png" alt="" />
                            <div className="flex w-full flex-col">
                                <div className="flex w-52 items-end justify-between">
                                    <span className="text-base text-black">Thẻ Visa/Master/JCB</span>
                                </div>
                            </div>
                        </div>
                    </span>
                </label>
            </div>
        </div>

    )
}

export default LeftComponent