import React, { useEffect, useRef } from 'react'
import LeftComponent from '../payment/component/left.component'
import { useCartRedux } from '../redux/hook/useCartReducer'

const PaymentComponent = () => {
    const {data:{cart}}=useCartRedux()
    const paymentRef = useRef<any>(null);
    useEffect(() => {
        // Kiểm tra nếu paymentRef tồn tại và không phải là null
        if (paymentRef.current) {
            // Cuộn đến vị trí của phần tử paymentRef
            paymentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []); // Trigger lại useEffect khi giá trị của cart thay đổi


    return (
        <div className='w-full'>
           
            <div className='layout flex flex-wrap  py-5 px-40'>
                
                <div className="w-[320px] flex-col flex">
                    
                    <LeftComponent />
                </div>
                <div className=':grid-cols-1 flex flex-wrap gap-6'>
                    <div className="flex-col items-center overflow-x-hidden text-center w-[360px] ml-16">
                        <div className="text-gray text-base font-medium">Tổng thanh toán</div>
                        <div className="mb-6 text-5xl font-semibold text-orange">{cart?.total_money_after_discoun}</div>
                        <div className="rounded-2xl bg-[#FAFAFC] p-4">
                            <span className="text-[13px] text-[#EC9B04]">Thời gian giữ chỗ còn lại
                                <span className="font-medium">03 : 38</span>
                            </span>
                            {/* <div className="relative mt-4 aspect-square w-80 rounded-lg bg-white">
                                <img alt="qr code" loading="lazy" decoding="async" data-nimg="fill"
                                    className="transition-all duration-200 relative mt-4 aspect-square w-80 rounded-lg bg-white"
                                    src="https://api.futabus.vn/ticket-online/api/qrcode?Content=https%3A%2F%2Fgateway.zalopay.vn%2Fopeninapp%3Forder%3DeyJ6cHRyYW5zdG9rZW4iOiJBQ243YkdaU2p5WmZ6OEJHZUZKRC1CbXciLCJhcHBpZCI6MzYwfQ%3D%3D&amp;Size=180&amp;Color=Black&amp;Logo=zalopay.png"
                                    style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', color: 'transparent' }} />
                            </div> */}
                            {/* <div className="flex h-80 w-80 flex-col items-center justify-center gap-3">
                                <span role="img" aria-label="reload" className="anticon anticon-reload text-5xl">
                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="reload" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                        <path d="M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-.7-8.9-4.9-10.3l-56.7-19.5a8 8 0 00-10.1 4.8c-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4A344.77 344.77 0 01655.9 829c-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27A341.5 341.5 0 01279 755.2a342.16 342.16 0 01-73.7-109.4c-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27a341.5 341.5 0 01109.3 73.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c-.1-6.6-7.8-10.3-13-6.2z"></path>
                                    </svg>
                                </span>Tải lại mã thanh toán
                            </div> */}
                            {/* <div className="ml-2 mt-6 flex flex-col items-start gap-3">
                                <div className="text-green font-medium">Hướng dẫn thanh toán bằng ZaloPay</div>
                                <div className="flex gap-2 text-left">
                                    <div className="h-6 rounded-full bg-gray-500 px-2 pt-1 text-xs text-white">1</div>
                                    <span>Mở ứng dụng ZaloPay trên điện thoại</span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="rounded-full bg-gray-500 px-2 pt-1 text-xs text-white">2</div>
                                    Dùng biểu tượng để quét mã QR
                                </div>
                                <div className="flex gap-2">
                                    <div className="rounded-full bg-gray-500 px-2 pt-1 text-xs text-white">3</div>
                                    Quét mã ở trang này và thanh toán
                                </div>
                            </div> */}
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
                                {/* <div className="mt-1 flex items-center justify-between">
                                    <span className="text-gray w-28">Thời gian</span>
                                    <span className="text-[#00613D]">16:35 01-03-2024</span>
                                </div> */}
                                <div className="mt-1 flex items-center justify-between">
                                    <span className="text-gray w-28">Số lượng ghế</span>
                                    <span className="text-black">{cart?.total_seat}</span>
                                </div>
                                <div className="mt-1 flex items-center justify-between">
                                    <span className="text-gray w-28">Số ghế</span>
                                    {/* <span className="text-[#00613D]">{cart && cart.seat_id ? cart.seat_id.join(", ") : ''}</span> */}
                                    <span className="text-[#00613D]">{cart?.code_seat}</span>

                                </div>
                                <div className="mt-1 flex items-center justify-between">
                                    <span className="text-gray w-40">Điểm lên xe</span>
                                    <span className="text-right text-black">{cart?.location?.start_location}</span>
                                </div>
                                <div className="mt-1 flex items-center justify-between">
                                    <span className="text-gray">Tổng tiền lượt đi</span>
                                    <span className="text-[#00613D]">{cart?.total_money }</span>
                                </div>
                            </div>
                            <div className="w-full rounded-xl border border-[#DDE2E8] bg-white px-4 py-3 text-[15px]">
                                <div className="icon-orange flex gap-2 text-xl font-medium text-black">Chi tiết giá</div>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-gray">Giá vé lượt đi</span>
                                    <span className="text-orange">{cart?.total_money}</span>
                                </div>
                                <div className="mt-1 flex items-center justify-between">
                                    <span className="text-gray">Phí thanh toán</span>
                                    <span className="text-black"></span>
                                </div>
                                <div className="divide my-3"></div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray">Tổng tiền</span>
                                    <span className="text-orange">{cart?.total_money_after_discoun}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentComponent