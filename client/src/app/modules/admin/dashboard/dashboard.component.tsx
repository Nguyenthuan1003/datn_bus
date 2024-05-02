import React, { useEffect, useState } from 'react'
import { getDataHome, getSatisticalRoute, getStatisticalGeneral, getTrip } from './service/statistical-service'
import { Bar, BarChart } from 'recharts'
import TopcarComponent from './service/component/topcar'
import TopRouteComponent from './service/component/TopRoute.component'
import RevenueRouteChartByYear from './service/component/revenue_route_chart_by_rear'
import BarChartTripComponent from './service/component/BarChartTrip'
import { Link } from 'react-router-dom'
import { BounceLoader } from 'react-spinners'
import ChartSatisticDataHome from './service/component/chartSatisticDataHome'

const DashboardComponent = () => {
  const [data , setData] = useState<any>()
  const [totalTrip , setTotalTrip] = useState<any>()
  const [dataRoute, setDataRoute] = useState<any>()
  const [loading, setLoading] = useState(true);
  const [dataHome , setDataHome] = useState<any>()
  // Fetch data from API here.

  const todayMonth = new Date().getMonth() + 1;
  useEffect(()=>{
    // Promise.all([getStatisticalGeneral(), getTrip()])
    getDataHome()
    .then((res: any) => {
      setDataHome(res.data)
    })
    getStatisticalGeneral()
    .then((res:any) => {
      if (res.data.status === "success") {
        setData(res.data)
        setLoading(false);
      } else {
        console.log('Error : ', res.data.message)
      }
    getSatisticalRoute()
    .then((res: any)=>{
      if(res.data.status === "success"){
        setDataRoute(res.data)
        setLoading(false);
      }else {
        console.log('Error : ', res.data.message)
      }
    })
  })
  getTrip().then((trip: any) => {
    setTotalTrip(trip?.data?.all_trips.length)
    setLoading(false);
  })
},[])

  
 const dataCarTop10 = data?.top_10_Car
 const dataRouteTop10= dataRoute?.top_10_routes
  const dataChartHome = dataHome?.total_statistical_current_year
  return (
    <>
    {loading ? (
        <BounceLoader
        color="#36d7b7"
        style={{position: "absolute", top: "50%", left: "54%"}}
        />
    ) : (
    <div className=''>
        <div>
        <h1 className=" font-bold text-2xl">Thống kê</h1>
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-8">
        <div className="rounded-lg bg-blue-900 text-white border text-center py-10 shadow-xl">
          <div className=" ">
            <h1 className="text-[22px]">Số chuyến đi   </h1>
          </div>
          <div>
            <span className="text-[22px] font-bold">{dataHome?.trip_count_current_month || 0}</span>
             <br />
            <span>Tổng số chuyến trong tháng   </span>
          </div>
        </div>
        <div className=" rounded-lg bg-yellow-900 text-white border text-center py-10  shadow-xl">
          <div className=" ">
            <h1 className="text-[22px]">Số người dùng </h1>
          </div>
          <div>
            <span className="text-[22px] font-bold">{dataHome?.user_count_current_month ||0}</span>
            <br />
            <span>Tổng số người dùng trong tháng</span>
          </div>
        </div>
        <div className=" rounded-lg bg-[#00d27a] text-white border text-center py-10  shadow-xl">
          <div className=" ">
            <h1 className="text-[22px]">Doanh thu </h1>
          </div>
          <div>
            <span className="text-[22px] font-bold">{dataHome?.total_revenue_current_month.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) || 0}</span>
            <br />
            <span>Tổng số người dùng trong tháng</span>
          </div>
        </div>      
      </div>

      <div className="mt-2">
        <div className="font-bold text-2xl">Thống kê năm</div>
        <div className='flex justify-center'>
        <div className=" w-[230px] text-black  px-3 py-3">
          <div>
            <div className='rounded-lg bg-blue-400 text-black border  text-center py-10 shadow-xl'>
              <h1 className='font-semibold'>Chuyến đi :<span >{dataHome?.trip_count_current_year || 0}</span> </h1>
              <span>chuyến xe trong năm</span>
            </div>
     
          </div>
        </div>
        <div className=" w-[230px] text-black  px-3 py-3">
          <div>
            <div className='rounded-lg bg-blue-400 text-black border  text-center py-10 shadow-xl'>
              <h1 className='font-semibold'>Người dùng :<span >{dataHome?.user_count_current_year || 0}</span> </h1>
              <span>chuyến xe trong năm</span>
            </div>
     
          </div>
        </div>
        <div className=" w-[230px] text-black  px-3 py-3">
          <div>
            <div className='rounded-lg bg-blue-400 text-black border  text-center py-10 shadow-xl'>
              <h1 className='font-semibold'>Doanh thu :<span >{dataHome?.total_revenue_current_year.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) || 0}</span> </h1>
              <span>chuyến xe trong năm</span>
            </div>
     
          </div>
        </div>
        </div>
        <ChartSatisticDataHome />
      </div>


      <div className="mt-20">
        <div className="font-bold text-2xl">Thống kê xe </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-5 lg:gap-8">
        <div className=" rounded-full  bg-slate-500 text-white border text-center shadow-xl py-10">
          <div className=" ">
            <h1 className="text-[22px]">Loại xe  </h1>
          </div>
          <div>
            <span className="text-[22px] font-bold">{data?.total_car_type || 0}</span>
             <br />
            <span></span>
          </div>
        </div>
        <div className=" rounded-full bg-slate-500 text-white border text-center  shadow-xl py-10">
          <div className=" ">
            <h1 className="text-[22px]">Tổng số xe  </h1>
          </div>
          <div>
            <span className="text-[22px] font-bold">{data?.total_car ||0}</span>
            <br />

          </div>
        </div>
        <div className=" rounded-full bg-slate-500 text-white border text-center  shadow-xl py-10">
          <div className=" ">
            <h1 className="text-[22px]">Địa điểm</h1>
          </div>
          <div>
            <span className="text-[22px] font-bold">{data?.total_location || 0}</span>
            <br />
            <span></span>
          </div>
        </div>
        <div className=" rounded-full  bg-slate-500 text-white border text-center  shadow-xl py-10">
          <div className=" ">
            <h1 className="text-[22px]">Tuyến đường</h1>
          </div>
          <div>
            <span className="text-[22px] font-bold">{data?.total_route || 0}</span>
            <br />
            <span></span>
          </div>
        </div>
        <div className=" rounded-full  bg-slate-500 text-white border text-center  shadow-xl py-10">
          <div className=" ">
            <h1 className="text-[22px]">Chuyến đi</h1>
          </div>
          <div>
            <span className="text-[22px] font-bold">{data?.total_trip || 0}</span>
            <br />
            <span></span>
          </div>
        </div>
      
      </div>
        <TopcarComponent datacar={dataCarTop10} />
      </div>
      <div className="mt-20">
        <div className="font-bold text-2xl">Thống kê tuyến đường</div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-8">
        <div className=" rounded-r-full  bg-cyan-500 text-white border text-center shadow-xl py-10">
          <div className=" ">
            <h1 className="text-[22px]">Tuyến đường </h1>
          </div>
          <div>
            <span className="text-[22px] font-bold">{dataRoute?.count_all_route || 0}</span>
             <br />
            <span></span>
          </div>
        </div>
        <div className=" rounded-full bg-cyan-500 text-white border text-center  shadow-xl py-10">
          <div className=" ">
            <h1 className="text-[22px]">Doanh thu</h1>
          </div>
          <div>
            <span className="text-[22px] font-bold">{dataRoute?.total_revenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) ||0}</span>
            <br />

          </div>
        </div>
        <div className=" rounded-l-full bg-cyan-500 text-white border text-center  shadow-xl py-10">
          <div className=" ">
            <h1 className="text-[22px]">Doanh thu</h1>
          </div>
          <div>
            <span className="text-[22px] font-bold">{dataRoute?.count_all_trip ||0}</span>
            <br />

          </div>
        </div>
      
      </div>

        
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
    )}
    </>
  )
}

export default DashboardComponent