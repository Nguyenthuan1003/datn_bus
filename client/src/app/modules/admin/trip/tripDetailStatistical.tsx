import React, { useEffect, useState } from 'react'
import { getTripStatistical } from './service/trip.service';
import TemplateTableTrip from '../common/template-table-trip/template-table-trip.component'
import { Switch, Select, Button, Progress, Flex, } from 'antd';

import { Option } from 'antd/es/mentions';
import moment, { Moment } from 'moment';
import TemplateTripStatical from '../common/template-table-trip/template-table-trip-statistical';
const TripDetailStatisticalComponent = () => {
    const [dataTrip, setDataTrip] = useState<any>();
    const [column, setColumn] = useState<any>([]);
    const [reset, setReset] = useState<any>([]);
    const [selectedOption, setSelectedOption] = useState<any>('week');
    const [showCustomDateInput, setShowCustomDateInput] = useState<any>(false);
    const todayDate = new  Date().toLocaleDateString()
    const [startDate, setStartDate] = useState<any>();
    console.log("todayDate",todayDate);

//     const dayToday = todayDate.getDate(); 
// const monthToday = todayDate.getMonth() + 1; 
// const yearToday = todayDate.getFullYear(); 
    // console.log("todayDate",todayDate.toLocaleDateString());
    
    // const startWeek = moment().subtract(7,'days').format("YYYY-MM-DD")
    // const startMonth = moment().startOf('month').format('YYYY-MM-01')
    // const showDatePicker = () =>{
    //     setShowCustomDateInput(!showCustomDateInput)
    // }
    const [endDate, setEndDate] = useState<any>();
    console.log("dataTrip", dataTrip);
    const handelGetList = () => {
        setReset(!reset)
    }
    useEffect(() => {
        const columsTemp: any = []
        const title = ['', 'Tên xe', 'Thời gian bắt đầu ', 'Địa điểm bắt đầu ', 'Trạng Thái', 'Giá chuyến đi', 'Địa điểm kết thúc ', ' ', 'Tuyến đường ', ' ']
        if (dataTrip?.length > 0) {
            Object.keys(dataTrip[0]).forEach((itemKey, key = 0) => {
                if (!['id', 'car', 'interval_trip', 'created_at', 'updated_at', 'route'].includes(itemKey)) {
                    console.log(itemKey);
                    if (itemKey === 'fillRate') {
                        columsTemp.push({
                            title: 'Fill Rate', // Tiêu đề cột fillRate
                            dataIndex: 'fillRate', // Khai báo dataIndex
                            key: 'fillRate', // Khai báo key
                            render: (text: any, record: any, index: any) => {
                                // Xử lý render của cột fillRate ở đây
                                return (
                                    <Flex vertical gap="small" style={{ width: 180 }}>
                                        <Progress percent={record.fillRate} size="small" status="active" />
                                    </Flex>
                                );
                            }
                        });
                    }else{
                        columsTemp.push({
                            title: title[key++],
                            dataIndex: itemKey,
                            key: itemKey,
                            render: (text: any, record: any, index: any) => {
                                if (itemKey === 'car_id') {
                                    return <>{record?.car?.name ? record?.car?.name : "Not Car"}</>;
                                }
                                if (itemKey === 'status') {
                                    return <Switch
                                        style={{ background: text ? 'green' : 'red' }}
                                        checked={text}
                                        checkedChildren="Đang hoạt động"
                                        unCheckedChildren="Ngừng hoạt động"
                                        disabled
                                    />
                                }
                                if (itemKey === 'route_id') {
                                    // const nameRoute = record?.route?.name                   
                                    return <h2>{record?.route?.name ? record?.route?.name : "Not route"}</h2>
                                }
                                if (itemKey == "trip_price") {
                                    return <div>{record?.trip_price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                                }
                                if (itemKey == "start_time") {
                                    const utcDateTimeString = record?.start_time;
                                    const localDateTimeString = moment.utc(utcDateTimeString).format('DD/MM/YYYY')
                                    const time = moment.utc(utcDateTimeString).format('HH:mm')
                                    return <div>{`${localDateTimeString} (${time})`}</div>
                                }
                                // if (itemKey === "fill_unbooked_rate") {
                                //     let color = '#52c41a';
                                //     if (Number(text) >= 90 && Number(text) <=  100) {
                                //         color = "#faad14";
                                //     } else if (Number(text) > 100) {
                                //         color = "#f5222d";
                                //     }
                                  
                                //     return    <Flex vertical gap="small" style={{ width: 180 }}>
                                //             <Progress percent={100} size="small" status="active" />
                                        
                                //         {/* <Text weight={500}>{(text as number) + "%"}
                                //         </Text> */}
                                //     </Flex>
                                   
                                //     // <Progress percent={Number(text)} showInfo={false} strokeColor={color} />
    
                                // }
                                return text
                            }
                        })
                    }
                
                }
            })
        }
        setColumn(columsTemp)

    }, [dataTrip])
    // Fetch data trip dari API
    // useEffect(()=>{
    //     getTripStatistical(startDate, endDate)
    //     .then((res)=>{
    //         if(res){
    //             setDataTrip(res.data.trips)
    //         }
    //     })
    // },[])
    //   useEffect(() => {
    //     // Hàm tính toán giá trị mặc định của startDate và endDate (2 tuần trước)
    //     const calculateDefaultDates = () => {
    //         const today = new Date();
    //         const twoWeeksAgo = new Date(today);
    //         twoWeeksAgo.setDate(today.getDate() - 14); // Giả sử "2 tuần trước" là 14 ngày trước
    //         const startDate = twoWeeksAgo.toISOString().split('T')[0];
    //         const endDate = today.toISOString().split('T')[0];
    //         // Gọi hàm để thực hiện API call với giá trị mặc định
    //         callApi(startDate, endDate);
    //     };

    //     calculateDefaultDates();
    // }, []);
   
    
    useEffect(() => {
        // Hàm tính toán giá trị mặc định của startDate và endDate (2 tuần trước) khi selectedOption là "2 Tuần"
        if (selectedOption === 'week') {
            const today = new Date();
            const twoWeeksAgo = new Date(today);
            twoWeeksAgo.setDate(today.getDate() - 14); // Giả sử "2 tuần trước" là 14 ngày trước
            const startDate = twoWeeksAgo.toISOString().split('T')[0];
            const endDate = today.toISOString().split('T')[0];
            // Gọi hàm để thực hiện API call với giá trị mặc định
            callApi(startDate, endDate);
        } else if (selectedOption === 'today') {
            // Nếu selectedOption là "Hôm nay", đặt startDate và endDate là ngày hiện tại
            const today = new Date();
            const formattedDate = formatDate(today);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const formattedTomorrow:any = formatDate(tomorrow);
            setStartDate(formattedDate);
            setEndDate(formattedTomorrow);
            callApi(startDate, endDate);
            console.log("formattedTomorrow",formattedTomorrow);
        } else if (selectedOption === 'month') {
            // Nếu selectedOption là "Tháng", tính toán startDate và endDate cho tháng hiện tại
            const today = new Date();
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            const formattedFirstDayOfMonth = formatDate(firstDayOfMonth);
            const formattedLastDayOfMonth = formatDate(lastDayOfMonth);
            setStartDate(formattedFirstDayOfMonth);
            setEndDate(formattedLastDayOfMonth);
            callApi(startDate, endDate);
        }
    }, [selectedOption]);
    

    const callApi = (startDate:any, endDate:any) => {
        // Gọi API với startDate và endDate
        getTripStatistical(startDate, endDate)
            .then((res) => {
                if (res) {
                    setDataTrip(res.data.trips);
                }
            });
    };
    const handleApiCall = () => {
        getTripStatistical(startDate, endDate)
            .then((res) => {
                if (res) {
                    setDataTrip(res.data.trips);
                }
            });
    };

    const handleSelectChange = (value: any) => {
        setSelectedOption(value);
        console.log(value);

        setShowCustomDateInput(value === 'Ngày tự chọn');
        if (value === 'today') {
            // Ngày hiện tại
            const today = new Date();
            const formattedDate = formatDate(today);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const formattedTomorrow = formatDate(tomorrow);
            setStartDate(formattedDate);
            setEndDate(formattedTomorrow);
            callApi(startDate, endDate);
            console.log("formattedTomorrow",formattedTomorrow);
        } else if (value === 'month') {
            // Ngày đầu tiên của tháng hiện tại
            const today = new Date();
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            const formattedFirstDayOfMonth = formatDate(firstDayOfMonth);
            const formattedLastDayOfMonth:any = formatDate(lastDayOfMonth);
            setStartDate(formattedFirstDayOfMonth);
            setEndDate(formattedLastDayOfMonth);
            callApi(startDate, endDate);
        }
    };

    const formatDate = (date:any) => {
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
            month = '0' + month;
        }

        if (day < 10) {
            day = '0' + day;
        }

        return `${year}-${month}-${day}`;
    };

    
    const handleStartDateChange = (e:any) => {
        console.log(e.target.value);

        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e:any) => {
        setEndDate(e.target.value);
    };
    return (
        <div>
            <div className='flex mb-4 mt-4'>

                <div className='px-3'>
                    <Select className='w-[100px]' placeholder="-- Ngày cố định  --" value={selectedOption} onChange={handleSelectChange}>
                        <Option value='all'>Tất cả</Option>
                        <Option value='today'>Hôm nay</Option>
                        <Option value='week'>2 Tuần</Option>
                        <Option value='month'>Tháng</Option>

                    </Select>
                </div>
                <div className='px-3' style={{ display: showCustomDateInput ? 'none' : 'block' }}>
                    <Button onClick={() => setShowCustomDateInput(true)}>Ngày tự chọn</Button>
                </div>
                <div className='flex'>
                    <div  style={{ display: showCustomDateInput ? 'block' : 'none' }} >
                        <label className='' htmlFor="">Từ ngày</label>
                        <input className='pl-2' type="date" value={startDate} onChange={handleStartDateChange}/>
                    </div>
                    <span style={{ display: showCustomDateInput ? 'block' : 'none' }}>=</span>
                    <div style={{ display: showCustomDateInput ? 'block' : 'none' }}>
                        <label htmlFor="">Đến ngày </label>
                        <input  className='pl-2' type="date" value={endDate} onChange={handleEndDateChange}  />
                    </div>

                    <Button onClick={handleApiCall} style={{ display: showCustomDateInput ? 'block' : 'none' }}>Tìm</Button>
                    <Button onClick={() => setShowCustomDateInput(false)} style={{ display: showCustomDateInput ? 'block' : 'none' }}>Hủy</Button>

                </div>
                <div className='px-3'>
                    <Select placeholder="-- Chọn tuyến đường --">
                        <Option value="1" />
                    </Select>
                </div>
                <div className='px-3'>
                    <Select placeholder="-- Chọn điểm đi --">
                        <Option value="1" />
                    </Select>
                </div>

                <div className='px-3'>
                    <Select placeholder="-- Chọn điểm đến --">
                        <Option value="1" />
                    </Select>
                </div>
            </div>
            <TemplateTripStatical
                title={`Danh sách chuyến đi `}
                callBack={handelGetList}
                dataTable={dataTrip}
                columnTable={column}


            />
        </div >
    )
}

export default TripDetailStatisticalComponent