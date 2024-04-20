import { Controller, useForm } from 'react-hook-form';
import ButtonRadiusCompoennt from '../../../component/parts/button/button.component';
import { yupResolver } from '@hookform/resolvers/yup';
import { validateForgot } from '../../../utils/validateForm';
import { css } from '@emotion/react';

const ForgotPassComponent = () => {
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(validateForgot)
    })
    const onSubmit = (data: any) => console.log(data)
    return (
        <div css={loginCss} className='w-[1128px] m-auto flex bg-[]'>
            <div>
                <img src="https://storage.googleapis.com/futa-busline-cms-dev/TVC_00aa29ba5b/TVC_00aa29ba5b.svg" alt="" />
            </div>

            <div className='pl-[10px]'>
                <h2 className='font-bold text-[30px] text-center'>Quên mật khẩu</h2>

                <p className='text-center py-4 px-10 text-[18px]'>Chỉ cần nhập địa chỉ email của bạn dưới đây và chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu của bạn!</p>

                <form onSubmit={handleSubmit(onSubmit)} className='w-[400px] m-auto mt-4'>
                    <div className='py-4'>
                        <Controller
                            control={control}
                            name='email'
                            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                <div>
                                    <label>Nhập Email</label>
                                    <input placeholder='Vui lòng nhập Email' className='' type='email' value={value} onChange={onChange} ref={ref} />
                                </div>
                            )}
                        />
                        {errors && <span className='text-red-600'>{errors.email?.message}</span>}
                    </div>

                    <div className='flex justify-between'>

                        <a href='/login' className='text-blue-500  '>
                            Quay lại
                        </a>
                    </div>

                    <div className='text-center my-3'>
                        <ButtonRadiusCompoennt type="submit" content='Đặt lại mật khẩu ' />
                    </div>

                    {/* <div className="w-full relative my-6 flex items-center py-3">
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
                    </div> */}
                </form>
            </div>
        </div>
    )
}

export default ForgotPassComponent

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