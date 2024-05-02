import React, { FC, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import ButtonRadiusCompoennt from '~/app/component/parts/button/button.component';
import { css } from '@emotion/react';
import { getOneUser } from '~/app/api/auth/auth.api';

const CustomerInformation: FC<any> = ({ control, errors }) => {
    const [user, setUser] = useState<any>({})
    const token = localStorage.getItem("token");
    // console.log(token);

    useEffect(() => {
        if (!token) {
            // window.location.href='/login';
            console.log('chua đăng nhập');
            return;
        }

        getOneUser(token).then(res => {
            setUser(res);
        }).catch(error => {
            console.error('Error fetching user:', error);
            // Xử lý lỗi nếu cần
        });
    }, [token]);

    return (
        <div css={custommerCss} className='bg-white'>
            <div className='flex'>
                <div className='px-4 w-[50%]'>
                    <h2 className='py-3 font-semibold text-[18px]'>Thông tin khách hàng</h2>
                    {/* <form onSubmit={handleSubmit(onSubmit)} > */}

                    <div className='my-1'>
                        <Controller
                            control={control}
                            name='name'
                            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                <div>
                                    <span className='font-medium text-[14px]'>Họ và tên</span>
                                    <input className='' type='text' value={value} onChange={onChange} ref={ref} />
                                </div>
                            )}
                        />
                        {errors && <span className='text-red-600'>{errors.name?.message}</span>}
                    </div>

                    <div className=''>
                        <Controller
                            control={control}
                            name='phone_number'
                            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                <div>
                                    <span className='font-medium text-[14px]'>Số điện thoại</span>
                                    <input className='' type='text' value={value} onChange={onChange} ref={ref} />
                                </div>
                            )}
                        />
                        {errors && <span className='text-red-600'>{errors.phone_number?.message}</span>}
                    </div>


                    <div className='my-5'>
                        <Controller
                            control={control}
                            name='email'
                            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (

                                <div>
                                    <span className='font-medium text-[14px]'>Email</span>
                                    <input className='' type='text' value={value} onChange={onChange} ref={ref} />
                                </div>
                            )}
                        />
                        {errors && <span className='text-red-600'>{errors.email?.message}</span>}
                    </div>
                    {/* </form> */}
                </div>

                <div className='w-[45%]'>
                    <h2 className='py-3 font-semibold text-[18px] text-orange-600'>ĐIỀU KHOẢN & LƯU Ý</h2>
                    <p className='text-[14px] font-semibold'>(*) Quý khách vui lòng có mặt tại bến xuất phát của xe trước ít nhất 30 phút giờ xe khởi hành, mang theo thông báo đã thanh toán vé thành công có chứa mã vé được gửi từ hệ thống Letgo 5. Vui lòng liên hệ  <span className='text-orange-600'>0906198183</span> để được hỗ trợ.</p> <br />

                    <p className='text-[14px] font-semibold'>(*) Nếu quý khách có nhu cầu trung chuyển, vui lòng liên hệ Tổng đài trung chuyển <span className='text-orange-600'>0906198183</span> trước khi đặt vé. Chúng tôi không đón/trung chuyển tại những điểm xe trung chuyển không thể tới được.</p>
                </div>
            </div>
            {/* <div className=''>  
            <Controller
                control={control}
                name='acceptTerms'
                defaultValue={false} // Giá trị mặc định là false
                render={({ field: { onChange, value } }) => (
                    <div className='flex p-4 w-[200px]'>
                        <input
                            type="checkbox"
                            name="acceptTerms"
                            id="acceptTerms"
                            checked={value}
                            onChange={(e) => onChange(e.target.checked)}
                            className='w-[12px]'
                        />
                        <label htmlFor="acceptTerms" className='text-orange-600 underline px-1'>Chấp nhận điều khoản</label>
                        <span>đặt vé & chính sách bảo mật thông tin của FUTABusline</span>
                    </div>
                )}
                rules={{ required: 'Bạn cần chấp nhận điều khoản' }}
            />
            {errors.acceptTerms && <span className='text-red-600'>{errors.acceptTerms.message}</span>}
            </div> */}
        </div >
    )
}

export default CustomerInformation

const custommerCss = css`
    .chair {
        box-sizing: border-box;
        border: 0 solid #e5e7eb;
        border-radius: 6px;
    }

    input {
        width: 100%;
        padding: 8px 12px;
        border-radius: 8px;
        border: 1px solid #dde2e8;
        outline: none;
    }

    
input:focus {
    border-color: orange;
    outline: none; 
}
`;