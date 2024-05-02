import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../../assets/img/logo_book_bus.png'
// import { profileUser } from '~/app/api/auth/auth.api';
import { UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, message } from 'antd'

const HeaderComponent = () => {
  // const token: any = getDecodedAccessToken();
  // const user = JSON.parse(localStorage.getItem('user')) || null;
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true')
  const [loading, setLoading] = useState<boolean>(false)
  const handleLogout = () => {
    localStorage.clear()
    localStorage.setItem('isLoggedIn', 'false')
    setIsLoggedIn(false)
    setLoading(true)
    setTimeout(() => {
      setUser(null) // Đặt lại user thành null sau 2 giây
      window.location.reload()
    }, 2000)
    navigate('/')
  }
  const [user, setUser] = useState<any>(null) // Sử dụng state để lưu trữ thông tin người dùng
    useEffect(() => {
        // Lấy dữ liệu người dùng từ localStorage khi component được render
        const userString = localStorage.getItem('user');
        if (userString) {
            const userData = JSON.parse(userString);
            setUser(userData);
        }
    }, []);
        const [roleId, setRoleId] = useState<any>(null);
        // console.log(user);
        // const history = useHistory();
          

    
  useEffect(() => {
    // Lấy dữ liệu người dùng từ localStorage khi component được render
    const userString = localStorage.getItem('user')
    if (userString) {
      const userData = JSON.parse(userString)
      setUser(userData)
    }
  }, [])

  // const history = useHistory();
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    message.info('Click on left button.')
    console.log('click left button', e)
  }

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '3') {
      message.info('đăng xuất thành công !')
    }
    console.log('click', e)
  }
  const menuItems : MenuProps['items'] = [
    {
      label: <Link to={'/account-information'}>Thông tin khách hàng</Link>,
      key: '1',
      style: { color: '#1890ff', fontSize: '16px', cursor: 'pointer', padding: '20px' },
      icon: <UserOutlined />
    },
    {
      label: <Link to={'/ticket-purchase-history'}>Lịch sử mua vé</Link>,
      key: '2',
      style: { color: '#1890ff', fontSize: '16px', cursor: 'pointer', padding: '20px' },
      icon: <UserOutlined />
    },
    {
      label: 'Logout',
      key: '3',
      style: { color: 'red', fontSize: '16px', cursor: 'pointer', padding: '20px' },
      icon: <UserOutlined />,
      onClick: () => {
        handleLogout()
      }
    }
  ];
  if (user && user.type_user === 'admin') {
  menuItems.push({
    label: <Link to={'/admin'}>Trang quản trị</Link>,
    key: '4',
    style: { color: '#1890ff', fontSize: '16px', cursor: 'pointer', padding: '20px' },
    icon: <UserOutlined />
  });
}
  const menuProps = {
    items:menuItems,
    onClick: handleMenuClick
  }

  const url = 'http://172.20.10.7:8000/'

  return (
    <>
      <header
        css={headerCss}
        className=' bg-gradient-to-b from-bgHeader to-primary h-[120px] fixed w-full z-20 top-0 left-0 '
      >
        <div className='header-container w-[1128px] m-auto py-6'>
          <div className='header__logo '>
            <Link className='flex justify-center items-center' to='/'>
              <img className='w-[70px]' src={logo} alt='BookBus Logo' />{' '}
              <h3 className='ml-2 font-semibold text-[20px]'>LetGo5</h3>
            </Link>
          </div>
          <nav>
            <ul className='navMenu__list'>
              <li className='navMenu__list-link hover-underline-animation underline-animation--active'>
                <Link to={'/'}>Trang chủ</Link>
              </li>
              <li className='navMenu__list-link hover-underline-animation'>
                <Link to={'/route-schedule'}>Lịch trình</Link>
              </li>
              <li className='navMenu__list-link hover-underline-animation'>
                <Link to={'/check-ticket'}>Tra cứu vé</Link>
              </li>
              <li className='navMenu__list-link hover-underline-animation'>
                <Link to={'/'}>Hóa đơn</Link>
              </li>
              <li className='navMenu__list-link hover-underline-animation'>
                <Link to={'/contact'}>Liên hệ</Link>
              </li>
              <li className='navMenu__list-link hover-underline-animation'>
                <Link to={'/about'}>Về chúng tôi</Link>
              </li>
            </ul>
          </nav>
          <div className='header__user flex justify-end items-center '>
            {loading ? (
              <div>Loading...</div>
            ) : user ? (
              <Dropdown menu={menuProps}>
                <div className='flex h-8 2lg:mr-1'>
                  <div className='ant-dropdown-trigger flex cursor-pointer items-center gap-4'>
                    <div className='h-8 rounded-full b-2 '>
                      <img
                        alt='avatar'
                        loading='lazy'
                        width='32'
                        height='32'
                        decoding='async'
                        data-nimg='1'
                        className='transition-all duration-200 h-8 rounded-full'
                        src={
                          `${isLoggedIn ? url : 'http://'}${user?.avatar}` ||
                          'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg'
                        }
                      />
                    </div>
                    <span className='font-medium text-white w-[100px]'>{user.name}</span>
                    <img src='https://futabus.vn/images/icons/icon_form_droplist.svg' alt='icon_form_droplist'></img>
                  </div>
                </div>
              </Dropdown>
            ) : (
              <div className='btn text-[12px]'>
                <Link to={'/register'}>Đăng kí</Link>/ <Link to={'/login'}>Đăng nhập</Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  )
}

export default HeaderComponent
const headerCss = css`
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header__socical {
    display: inline-block;
    margin-right: 100px;
  }
  .header__socical-list {
    list-style: none;
    display: flex;
    gap: 15px;
    font-size: 21px;
    color: white;
  }
  .navMenu {
    margin-top: 20px;
  }
  .navMenu__list {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .navMenu__list-link {
    padding: 0px 22px;
    border-radius: 7px;
    font-weight: 600;
    font-size: 1.2rem;
    color: var(--color-white);
    transition: all 0.3s ease;
    &:hover {
      // background-color: #f9a63d;
      // box-shadow: inset -8px -8px 0 rgba(255 255 255 / .5), inset 8px 8px0 rgba(0, 0, 0 / .5);
      // box-shadow: 0 0 10px rgba(0,0,0,.2);
    }
  }
  .hover-underline-animation {
    display: inline-block;
    position: relative;
  }

  .hover-underline-animation::after,
  .hover-underline-animation:active::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 4px;
    bottom: -10px;
    left: 0;
    background-color: #2563eb;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  .hover-underline-animation:hover::after,
  .hover-underline-animation:active::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }

  .btn {
    text-transform: uppercase;
    cursor: pointer;
    outline: none;
    border: none;
    color: #000;
    padding: 5px 10px;
    font-weight: 600;
    border-radius: 7px;
    /*background-image: linear-gradient(to right,#ffc08b ,
        #fbaf41);*/
    background-color: white;
    transition: all 0.3s ease;
    &:active {
      transform: scale(0.9);
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`
