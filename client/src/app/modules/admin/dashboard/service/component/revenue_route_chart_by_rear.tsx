import React, { useEffect, useState } from 'react';
import { CategoryScale, Chart } from "chart.js";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import axios from 'axios';
import { Line } from 'recharts';

const RevenueRouteChartByYear = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [dataChart, setDataChart] = useState<any>();
    const [countData, setCountData] = useState<any>()
    console.log("dataCount",countData);
    
    useEffect(() => {
        // Gọi API khi selectedYear thay đổi
        getDataChart(selectedYear);
    }, [selectedYear]);

    const getDataChart = async (year: any) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/statistical/route-for-year?year=${year}`);
            if (response) {
                // Biến đổi dữ liệu
                const transformedData = Object.keys(response?.data?.data_for_char)?.map(month => ({
                    month: parseInt(month),
                    trip_count_by_month: response?.data.data_for_char[month]?.trip_count_by_month,
                    total_revenue_by_month: response?.data.data_for_char[month]?.total_revenue_by_month,
                    user_count_by_month: response?.data.data_for_char[month]?.user_count_by_month
                }));
                const dataCount = response.data

                // console.log("transformedData",transformedData);

                setDataChart(transformedData);
                setCountData(dataCount)
            } else {
                console.log("Lỗi khi lấy dữ liệu từ API");
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    }


    // Tạo biểu đồ từ dữ liệu đã nhận được từ API
    const chartDataRevenueByMonth = {
        labels: dataChart?.map((item: any) => `Tháng ${item.month}`) || [],
        datasets: [
            {
                label: 'Doanh thu',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                type: 'bar',
                yAxisID: 'y-axis-1',
                fill: true,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: dataChart?.map((item: any) => item?.total_revenue_by_month)
            },
            // {
            //     label: 'Chuyến đi',
            //     backgroundColor: 'rgba(75,192,192,0.2)',
            //     borderColor: 'rgba(75,192,192,1)',
            //     borderWidth: 1,
            //     fill: false,
            //     type: 'bar',
            //     yAxisID: 'y-axis-3',
            //     hoverBackgroundColor: 'rgba(75,192,192,0.4)',
            //     hoverBorderColor: 'rgba(75,192,192,1)',
            //     data: dataChart?.map((item: any) => item.trip_count_by_month) || []
            // }
        ]
    };
    const chartDataUserByMonth = {
        labels: dataChart?.map((item: any) => `Tháng ${item.month}`) || [],
        datasets: [
            {
                label: 'Số người dùng',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                type: 'bar',
                fill: false,
                borderWidth: 1,
                yAxisID: 'y-axis-2',
                hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
                hoverBorderColor: 'rgba(54, 162, 235, 1)',
                data: dataChart?.map((item: any) => item.user_count_by_month) || []
            },
            // {
            //     label: 'Chuyến đi',
            //     backgroundColor: 'rgba(75,192,192,0.2)',
            //     borderColor: 'rgba(75,192,192,1)',
            //     borderWidth: 1,
            //     fill: false,
            //     type: 'bar',
            //     yAxisID: 'y-axis-3',
            //     hoverBackgroundColor: 'rgba(75,192,192,0.4)',
            //     hoverBorderColor: 'rgba(75,192,192,1)',
            //     data: dataChart?.map((item: any) => item.trip_count_by_month) || []
            // }
        ]
    };
    const chartDataTripByMonth = {
        labels: dataChart?.map((item: any) => `Tháng ${item.month}`) || [],
        datasets: [
            {
                label: 'Chuyến đi',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                fill: false,
                type: 'bar',
                yAxisID: 'y-axis-3',
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: dataChart?.map((item: any) => item.trip_count_by_month) || []
            }
        ]
    };

    return (
        <div className='mt-10 w-full '>
            <h3>Chọn năm</h3>
            <select value={selectedYear} onChange={e => setSelectedYear(parseInt(e.target.value))}>
                {Array.from({ length: 10 }, (_, index) => new Date().getFullYear() - index).map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>

            <div>
                <div className=" rounded-lg bg-blue-500 text-white border text-center py-5">
                    <div className=" ">
                        <h1 className="text-[18px]">Tuyến xe trong năm {selectedYear}</h1>
                        {/* <Line data={chartDataTotalTrip} options={{ maintainAspectRatio: true }} /> */}
                        
                    </div>
                    <div>
                        <span className="text-[22px] font-bold">{countData?.count_all_route_for_year || 0}</span>
                    </div>
                </div>
                <div className=" rounded-lg bg-blue-500 text-white border text-center py-5">
                    <div className=" ">
                        <h1 className="text-[18px]">Số vé bán trong năm {selectedYear} </h1>
                    </div>
                    <div>
                        <span className="text-[22px] font-bold">{countData?.count_all_ticket_for_year || 0}</span>
                    </div>
                </div>
                <div className=" rounded-lg bg-blue-500 text-white border text-center py-5">
                    <div className=" ">
                        <h1 className="text-[18px]">Chuyến đi trong năm {selectedYear} </h1>
                    </div>
                    <div>
                        <span className="text-[22px] font-bold">{countData?.count_all_trip_for_year || 0}</span>
                    </div>
                </div>
                <div className=" rounded-lg bg-blue-500 text-white border text-center py-5">
                    <div className=" ">
                        <h1 className="text-[18px]">Doanh thu trong năm {selectedYear} </h1>
                    </div>
                    <div>
                        <span className="text-[22px] font-bold">{countData?.total_revenue_for_year?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) || 0}</span>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-2 items-center'>
                <div className='w-[500px]'>
                    <h1 className='font-mono text-xl'>Thống Doanh thu  theo tháng</h1>
                    {
                        chartDataRevenueByMonth &&
                        <Bar
                            data={chartDataRevenueByMonth}
                            options={{
                                scales: {
                                    x: { stacked: true },
                                    yAxes: [
                                        {
                                            type: 'linear',
                                            display: true,
                                            position: 'left',
                                            id: 'y-axis-1',
                                            ticks: { beginAtZero: true },
                                            gridLines: { display: false }
                                        },
                                        {
                                            type: 'linear',
                                            display: false,
                                            position: 'right',
                                            id: 'y-axis-2',
                                            ticks: { beginAtZero: true },
                                            gridLines: { display: false }
                                        },
                                        {
                                            type: 'linear',
                                            display: false,
                                            position: 'right',
                                            id: 'y-axis-3',
                                            ticks: { beginAtZero: true },
                                            gridLines: { display: false }
                                        }
                                    ]
                                }
                            }}
                        />
                    }
                </div>
                <div className='w-[500px]'>
                    <h1 className='font-mono text-xl'>Thống Người dùng  theo tháng</h1>
                    {
                        chartDataUserByMonth &&
                        <Bar
                            data={chartDataUserByMonth}
                            options={{
                                scales: {
                                    x: { stacked: true },
                                    yAxes: [
                                        {
                                            type: 'linear',
                                            display: true,
                                            position: 'left',
                                            id: 'y-axis-1',
                                            ticks: { beginAtZero: true },
                                            gridLines: { display: false }
                                        },
                                        {
                                            type: 'linear',
                                            display: false,
                                            position: 'right',
                                            id: 'y-axis-2',
                                            ticks: { beginAtZero: true },
                                            gridLines: { display: false }
                                        },
                                        {
                                            type: 'linear',
                                            display: false,
                                            position: 'right',
                                            id: 'y-axis-3',
                                            ticks: { beginAtZero: true },
                                            gridLines: { display: false }
                                        }
                                    ]
                                }
                            }}
                        />
                    }
                </div>
                <div className='w-[500px]'>
                    <h1 className='font-mono text-xl'>Thống Chuyến đi  theo tháng</h1>
                    {
                        chartDataTripByMonth &&
                        <Bar
                            data={chartDataTripByMonth}
                            options={{
                                scales: {
                                    x: { stacked: true },
                                    yAxes: [
                                        {
                                            type: 'linear',
                                            display: true,
                                            position: 'left',
                                            id: 'y-axis-1',
                                            ticks: { beginAtZero: true },
                                            gridLines: { display: false }
                                        },
                                        {
                                            type: 'linear',
                                            display: false,
                                            position: 'right',
                                            id: 'y-axis-2',
                                            ticks: { beginAtZero: true },
                                            gridLines: { display: false }
                                        },
                                        {
                                            type: 'linear',
                                            display: false,
                                            position: 'right',
                                            id: 'y-axis-3',
                                            ticks: { beginAtZero: true },
                                            gridLines: { display: false }
                                        }
                                    ]
                                }
                            }}
                        />
                    }
                </div>
            </div>
        </div>
    );

}

export default RevenueRouteChartByYear;
