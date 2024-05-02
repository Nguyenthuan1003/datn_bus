import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import axios from 'axios';
export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '',
      },
    },
  };
const ChartSatisticDataHome = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );

    const [dataChart, setDataChart] = useState<any>();
    // const [countData, setCountData] = useState<any>()

    console.log("dataChart",dataChart);
    
    useEffect(() => {
        // Gọi API khi selectedYear thay đổi
        getDataChart();
    }, []);

    const getDataChart = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/statistical/home`);
            if (response) {
                // Biến đổi dữ liệu
                const transformedData = Object.keys(response?.data?.total_statistical_current_year)?.map(month => ({
                    month: parseInt(month),
                    trip_count_by_month: response?.data?.total_statistical_current_year[month]?.trip_count_by_month,
                    total_revenue_by_month: response?.data?.total_statistical_current_year[month]?.total_revenue_by_month,
                    user_count_by_month: response?.data?.total_statistical_current_year[month]?.user_count_by_month
                }));
        

                // console.log("transformedData",transformedData);

                setDataChart(transformedData);
                // setCountData(dataCount)
            } else {
                console.log("Lỗi khi lấy dữ liệu từ API");
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    }

    const chartDataRevenueByMonth = {
        labels: dataChart?.map((item: any) => `Tháng ${item.month}`) || [],
        datasets: [
            {
                label: 'Doanh thu',
                data: dataChart?.map((item: any) => item?.total_revenue_by_month),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                // type: "line" 
            },
            {
                label: 'Chuyến đi',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                data: dataChart?.map((item: any) => item.trip_count_by_month) || [],
            },
            {
                label: 'người dùng',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                data: dataChart?.map((item: any) => item.user_count_by_month) || []
            }
        ]
    };
  return (
    <div>
         <div className='items-center'>
                <div className='w-[full]'>
                        <Bar
                            data={chartDataRevenueByMonth}
                            options={options}
                        />
          
                </div>
           
            </div>
    </div>
  )
}

export default ChartSatisticDataHome