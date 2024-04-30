import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
const BarChartTripComponent = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [dataChart, setDataChart] = useState<any>();
    console.log("dataChart", dataChart);

    useEffect(() => {
        // Gọi API khi selectedYear thay đổi
        getDataChart(selectedYear);
    }, [selectedYear]);

    const getDataChart = async (year: any) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/statistical/revenue-trip-year?year=${year}`);
            if (response) {
                // Biến đổi dữ liệu
                const transformedData = Object.keys(response?.data?.total_data)?.map(month => ({
                    month: parseInt(month),
                    trip_count_by_month: response?.data.total_data[month]?.trip_count_by_month,
                    total_revenue_by_month: response?.data.total_data[month]?.total_revenue_by_month,
                }));

                // console.log("transformedData",transformedData);

                setDataChart(transformedData);
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
    <div>
        <select className='border b-2' value={selectedYear} onChange={e => setSelectedYear(parseInt(e.target.value))}>
                {Array.from({ length: 10 }, (_, index) => new Date().getFullYear() - index).map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>

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
  )
}

export default BarChartTripComponent