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
        key: '/admin/type-car',
        icon: <SiAdminer />,
        label: 'Loại xe'
    },
    {
        key: '/admin/banner',
        icon: <PiFlagBannerDuotone />,
        label: 'Banner'
    },
    {
        key: '/admin/parent-location',
        icon: <PiFlagBannerDuotone />,
        label: 'Tỉnh Thành'
    },
    {
        key: '/admin/location',
        icon: <PiFlagBannerDuotone />,
        label: 'location'
    },
    {
        key: '/admin/route',
        icon: <PiFlagBannerDuotone />,
        label: 'Tuyến đường '
    },
    {
        key: '/admin/car',
        icon: <SiAdminer />,
        label: 'Xe'
    },
]

