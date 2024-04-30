import React, { useEffect, useState } from 'react'
import { getSatisticalRoute, getStatisticalGeneral, getTrip } from './service/statistical-service'
import { Bar, BarChart } from 'recharts'
import TopcarComponent from './service/component/topcar'
import TopRouteComponent from './service/component/TopRoute.component'
import RevenueRouteChartByYear from './service/component/revenue_route_chart_by_rear'
import PieChartCar from './service/component/PieChartCar'
import BarChartTripComponent from './service/component/BarChartTrip'
import { Link } from 'react-router-dom'

const DashboardComponent = () => {
  const [data , setData] = useState<any>()
  const [totalTrip , setTotalTrip] = useState<any>()
  const [dataRoute, setDataRoute] = useState<any>()
  // Fetch data from API here.
  useEffect(()=>{
    getStatisticalGeneral()
    .then((res:any) => {
      if (res.data.status === "success") {
        setData(res.data)
      } else {
        console.log('Error : ', res.data.message)
      }
    getSatisticalRoute()
    .then((res: any)=>{
      if(res.data.status === "success"){
        setDataRoute(res.data)
      }else {
        console.log('Error : ', res.data.message)
      }
    })
  })
  getTrip().then((trip: any) => {
    setTotalTrip(trip?.data?.all_trips.length)
  })
},[])

  
 const dataCarTop10 = data?.top_10_Car
 const dataRouteTop10= dataRoute?.top_10_routes

  return (
    <div>
        <div>
        <h1 className="text-[30px] mb-4">Trang quản trị</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
        <div className=" rounded-lg bg-blue-900 text-white border text-center py-10">
          <div className=" ">
            <h1 className="text-[22px]">Tổng  chuyến đi </h1>
          </div>
          <div>
            <span className="text-[22px] font-bold">{totalTrip || 0}</span>
          </div>
          <span><Link to={`trip-statistical`} >View Details</Link></span>
        </div>
        <div className=" rounded-lg bg-yellow-900 text-white border text-center py-10">
          <div className=" ">
            <h1 className="text-[22px]">Tổng xe</h1>
          </div>
          <div>
            <span className="text-[22px] font-bold">{data?.total_car ||0}</span>
          </div>
        </div>
        <div className=" rounded-lg bg-[#00d27a] text-white border text-center py-10">
          <div className=" ">
            <h1 className="text-[22px]">Tuyến Đường</h1>
          </div>
          <div>
            <span className="text-[22px] font-bold">{data?.total_location || 0}</span>
          </div>
        </div>
        <div className=" rounded-lg bg-red-800 text-white border text-center py-10">
          <div className=" ">
            <h1 className="text-[22px]">Tổng sản phẩm</h1>
          </div>
          <div>
            <span className="text-[22px] font-bold">{ 0}</span>
          </div>
        </div>
      
      </div>
      <div className="mt-20">
        <div className="font-bold text-2xl">Top xe chạy</div>
        
        <TopcarComponent datacar={dataCarTop10} />

        <PieChartCar />
      </div>
      <div className="mt-20">
        <div className="font-bold text-2xl">Top Tuyến đường</div>
        <TopRouteComponent dataRouteTop10={dataRouteTop10} />
        <div className="mt-10">
        <RevenueRouteChartByYear />
      </div>
      </div>
      <div className="mt-20">
        <div className="font-bold text-2xl">Thống kê chuyến đi</div>
        <BarChartTripComponent />
        <div className="mt-10">

      </div>
      </div>

      
   </div>
  )
}

export default DashboardComponent