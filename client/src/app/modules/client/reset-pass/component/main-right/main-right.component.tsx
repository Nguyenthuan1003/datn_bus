import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ButtonRadiusCompoennt from '~/app/component/parts/button/button.component'
import { yupResolver } from '@hookform/resolvers/yup'
import { validateForgot } from '~/app/utils/validateForm'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import { message } from 'antd'
import { axiosPrivate } from '~/app/api/confighHTTp'

const MainRight = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validateForgot)
  })
  const onSubmit = async (data: any) => {
    try {
      const response = await axiosPrivate.post('/forgotpassword', {
        email: data.email
      });

      if (response.status === 200) {
        message.success(response.data.data.status);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        console.error(error);
      }
    }
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
      <div className='m-auto flex '>
        <div className='ml-12 mt-[20px]'>
          <h2 className='font-bold text-[20px] mb-5 ml-72'>Đặt lại mật khẩu</h2>

          <p className='text-center py-4 mx-auto text-[18px]'>
            Chỉ cần nhập địa chỉ email của bạn dưới đây và chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu của
            bạn!
          </p>

          <form onSubmit={handleSubmit(onSubmit)} class='max-w-sm mx-auto'>
            <div class='mb-5'>
              <Controller
                control={control}
                name='email'
                render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                  <div>
                    <label>Nhập Email</label>
                    <input
                      placeholder='Vui lòng nhập email'
                      className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                      type='text'
                      value={value}
                      onChange={onChange}
                      ref={ref}
                    />
                  </div>
                )}
              />
              {errors && <span className='text-red-600'>{errors.email?.message}</span>}
            </div>
            <div className='text-center my-3'>
              <ButtonRadiusCompoennt type='submit' content='Đổi mật khẩu ' />
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
    width: '100%';
    padding: '6px 12px';
    borderradius: '8px';
    border: '1px solid #dde2e8';
    outline: 'none';
  }

  input:focus {
    bordercolor: 'orange';
    outline: 'none';
  }
`
