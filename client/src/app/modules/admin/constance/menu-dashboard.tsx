import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { SiAdminer } from 'react-icons/si'
import { PiFlagBannerDuotone } from 'react-icons/pi'
import { BsTicketPerforated } from 'react-icons/bs'
import { CiMoneyCheck1 } from 'react-icons/ci'
export const menuDashBoard = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: 'Trang web',
    roles: ['admin', 'driver', 'assistant']
  },
  {
    key: '/admin',
    icon: <SiAdminer />,
    label: 'Trang thống kê',
    roles: ['admin']
  },
  {
    key: '/admin/type-car',
    icon: <SiAdminer />,
    label: 'Loại xe',
    roles: ['admin']
  },
  // {
  //   key: '/admin/banner',
  //   icon: <PiFlagBannerDuotone />,
  //   label: 'Banner',
  //   roles: ['admin']
  // },
  {
    key: '/admin/parent-location',
    icon: <PiFlagBannerDuotone />,
    label: 'Tỉnh Thành',
    roles: ['admin']
  },
  {
    key: '/admin/user',
    icon: <UserOutlined />,
    label: 'Người dùng',
    roles: ['admin']
  },
  {
    key: '/admin/type-user',
    icon: <UserOutlined />,
    label: 'Vai trò',
    roles: ['admin']
  },
  {
    key: '/admin/location',
    icon: <PiFlagBannerDuotone />,
    label: 'Địa Điểm',
    roles: ['admin']
  },
  {
    key: '/admin/route',
    icon: <PiFlagBannerDuotone />,
    label: 'Tuyến đường ',
    roles: ['admin']
  },
  {
    key: '/admin/car',
    icon: <SiAdminer />,
    label: 'Xe',
    roles: ['admin']
  },
  {
    key: '/admin/trip',
    icon: <PiFlagBannerDuotone />,
    label: 'Chuyến đi',
    roles: ['admin']
  },
  {
    key: '/admin/bill',
    icon: <PiFlagBannerDuotone />,
    label: 'Đơn Hàng',
    roles: ['admin']
  },
  {
    key: '/admin/check-ticket',
    icon: <BsTicketPerforated />,
    label: 'Checkin Ticket',
    roles: ['admin', 'driver', 'assistant']
  },
  {
    key: '/admin/check-bill',
    icon: <CiMoneyCheck1 />,
    label: 'Checkin Bill',
    roles: ['admin', 'driver', 'assistant']
  },
  {
    key: '/admin/type-discount',
    icon: <CiMoneyCheck1 />,
    label: 'Loại giảm giá',
    roles: ['admin']
  },  {
    key: '/admin/discount-code',
    icon: <CiMoneyCheck1 />,
    label: 'Mã giảm giá',
    roles: ['admin']
  }
]

// Hàm này sẽ lọc menuDashBoard dựa trên type_user
export function filterMenuByUserType(type_user) {
  // Lọc menuDashBoard dựa trên type_user
  return menuDashBoard.filter((menu) => menu.roles.includes(type_user))
}

// Sử dụng hàm filterMenuByUserType để lấy menu tương ứng với type_user
const user = JSON.parse(localStorage.getItem('user'))
const userMenu = filterMenuByUserType(user?.type_user)
