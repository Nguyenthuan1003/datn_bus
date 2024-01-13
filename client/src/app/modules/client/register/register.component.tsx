import { Controller, useForm } from 'react-hook-form';
import ButtonRadiusCompoennt from '~/app/component/parts/button/button.component';
import { yupResolver } from '@hookform/resolvers/yup';
import { validateRegister } from '../../../utils/validateForm';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

const RegisterComponent = () => {
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(validateRegister)
    })
    const onSubmit = (data: any) => console.log(data)
    return (
        <div css={loginCss} className='w-[1128px] m-auto flex '>
            <div>
                <img src="https://storage.googleapis.com/futa-busline-cms-dev/TVC_00aa29ba5b/TVC_00aa29ba5b.svg" alt="" />
            </div>

            <div className='pl-[10px]'>
                <h2 className='font-bold text-[20px]'>Sign Up</h2>

                <form onSubmit={handleSubmit(onSubmit)} className='w-[400px] m-auto mt-4'>
                    <div className='flex'>
                        <div className='px-1'>
                            <Controller
                                control={control}
                                name='first_name'
                                render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                    <div>
                                        <label>First name</label>
                                        <input placeholder='First name' className='' type='text' value={value} onChange={onChange} ref={ref} />
                                    </div>
                                )}
                            />
                            {errors && <span className='text-red-600'>{errors.first_name?.message}</span>}
                        </div>

                        <div className=''>
                            <Controller
                                control={control}
                                name='last_name'
                                render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                    <div>
                                        <label>Last name</label>
                                        <input placeholder='Last name' className='' type='text' value={value} onChange={onChange} ref={ref} />
                                    </div>
                                )}
                            />
                            {errors && <span className='text-red-600'>{errors.last_name?.message}</span>}
                        </div>
                    </div>


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
                                name='phoneNumber'
                                render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                    <div>
                                        <label>Phone number</label>
                                        <input placeholder='Phone number' className='' type='text' value={value} onChange={onChange} ref={ref} />
                                    </div>
                                )}
                            />
                            {errors && <span className='text-red-600'>{errors.phoneNumber?.message}</span>}
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

                    <div className=''>
                        <div className='flex items-center'>
                            <span><input type="checkbox" /> </span>
                            <p className='px-2'> I agree to all the Terms and Privacy Policies</p>
                        </div>


                    </div>

                    <div className='text-center my-3'>
                        <ButtonRadiusCompoennt type="submit" content='Đăng Ký ' />
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