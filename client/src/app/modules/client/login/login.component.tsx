import { Controller, useForm } from 'react-hook-form'
import ButtonRadiusCompoennt from '~/app/component/parts/button/button.component'
import { yupResolver } from '@hookform/resolvers/yup'
import { validateLogin } from '../../../utils/validateForm'
import { css } from '@emotion/react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '~/app/api/auth/auth.api'
import { message, Spin } from 'antd'
import { useState } from 'react'
import { data } from 'autoprefixer'
import Swal from 'sweetalert2'

const LoginComponent = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validateLogin)
  })
  const onSubmit = async (value: any) => {
    setIsLoading(true)
    try {
      const data: any = await login(value)
      if (data) {
        if (data.data.message === 'ok') {
          localStorage.setItem('token', data?.data?.data?.jwt?.original?.access_token)
          localStorage.setItem('user', JSON.stringify(data?.data?.data?.user))
          setTimeout(() => {
            setShowSuccessMessage(true)
            setIsLoading(false) // Đặt isLoading về false để dừng loading spinner
          }, 2000)
          // Kiểm tra type_user và navigate đến trang tương ứng
          const type_user = data?.data?.data?.user?.type_user
          if (type_user === 'admin') {
            setOpen(true)
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: `Chào Mừng bạn quay lại trang quản trị!`,
              showConfirmButton: false,
              timer: 1000
            })
            navigate('/admin')
          } else if (type_user === 'driver') {
            setOpen(true)
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: `Chào Mừng bạn quay lại trang quản trị!`,
              showConfirmButton: false,
              timer: 1000
            })
            navigate('/admin/check-ticket')
          } else if (type_user === 'user') {
            setOpen(true)
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: `Đăng nhập thành công !`,
              showConfirmButton: false,
              timer: 1000
            })
            navigate('/')
            setTimeout(() => {
              window.location.reload()
            }, 1000)
          }
        } else {
          if (data.error) {
            message.warning('Tài khoản hoặc mật khẩu sai!')
            setIsLoading(false)
          }
        }
      }
    } catch (error: any) {
      message.error(error.response.data.error)
      setIsLoading(false)
    }
  }
  return (
    <div css={loginCss} className='w-full m-auto flex '>
      <div className="max-lg:hidden ml-40">
        <img src='https://storage.googleapis.com/futa-busline-cms-dev/TVC_00aa29ba5b/TVC_00aa29ba5b.svg' alt='' />
      </div>

      <div className='pl-[10px] max-lg:mx-auto'>
        <h2 className='font-bold text-[20px] max-lg:text-center max-lg:'>Sign In</h2>

        <form onSubmit={handleSubmit(onSubmit)} className='w-[400px] m-auto mt-4'>
          <div className=''>
            <Controller
              control={control}
              name='email'
              render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                <div>
                  <label>Email</label>
                  <input
                    placeholder='Vui lòng nhập Email'
                    className=''
                    type='email'
                    value={value}
                    onChange={onChange}
                    ref={ref}
                  />
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
                  <label>Mật khẩu</label>
                  <input
                    placeholder='Vui lòng nhập Password'
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

          <div className='flex justify-between'>
            {/* <div className='flex items-center'>
              <span>
                <input type='checkbox' />{' '}
              </span>
              <p className='px-2'> Đồng ý các điều khoản</p>
            </div> */}

            <a href='/forgot-pass'>Quên mật khẩu?</a>
          </div>

          <div className='text-center my-3'>
            {isLoading ? (
              <>
                Đang đăng nhập <Spin />
              </>
            ) : (
              <ButtonRadiusCompoennt type='submit' content='Đăng nhập' />
            )}
          </div>

          <div className='text-center'>
            <p>
              Bạn chưa có tài khoản?{' '}
              <span className='text-blue-500'>
                <Link to={'/register'}>Register</Link>
              </span>
            </p>
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
