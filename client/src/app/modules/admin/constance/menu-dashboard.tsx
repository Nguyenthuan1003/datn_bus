import {
    HomeOutlined, UserOutlined,
} from '@ant-design/icons'
import { SiAdminer } from 'react-icons/si'
import { PiFlagBannerDuotone } from "react-icons/pi";
export const menuDashBoard =[
    {
        key: '/',
        icon: <HomeOutlined />,
        label: 'Trang chủ'
    },
    {
        key: '/admin',
        icon: <SiAdminer />,
        label: 'Bảng điều kiển'
    },
    {
        key: '/admin/user',
        icon: <UserOutlined />,
        label: 'Người dùng'
    },
    {
        key: '/admin/banner',
        icon: <PiFlagBannerDuotone />,
        label: 'Banner'
    }
]

