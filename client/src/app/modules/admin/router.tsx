import { RouteObject } from 'react-router-dom'
import DashboardComponent from './dashboard/dashboard.component'
import BannerAdmin from './banner/banner-admin.conponent'
import ParentLocaltion from './parent-location/parent-location.component'
import LocaltionComponent from './location/location.component'
import RouteComponent from './route/route.component'
import TripComponent from './trip/trip.component'
import CheckTicketComponent from './check-ticket/checkTicket.component'
import TypeCarComponent from './type_car/typeCar.component'
import CarComponent from './car/car.component'
import SeatComponent from './seat/seat.component'
import BillComponent from './bill/bill.component'
import CheckBillComponent from './check-bill/check-bill.component'
import TypeDiscoutComponent from './typeDiscout/typeDiscout.component'
import DiscoutCodeComponent from './discount-code/discoutCode.component'
import UserAdminComponent from './user/user-admin.component';
import ParentType from './type-user/type-user.component';
import TripDetailStatisticalComponent from './trip/tripDetailStatistical'
export const adminRouter: RouteObject[] = [
  {
    path: '',
    element: (
      <div>
        <DashboardComponent />
      </div>
    ),
    children: []
  },
  {
    path: 'type-car',
    element: (
      <div>
        <TypeCarComponent />
      </div>
    ),
    children: []
  },
  // {
  //   path: 'banner',
  //   element: <BannerAdmin />,
  //   children: []
  // },
  {
    path: 'parent-location',
    element: <ParentLocaltion />,
    children: []
  },
  {
    path: 'location',
    element: <LocaltionComponent />
  },
  {
    path: 'route',
    element: <RouteComponent />,
    children: []
  },
  {
    path: 'car',
    element: (
      <div>
        <CarComponent />
      </div>
    ),
    children: []
  },
  {
    path: 'seat',
    element: (
      <div>
        <SeatComponent />
      </div>
    ),
    children: []
  },
  {
    path: 'trip',
    element: <TripComponent />,
    children: []
  },
  {
    path: 'bill',
    element: <BillComponent />,
    children: []
  },
  {
    path: 'check-ticket',
    element: <CheckTicketComponent />,
    children: []
  },
  {
    path: 'check-bill',
    element: <CheckBillComponent />,
    children: []
  },
  {
    path: 'type-discount',
    element: <TypeDiscoutComponent />,
    children: []
  },
  {
    path: 'discount-code',
    element: <DiscoutCodeComponent />,
    children: []
  },
  {
    path: 'user',
    element: <UserAdminComponent />,
    children: []
  },
  {
    path: 'type-user',
    element: <ParentType />,
    children: []
  },
  {
    path: 'trip-statistical',
    element: <TripDetailStatisticalComponent />,
    children: []
  }
]
