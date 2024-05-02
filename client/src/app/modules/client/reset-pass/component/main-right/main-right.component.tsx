import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ButtonRadiusCompoennt from '~/app/component/parts/button/button.component'
import { yupResolver } from '@hookform/resolvers/yup'
import { validateResetPass } from '~/app/utils/validateForm'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import { message, Spin } from 'antd'
import { axiosPrivate } from '~/app/api/confighHTTp'
import { data } from 'autoprefixer'
import Swal from 'sweetalert2'

const MainRight = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validateResetPass)
  })
  const onSubmit = async (data: any) => {
    console.log(data)
  }
  return (
    <div css={loginCss}>
      <div className='flex justify-between '>
        <div>
          <h2 className='font-medium text-[23px]'>Đặt lại mật khẩu</h2>
          <div className='text-gray-500 mt-2 text-[13px] font-normal sm:text-[15px]'>
            Đổi mật khẩu dễ dàng và nhanh chóng
          </div>
        </div>

        <div className='button-wrapper mt-2'>
          <Link to={'/forgot-pass'}>
            <ButtonRadiusCompoennt content='Quên mật khẩu' />
          </Link>
        </div>
      </div>
      <div className='m-auto'>
        <div className='ml-12 mt-[20px]'>
          <h2 className='font-bold text-[20px] mb-5 ml-72'>Đặt lại mật khẩu</h2>

          <form onSubmit={handleSubmit(onSubmit)} className='mx-32 mt-4'>
            <div className=''>
              <Controller
                control={control}
                name='password'
                render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                  <div>
                    <label>Mật khẩu cũ</label>
                    <input
                      placeholder='Vui lòng nhập mật khẩu cũ'
                      className=''
                      type='password'
                      value={value}
                      onChange={onChange}
                      ref={ref}
                    />
                  </div>
                )}
              />
              {errors && <span className='text-red-600'>{errors.password?.message}</span>}
            </div>

            <div className='my-5'>
              <Controller
                control={control}
                name='newpassword'
                render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                  <div>
                    <label>Mật khẩu mới</label>
                    <input
                      placeholder='Vui lòng nhập mât khẩu mới'
                      className=''
                      type='password'
                      value={value}
                      onChange={onChange}
                      ref={ref}
                    />
                  </div>
                )}
              />
              {errors && <span className='text-red-600'>{errors.newpassword?.message}</span>}
            </div>

            <div className='my-5'>
              <Controller
                control={control}
                name='confirmpassword'
                render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                  <div>
                    <label>Xác nhận mật khẩu</label>
                    <input
                      placeholder='Vui lòng nhập xác nhận mật khẩu'
                      className=''
                      type='password'
                      value={value}
                      onChange={onChange}
                      ref={ref}
                    />
                  </div>
                )}
              />
              {errors && <span className='text-red-600'>{errors.confirmpassword?.message}</span>}
            </div>
            <div className='mx-40'>
              <ButtonRadiusCompoennt type='submit' content='Đổi mật khẩu' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MainRight

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
