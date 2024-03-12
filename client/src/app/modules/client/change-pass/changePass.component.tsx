import { Controller, useForm } from 'react-hook-form';
import ButtonRadiusCompoennt from '../../../component/parts/button/button.component';
import { yupResolver } from '@hookform/resolvers/yup';
import { validateLogin } from '../../../utils/validateForm';
import { css } from '@emotion/react';
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

const ChangeComponent = () => {
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
                <h2 className='font-bold text-[20px]'>Thay đổi mật khẩu</h2>

                <form onSubmit={handleSubmit(onSubmit)} className='w-[400px] m-auto mt-4'>
                <div className='my-5'>
                        <Controller
                            control={control}
                            name='password'
                            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                <div>
                                    <label>Mật khẩu cũ</label>
                                    <input placeholder='Vui lòng nhập mật khẩu cũ' className='' type='password' value={value} onChange={onChange} ref={ref} />
                                </div>
                            )}
                        />
                        {errors && <span className='text-red-600'>{errors.password?.message}</span>}
                    </div>


                    <div className='my-5'>
                        <Controller
                            control={control}
                            name='password'
                            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                <div>
                                    <label>Mật khẩu mới</label>
                                    <input placeholder='Vui lòng nhập mật khẩu mới' className='' type='password' value={value} onChange={onChange} ref={ref} />
                                </div>
                            )}
                        />
                        {errors && <span className='text-red-600'>{errors.password?.message}</span>}
                    </div>

                    <div className='my-5'>
                        <Controller
                            control={control}
                            name='password'
                            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                <div>
                                    <label>Xác nhận mật khẩu</label>
                                    <input placeholder='Vui lòng xác nhận mật khẩu' className='' type='password' value={value} onChange={onChange} ref={ref} />
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

                        <a href='/forgot-pass' className='text-blue-500 underline'>
                            Quên mật khẩu?
                        </a>
                    </div>

                    <div className='text-center my-3'>
                        <ButtonRadiusCompoennt type="submit" content='Đổi mật khẩu ' />
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
                </form>
            </div>
        </div>
    )
}

export default ChangeComponent

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