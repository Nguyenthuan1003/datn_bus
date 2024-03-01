import React from 'react'


const LeftComponent = () => {
    return (
        <div>
            <div className="text-xl font-medium"> Chọn phương thức thanh toán</div>
            <div className="ant-radio-group ant-radio-group-outline">
                <label className="ant-radio-wrapper m-0 flex items-center border-b py-3" style={{ border: 'none' }}>
                    <span className="ant-radio">
                        <input type="radio" className="ant-radio-input" value="7"/>
                        <span className="ant-radio-inner"></span>
                    </span>
                    <span>
                        <div className="flex w-full items-center">
                            <img className="ml-4 mr-4 w-[40px]"
                                src="https://storage.googleapis.com/futa-busline-web-cms-prod/zalo_a38c879763/zalo_a38c879763.svg" alt="" />
                            <div className="flex w-full flex-col">
                                <div className="flex w-52 items-end justify-between">
                                    <span className="text-base text-black">ZaloPay</span>
                                </div>
                                <span className="whitespace-pre-wrap text-xs font-medium text-orange">
                                    Nhập mã ZLPFUTA10 giảm 10K đơn từ 300K. Nhập FUTA30 - Giảm 30% đặt vé Phương Trang trên App ZaloPay
                                </span>
                            </div>
                        </div>
                    </span>
                </label>
                <label className="ant-radio-wrapper m-0 flex items-center border-b py-3" style={{ border: 'none' }}>
                    <span className="ant-radio">
                        <input type="radio" className="ant-radio-input" value="11" />
                        <span className="ant-radio-inner"></span>
                    </span>
                    <span>
                        <div className="flex w-full items-center">
                            <img className="ml-4 mr-4 w-[40px]"
                                src="https://storage.googleapis.com/futa-busline-web-cms-prod/Logo_Shopee_Pay_2024_1fb07ef622/Logo_Shopee_Pay_2024_1fb07ef622.png" alt="" />
                            <div className="flex w-full flex-col">
                                <div className="flex w-52 items-end justify-between">
                                    <span className="text-base text-black">ShopeePay</span>
                                </div>
                                <span className="whitespace-pre-wrap text-xs font-medium text-orange">
                                    Nhập SPPFUTAT3 giảm 10K cho đơn từ 100K
                                </span>
                            </div>
                        </div>
                    </span>
                </label>
                <label className="ant-radio-wrapper m-0 flex items-center border-b py-3" style={{ border: 'none' }}>
                    <span className="ant-radio">
                        <input type="radio" className="ant-radio-input" value="6" />
                        <span className="ant-radio-inner"></span>
                    </span>
                    <span>
                        <div className="flex w-full items-center">
                            <img className="ml-4 mr-4 w-[40px]"
                                src="https://storage.googleapis.com/futa-busline-web-cms-prod/momo_bb732ac6f7/momo_bb732ac6f7.svg" alt="" />
                            <div className="flex w-full flex-col">
                                <div className="flex w-52 items-end justify-between">
                                    <span className="text-base text-black">MoMo</span>
                                </div>
                                <span className="whitespace-pre-wrap text-xs font-medium text-orange">
                                    Nhập mã FUTAMM10 giảm 10K - giao dịch từ 350K
                                </span>
                            </div>
                        </div>
                    </span>
                </label>
                <label className="ant-radio-wrapper m-0 flex items-center border-b py-3" style={{ border: 'none' }}>
                    <span className="ant-radio">
                        <input type="radio" className="ant-radio-input" value="8" />
                        <span className="ant-radio-inner"></span>
                    </span>
                    <span>
                        <div className="flex w-full items-center">
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
