import { Controller, useForm } from 'react-hook-form';
import ButtonRadiusCompoennt from '~/app/component/parts/button/button.component';
import { yupResolver } from '@hookform/resolvers/yup';
import { validateLogin } from '../../../utils/validateForm';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

const LoginComponent = () => {
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(validateLogin)
    })
    const onSubmit = (data: any) => console.log(data)
    return (
        <div css={loginCss} className='w-[1128px] m-auto flex '>
            <div>
                <img src="https://storage.googleapis.com/futa-busline-cms-dev/TVC_00aa29ba5b/TVC_00aa29ba5b.svg" alt="" />
            </div>

            <div className='pl-[10px]'>
                <h2 className='font-bold text-[20px]'>Sign In</h2>

                <form onSubmit={handleSubmit(onSubmit)} className='w-[400px] m-auto mt-4'>
                    <div className=''>
                        <Controller
                            control={control}
                            name='email'
                            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                <div>
                                    <label>Email</label>
                                    <input placeholder='Vui lòng nhập Email' className='' type='email' value={value} onChange={onChange} ref={ref} />
                                </div>
                            )}
                        />
                        {errors && <span className='text-red-600'>{errors.email?.message}</span>}
                    </div>


                    <div className='my-5'>
                        <Controller
                            control={control}
                            name='password'
                            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                <div>
                                    <label>Password</label>
                                    <input placeholder='Vui lòng nhập Password' className='' type='password' value={value} onChange={onChange} ref={ref} />
                                </div>
                            )}
                        />
                        {errors && <span className='text-red-600'>{errors.password?.message}</span>}
                    </div>

                    <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <span><input type="checkbox" /> </span>
                            <p className='px-2'> Đồng ý các điều khoản</p>
                        </div>

                        <div className='text-blue-500 underline'>
                            Quên mật khẩu?
                        </div>
                    </div>

                    <div className='text-center my-3'>
                        <ButtonRadiusCompoennt type="submit" content='Đăng nhập ' />
                    </div>

                    <div className='text-center'>
                        <p>Bạn chưa có tài khoản? <span className='text-blue-500'><Link to={"/register"}>Register</Link></span></p>
                    </div>

                    <div className='text-center text-gray-400'>
                        Hoặc đăng kí với tài khoản
                    </div>
                    <div className='flex  mt-3  justify-around'>
                        <div className='border border-gray-500 rounded-md px-12 py-2'>
                            <FaFacebook className='text-blue-600' />
                        </div>
                        <div className='border border-gray-500 rounded-md px-12 py-2'>
                            <FaGoogle className='text-red-500' />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginComponent

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