import { Controller, useForm } from 'react-hook-form';
import ButtonRadiusCompoennt from '~/app/component/parts/button/button.component';
import { yupResolver } from '@hookform/resolvers/yup';
import { validateRegister } from '../../../utils/validateForm';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { register } from '~/app/api/auth/auth.api';
import { message } from 'antd';
import Swal from 'sweetalert2';
import { useState } from 'react';
const RegisterComponent = () => {
    const [spinning, setSpinning] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    console.log('error',error);
    
    const [open, setOpen] = useState(false);
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(validateRegister)
    })
    const onSubmit = (data: any) => {
        try {
             setSpinning(true)
        register(data).then((res)=>{
            if(res.data.message === 'ok' ){
                setOpen(true);
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: `đăng ký thành công !`,
                    showConfirmButton: false,
                    timer: 2000
                  })
                  return;
            } 
            else if (res?.data?.error) {
                setOpen(true);
                Swal.fire({
                    position: 'top',
                    icon: 'warning',
                    title: 'Opps!',
                    text: res.data.error.email[0] || res.data.error.phone_number[0], // Hiển thị lỗi từ API
                    timer: 2000
                });
            }
        })
        } catch (error) {
            Swal.fire({
                title: 'Opps!',
                text: `${data?.error?.email[0]}`,
                icon: 'error',
                confirmButtonText: 'Quay lại'
              })
        }
        finally {
            setSpinning(false);
          }
       
    }
    return (
        <div css={loginCss} className='w-[1128px] m-auto flex '>
            <div>
                <img src="https://storage.googleapis.com/futa-busline-cms-dev/TVC_00aa29ba5b/TVC_00aa29ba5b.svg" alt="" />
            </div>

            <div className='pl-[10px]'>
                <h2 className='font-bold text-[20px]'>Sign Up</h2>

                <form onSubmit={handleSubmit(onSubmit)} className='w-[400px] m-auto mt-4'>
                 
                    <div className='flex my-5'>
                        <div className='px-1'>
                            <Controller
                                control={control}
                                name='email'
                                render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                    <div>
                                        <label>Email address</label>
                                        <input placeholder='Email address' className='' type='email' value={value} onChange={onChange} ref={ref} />
                                    </div>
                                )}
                            />
                            {errors && <span className='text-red-600'>{errors.email?.message}</span>}
                        </div>
                        <div className=''>
                            <Controller
                                control={control}
                                name='phone_number'
                                render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                    <div>
                                        <label>Phone number</label>
                                        <input placeholder='Phone number' className='' type='text' value={value} onChange={onChange} ref={ref} />
                                    </div>
                                )}
                            />
                            {errors && <span className='text-red-600'>{errors.phone_number?.message}</span>}
                            {error && <span className='text-red-600'>{error.phone_number[0]}</span>}
                        </div>
                    </div>

                    <div className='mb-2'>
                        <Controller
                            control={control}
                            name='password'
                            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                <div>
                                    <label>Password</label>
                                    <input placeholder='password' className='' type='password' value={value} onChange={onChange} ref={ref} />
                                </div>
                            )}
                        />
                        {errors && <span className='text-red-600'>{errors.password?.message}</span>}
                    </div>
                    <div className='mb-2'>
                        <Controller
                            control={control}
                            name='comfirmPassWord'
                            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                <div>
                                    <label>Password</label>
                                    <input placeholder='comfirmPassWord' className='' type='password' value={value} onChange={onChange} ref={ref} />
                                </div>
                            )}
                        />
                        {errors && <span className='text-red-600'>{errors.comfirmPassWord?.message}</span>}
                    </div>

                    <div className=''>
                        {/* <div className='flex items-center'>
                            <span><input type="checkbox" /> </span>
                            <p className='px-2'> I agree to all the Terms and Privacy Policies</p>
                        </div> */}


                    </div>

                    <div className='text-center my-3'>
                        <ButtonRadiusCompoennt type="submit" content='Đăng Ký ' />
                    </div>
                    <div className="w-full relative my-6 flex items-center py-3">
                        <hr className="bg-[#66666640] w-full h-[2px]" />

                        <span className="subtitle-4 text-[#666666] bg-white absolute top-[3px] w-[12%] left-[44%] text-center"> OR </span>
                    </div>

                    <div className='flex flex-col gap-y-4'>
                        <button className='border border-gray-500 rounded-md px-12 py-2'>
                            <FaFacebook className='text-blue-600 -mb-[20px] ml-[35px]' /> 
                            Đăng nhập với Facebook
                        </button>
                        <button className='border border-gray-500 rounded-md px-12 py-2'>
                            <FaGoogle className='text-red-500 -mb-[20px] ml-[45px]' /> 
                            Đăng nhập với Google
                        </button>
                    </div>

                    <div className='text-center mt-2'>
                        <p>Bạn chưa có tài khoản? <span className='text-blue-500'><Link to={"/login"}>Login</Link></span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterComponent

const loginCss = css`
input {
    width: 100%;
    padding: 6px 12px;
    border-radius: 8px;
    border: 1px solid #dde2e8;
    outline: none;
}

input:focus {
    border-color: orange;
    outline: none; 
}
`