import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Spin } from 'antd'

const MenuAccount = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const handleLogout = () => {
    localStorage.clear()
    setLoading(true)
    setMessage('Đăng xuất thành công!')
    setUser(null)
    navigate('/')
    setTimeout(() => {
      window.location.reload()
    }, 3000)
  }
  const [user, setUser] = useState<any>(null)
  console.log('menuuser',user);
  
  return (
    <div className='col-span-12 hidden rounded-2xl border p-2 sm:col-span-3 lg:block mt-[89px]'>
      {loading ? (
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none'
          }}
        >
          <div className='example'>
            <Spin />
          </div>
          {message && <p>{message}</p>}
        </div>
      ) : (
        <div className='col-span-12 hidden rounded-2xl p-2 sm:col-span-3 lg:block'>
          <Link to={'/account-information'}>
            <div className='rounded-lg px-3 py-[9.5px]'>
              <div className='flex items-center p-2'>
                <img src='	https://futabus.vn/images/header/profile/Profile.svg' alt='' />
                <span className='ml-3'>Thông tin tài khoản</span>
              </div>
            </div>
          </Link>

          <Link to={'/ticket-purchase-history'}>
            <div className='rounded-lg px-3 py-[9.5px]'>
              <div className='flex items-center p-2'>
                <img src='https://futabus.vn/images/header/profile/History.svg' alt='' />
                <span className='ml-3'>Lịch sử mua vé</span>
              </div>
            </div>{' '}
          </Link>

          <Link to='/reset-pass'>
            <div className='rounded-lg px-3 py-[9.5px]'>
              <div className='flex items-center p-2'>
                <img src='	https://futabus.vn/images/header/profile/Password.svg' alt='' />
                <span className='ml-3'>Đặt lại mật khẩu</span>
              </div>
            </div>
          </Link>

          <div className='rounded-lg px-3 py-[9.5px]'>
            <div className='flex items-center p-2'>
              <img src='	https://futabus.vn/images/header/profile/Logout.svg' alt='' />
              <button className='ml-3' onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuAccount
