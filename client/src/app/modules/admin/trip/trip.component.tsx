import React, { Fragment, useEffect, useState } from 'react'
import TemplateTableTrip from '../common/template-table-trip/template-table-trip.component'
import { getAllTrip, addTrip, deleteTrip, updateTrip, getCarTrip, getRouteTrip, getLocationForRoute, getTripStatistical, } from './service/trip.service'
import { Button, Flex, Form, Input, Progress, Segmented, Select, Spin, Switch, Skeleton, message } from 'antd';
import { Option } from 'antd/es/mentions';
import moment, { Moment } from 'moment';
import dayjs from 'dayjs';
import { BounceLoader } from 'react-spinners'

const TripComponent = () => {
    const [column, setColumn] = useState<any>([]);
    const [dataDetail, setDataDetail] = useState<any>([])
    const [dataTrip, setDataTrip] = useState<any>([]);
    const [dataCarTrip, setDataCarTrip] = useState<any>([]);
    const [dataRouteTrip, setDataRouteTrip] = useState<any>([]);
    const [selectedRouteId, setSelectedRouteId] = useState<any>({});
    const [current, setCurrent] = useState<any>(null);
    const [checked, setChecked] = useState<any>(0);
    // const [checkStatus, setCheckStatus] = useState<any>("not_started_trips")
    const [buttonAdd, setButtonAdd] = useState<any>(false)
    const [reset, setReset] = useState<any>([]);
    const [startLocations, setStartLocations] = useState<any>({});
    const [endLocations, setEndLocations] = useState<any>({});
    const [showCustomDateInput, setShowCustomDateInput] = useState(false);
    const [selectedOptionType, setSelectedOptionType] = useState('fixed'); // Giá trị mặc định cho loại select là 'Ngày dựng sẵn'
    const [selectedOption, setSelectedOption] = useState('weekFa2');
    const [startTimeDate, setStartTimeDate] = useState<any>()
    const [endTimeDate, setEndTimeDate] = useState<any>()
    const [tabValue, setTabValue] = useState('notStarted');
    const [isLoading, setIsLoading] = useState(false);
    const [isTabChanging, setIsTabChanging] = useState(false);
    const [showAction, setShowAction] = useState(false)


    useEffect(() => {
        if (showCustomDateInput && !startTimeDate) {
            setStartTimeDate(moment().subtract(1, "days").format())
        } else if (!showCustomDateInput && startTimeDate) {
            setShowCustomDateInput(true)
        }
    }, [showCustomDateInput]);
    useEffect(() => {
        getLocationForRoute(selectedRouteId).then((res) => {
            if (res) {
                setStartLocations(res.data?.start_locations);
            }
            if (res) {
                setEndLocations(res.data?.end_locations);
            }
            getRouteTrip().then((res) => {
                if (res) {
                    setDataRouteTrip(res?.data?.routes)

                }
            })
        });
    }, [selectedRouteId]);

    const handleRouteChange = (routeId: any) => {
        setSelectedRouteId(routeId);
    };
    useEffect(() => {
        getCarTrip().then((res) => {
            if (res) {
                setDataCarTrip(res?.data?.cars)
            }
            if (!res) {
                alert(`Lỗi khi đấy data getCarRouteTrip :((`)
            }
        })
    }, [])


    useEffect(() => {
        const columsTemp: any = []
        const title = ['', 'Tên xe', 'Thời gian bắt đầu ', 'Địa điểm bắt đầu ', 'Trạng Thái', 'Giá chuyến đi', 'Địa điểm kết thúc ', ' ', 'Tuyến đường ', ' ']
        const compareStartTime = (a: any, b: any) => {
            const timeA: any = moment(a.start_time);
            const timeB: any = moment(b.start_time);
            return timeA - timeB;
        };
        if (dataTrip?.length > 0) {
            Object.keys(dataTrip[0]).forEach((itemKey, key = 0) => {
                if (!['id', 'car', 'interval_trip', 'created_at', 'updated_at', 'route', 'seat_count_booked', 'seat_count_pending', 'seat_count_unbooked', 'fill_pending_rate', "fill_rate", 'fill_unbooked_rate', "total_seat"].includes(itemKey)) {
                    if (itemKey === 'start_time') {
                        columsTemp.push({
                            title: 'Thời gian bắt đầu',
                            dataIndex: 'start_time',
                            key: 'start_time',
                            sorter: compareStartTime, // Sử dụng hàm so sánh thời gian bắt đầu
                            render: (text: any, record: any) => {
                                const utcDateTimeString = record.start_time;
                                const localDateTimeString = moment.utc(utcDateTimeString).format('DD/MM/YYYY');
                                const time = moment.utc(utcDateTimeString).format('HH:mm');
                                return <div>{`${localDateTimeString} (${time})`}</div>;
                            }
                        });
                    } else {
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
                                return text
                            }
                        })
                    }

                }
            })
        }
        setColumn(columsTemp)

    }, [dataTrip])
    useEffect(() => {
        const today = new Date();
        // Chuyển đổi startDate thành định dạng mong muốn (thời điểm hiện tại)
        const startDateTimeVN = moment(today).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");
        // Chuyển đổi endDate thành định dạng mong muốn (7 ngày sau, giờ là 23:59:59)
        const endDateTimeVN = moment(today).tz("Asia/Ho_Chi_Minh").add(14, 'days').endOf('day').format("YYYY-MM-DD HH:mm:ss");
        // Gọi hàm để thực hiện API call với giá trị đã chuyển đổi
        callApi(startDateTimeVN, endDateTimeVN);
    }, [reset])
    const handelGetList = () => {
        setReset(!reset)
    }

    const fomatCustomCurrent = (data: any) => {
        setCurrent(data)
    }
    const handleChange = (value: any) => {
        setCurrent(value);
        setChecked(value);

    };

    const acctive = 1;
    const inAcctive = 0
    // const handelStatusTrip = (value: any) => {
    //     setCheckStatus(value)
    // }
    const callApi = (startTimeDate: any, endTimeDate: any) => {
        // Gọi API với startTime và endTime
        getTripStatistical(startTimeDate, endTimeDate)
            .then((res) => {
              try {
                if (res) {
                    setDataTrip(res?.data?.trips?.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
                }
              } catch (error) {
                message.error("Lỗi lấy data")
              }

            });
    };
    useEffect(() => {
        // Hàm tính toán giá trị mặc định của startDate và endTimeDate (2 tuần trước) khi selectedOption là "2 Tuần"
        if (selectedOption === 'weekBe2') {
            const today = new Date();
            // Chuyển đổi endDate thành định dạng mong muốn (thời gian hiện tại)
            const endDateTimeVN = moment(today).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");

            // Chuyển đổi startDate thành định dạng mong muốn (14 ngày trước, giờ là 23:00:00)
            const startDateTimeVN = moment(today).tz("Asia/Ho_Chi_Minh").subtract(14, 'days').startOf('day').add(0, 'hours').format("YYYY-MM-DD HH:mm:ss");
            // Gọi hàm để thực hiện API call với giá trị đã chuyển đổi
            callApi(startDateTimeVN, endDateTimeVN);

        } else if (selectedOption === 'weekBe1') {
            const today = new Date();
            // Chuyển đổi endDate thành định dạng mong muốn (thời gian hiện tại)
            const endDateTimeVN = moment(today).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");

            // Chuyển đổi startDate thành định dạng mong muốn (14 ngày trước, giờ là 23:00:00)
            const startDateTimeVN = moment(today).tz("Asia/Ho_Chi_Minh").subtract(7, 'days').startOf('day').add(0, 'hours').format("YYYY-MM-DD HH:mm:ss");
            // Gọi hàm để thực hiện API call với giá trị đã chuyển đổi
            callApi(startDateTimeVN, endDateTimeVN);
        } else if (selectedOption === 'todayReady') {
            // Nếu selectedOption là "Hôm nay", đặt startDate và endTimeDate là ngày hiện tại
            const today = new Date();
            today.setHours(0, 0, 0, 0);
       
            const formattedDate = formatDate(today);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate());
            const formattedTomorrow: any = formatDate(tomorrow);
            setStartTimeDate(formattedDate);
            setEndTimeDate(formattedTomorrow);  
            callApi(formattedDate, formattedTomorrow);

        } else if(selectedOption === 'todayNot'){
            console.log('todayNot');
            const today = new Date();
            const formattedDate = formatDate(today);
            
            const tomorrow = new Date();
            tomorrow.setHours(23, 59, 0, 0);
            tomorrow.setDate(tomorrow.getDate()); // Thiết lập ngày là ngày mai
            
            const formattedTomorrow = formatDate(tomorrow); // Định dạng giá trị ngày mai
            
            setStartTimeDate(formattedDate);
            setEndTimeDate(formattedTomorrow);
            callApi(formattedDate, formattedTomorrow);
        }
        else if (selectedOption === 'monthFa') {
            const today = new Date();
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            // Đặt giờ, phút và giây của ngày cuối tháng thành 23:59:00
            firstDayOfMonth.setHours(23);
            firstDayOfMonth.setMinutes(59);
            firstDayOfMonth.setSeconds(0);
            // Chuyển đổi giá trị ngày thành chuỗi định dạng mong muốn
            const formattedFirstDayOfMonth = moment(firstDayOfMonth)
                .set({ hour: moment().hours(), minute: moment().minutes(), second: moment().seconds() })
                .format("YYYY-MM-DD HH:mm:ss");
            const formattedLastDayOfMonth = moment(lastDayOfMonth).format("YYYY-MM-DD HH:mm:ss");

            // Đặt giá trị start time và end time cho state
            setStartTimeDate(formattedFirstDayOfMonth);
            setEndTimeDate(moment(today).format("YYYY-MM-DD HH:mm:ss"));
            // Gọi hàm để thực hiện API call với giá trị đã chuyển đổi
            callApi(formattedFirstDayOfMonth, formattedLastDayOfMonth);
        } else if (selectedOption === 'weekFa1') {
            const today = new Date();
            // Chuyển đổi startDate thành định dạng mong muốn (thời điểm hiện tại)
            const startDateTimeVN = moment(today).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");
            // Chuyển đổi endDate thành định dạng mong muốn (7 ngày sau, giờ là 23:59:59)
            const endDateTimeVN = moment(today).tz("Asia/Ho_Chi_Minh").add(7, 'days').endOf('day').format("YYYY-MM-DD HH:mm:ss");
            // Gọi hàm để thực hiện API call với giá trị đã chuyển đổi
            callApi(startDateTimeVN, endDateTimeVN);
        } else if (selectedOption === 'weekFa2') {
            const today = new Date();
            // Chuyển đổi startDate thành định dạng mong muốn (thời điểm hiện tại)
            const startDateTimeVN = moment(today).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");
            // Chuyển đổi endDate thành định dạng mong muốn (7 ngày sau, giờ là 23:59:59)
            const endDateTimeVN = moment(today).tz("Asia/Ho_Chi_Minh").add(14, 'days').endOf('day').format("YYYY-MM-DD HH:mm:ss");
            // Gọi hàm để thực hiện API call với giá trị đã chuyển đổi
            callApi(startDateTimeVN, endDateTimeVN);
        } else if (selectedOption === 'monthBe') {
            const today = new Date();
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1); // Lấy ngày đầu tiên của tháng trước đó
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 0); // Lấy ngày cuối cùng của tháng hiện tại

            // Đặt giờ, phút và giây của ngày đầu tháng thành 00:00:00
            firstDayOfMonth.setHours(0);
            firstDayOfMonth.setMinutes(0);
            firstDayOfMonth.setSeconds(0);

            // Chuyển đổi giá trị ngày thành chuỗi định dạng mong muốn
            const formattedFirstDayOfMonth = moment(firstDayOfMonth).format("YYYY-MM-DD HH:mm:ss");
            const formattedLastDayOfMonth = moment(today).format("YYYY-MM-DD HH:mm:ss"); // Sử dụng thời gian hiện tại

            // Đặt giá trị start time và end time cho state
            setStartTimeDate(formattedFirstDayOfMonth);
            setEndTimeDate(formattedLastDayOfMonth);

            // Gọi hàm để thực hiện API call với giá trị đã chuyển đổi
            callApi(formattedFirstDayOfMonth, formattedLastDayOfMonth);
        }


    }, [selectedOption]);

    const formatDate = (dateTime: any) => {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
    // const [startTime, setStartTime] = useState<string>('');
    const handleSelectTypeChange = (value: any) => {
        setSelectedOptionType(value);
    };

    const handleSelectChange = (value: any) => {
        setSelectedOption(value)
        if (value === 'todayReady') {
            // Ngày hiện tại
            const today = new Date();
            // const formattedDate = formatDate(today);
            const dateToday00 = moment(today).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD 00:00:00")
            const dateToday23 = moment(today).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD 23:59:00")

            // const tomorrow = new Date();
            // tomorrow.setDate(tomorrow.getDate() + 1);
            // const formattedTomorrow = formatDate(tomorrow);
            // console.log({dateToday00,formattedTomorrow});

            setStartTimeDate(dateToday00);
            setEndTimeDate(dateToday23);
            callApi(startTimeDate, endTimeDate);
        } else if (value === 'month') {
            // Ngày đầu tiên của tháng hiện tại
            const today = new Date();
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            const formattedFirstDayOfMonth = formatDate(firstDayOfMonth);
            const formattedLastDayOfMonth: any = formatDate(lastDayOfMonth);
            setStartTimeDate(formattedFirstDayOfMonth);
            setEndTimeDate(formattedLastDayOfMonth);
            callApi(startTimeDate, endTimeDate);
        }
    };
    const handleCancelSearchDate = () => {
        setSelectedOptionType('fixed'); // Chuyển đổi lại sang select 'Ngày dựng sẵn' khi nhấn nút "Hủy"
    };
    const handleStartDateChange = (e: any) => {
        setStartTimeDate(e.target.value);
    };

    const handleEndDateChange = (e: any) => {
        setEndTimeDate(e.target.value);
    };
    const handleApiCall = () => {
        const formattedStartTime = moment(startTimeDate).format("YYYY-MM-DD HH:mm:ss");
        const formattedEndTime = moment(endTimeDate).format("YYYY-MM-DD HH:mm:ss");
        // Lấy thời gian hiện tại
        const currentTime = moment();
        // Kiểm tra nếu startTimeDate là quá khứ, set giờ là 23:59:00
        if (moment(startTimeDate).isBefore(currentTime)) {
            const newStartTimeDate = new Date(startTimeDate);
            newStartTimeDate.setHours(23);
            newStartTimeDate.setMinutes(59);
            newStartTimeDate.setSeconds(0);
            setStartTimeDate(newStartTimeDate);
        }
        // Kiểm tra nếu endTimeDate là tương lai, set giờ là 23:59:59
        if (moment(endTimeDate).isAfter(currentTime)) {
            const newEndTimeDate = new Date(endTimeDate);
            newEndTimeDate.setHours(23);
            newEndTimeDate.setMinutes(59);
            newEndTimeDate.setSeconds(59);
            setEndTimeDate(newEndTimeDate);
        }
        getTripStatistical(formattedStartTime, formattedEndTime)
            .then((res) => {
                try {
                    if (res) {
                        setDataTrip(res?.data?.trips);
                    }
                } catch (error) {
                    message.error("Lỗi lấy dữ liệu")
                }
            });
    };
    // const handleTabChange = (value) => {
    //     setTabValue(value);
    //     // Gọi API dựa trên giá trị của tab đã chọn
    //     if (value === 'notStarted') {

    //     } else if (value === 'started') {

    //     }
    // };
    const handleTabChange = (newValue: any) => {
        setIsTabChanging(true); // Bắt đầu hiệu ứng chuyển đổi tab
        setIsLoading(true); // Bắt đầu hiển thị loading khi chuyển tab
        setTabValue(newValue);
    };
    // const callApiForNotStartedTrips = () => {
    //     // Gọi API cho chuyến xe chưa đi
    //     // Lấy thời gian hiện tại
    //     const currentTime = moment();

    //     // Chuyển đổi thời gian hiện tại sang định dạng phù hợp để so sánh
    //     const formattedCurrentTime = currentTime.format("YYYY-MM-DD HH:mm:ss");

    //     // Chuyển đổi thời gian của start_timeDate sang định dạng phù hợp
    //     const formattedStartTime = moment(startTimeDate).format("YYYY-MM-DD HH:mm:ss");


    //     // Kiểm tra nếu start_time là quá khứ thì gọi API để lấy dữ liệu cho các chuyến chưa đi
    //     if (moment(formattedStartTime).isAfter(formattedCurrentTime)) {
    //         getTripStatistical(startTimeDate, endTimeDate)
    //             .then((res) => {
    //                 if (res.data.trips) {
    //                     setDataTrip(res.data.trips);

    //                 }
    //             })
    //             .catch((error) => {
    //                 console.error("Error fetching not started trips:", error);
    //             });
    //     } else {
    //         // Nếu start_time là tương lai, bạn có thể thực hiện các xử lý khác ở đây
    //         console.log("Start time is in the future.");
    //     }
    // }
    useEffect(() => {
        // Gọi hàm load dữ liệu khi component được render và mỗi khi selectedTab thay đổi
        loadData();
        setIsLoading(true)
        setTimeout(function () {
            setIsLoading(false)
        }, 2000)
    }, [tabValue]);
    const loadData = () => {
        if (tabValue === "notStarted") {
            setButtonAdd(true)
            setShowAction(true)
            setSelectedOption("weekFa2")
            const today = new Date();
            // Chuyển đổi startDate thành định dạng mong muốn (thời điểm hiện tại)
            const startDateTimeVN = moment(today).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");
            // Chuyển đổi endDate thành định dạng mong muốn (7 ngày sau, giờ là 23:59:59)
            const endDateTimeVN = moment(today).tz("Asia/Ho_Chi_Minh").add(14, 'days').endOf('day').format("YYYY-MM-DD HH:mm:ss");
            // Gọi hàm để thực hiện API call với giá trị đã chuyển đổi
            // callApi(startDateTimeVN, endDateTimeVN);
        } else {
            setSelectedOption("weekBe2")
            setButtonAdd(false)
            setShowAction(false)
            const today = new Date();
            // Chuyển đổi endDate thành định dạng mong muốn (thời gian hiện tại)
            const endDateTimeVN = moment(today).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");
            // Chuyển đổi startDate thành định dạng mong muốn (14 ngày trước, giờ là 23:00:00)
            const startDateTimeVN = moment(today).tz("Asia/Ho_Chi_Minh").subtract(14, 'days').startOf('day').add(0, 'hours').format("YYYY-MM-DD HH:mm:ss");
            // Gọi hàm để thực hiện API call với giá trị đã chuyển đổi
            callApi(startDateTimeVN, endDateTimeVN);
        }

    };
    function getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        let day = currentDate.getDate();

        // Thêm số 0 vào trước tháng và ngày nếu cần
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }

        return `${year}-${month}-${day}`;
    }
    return (
        <>
            <Segmented
                options={[
                    { value: 'notStarted', label: 'Chuyến xe chưa đi' },
                    { value: 'started', label: 'Chuyến xe đã đi' },
                ]}
                size='large'
                value={tabValue}
                onChange={handleTabChange}
                style={{ backgroundColor: tabValue === 'notStarted' ? 'green' : 'gray', color: 'white' }}
            // value={checkStatus}
            />
            <div className='mt-5 mb-5'>
                <Select className='w-[150px]' placeholder="-- Loại ngày cố định --" value={selectedOptionType} onChange={handleSelectTypeChange}>
                    <Option value='fixed'>Ngày dựng sẵn</Option>
                    <Option value='custom'>Ngày tự chọn</Option>
                </Select>

                {selectedOptionType === 'fixed' ? (
                    // Nếu loại select là 'Ngày dựng sẵn', hiển thị select các ngày cố định
                    tabValue === 'notStarted' ? (
                        <Select className='w-[150px]' placeholder="-- Ngày cố định --" value={selectedOption} onChange={handleSelectChange}>
                            <Option value='todayNot'>Hôm nay</Option>
                            <Option value='weekFa1'>1 Tuần tới</Option>
                            <Option value='weekFa2'>2 Tuần tới </Option>
                            <Option value='monthFa'>30 ngày tới</Option>
                        </Select>
                    ) : (
                        <Select className='w-[150px]' placeholder="-- Ngày cố định - -" value={selectedOption} onChange={handleSelectChange}>
                            <Option value='todayReady'>Hôm nay</Option>
                            <Option value='weekBe1'>1 Tuần trước</Option>
                            <Option value='weekBe2'>2 Tuần trước </Option>
                            <Option value='monthBe'>30 ngày trước</Option>

                        </Select>
                    )

                ) : (
                    tabValue === 'notStarted' ? (
                        <div className='flex mt-3 mb-3'>
                            <div className='w-56 mr-4 '>
                                <label className='' htmlFor="">Từ ngày</label>
                                <input className='pl-2' type="date" value={startTimeDate} onChange={handleStartDateChange} min={getCurrentDate()} />
                            </div>
                            <span >{`=>`}</span>
                            <div className='w-56 mr-4'>
                                <label htmlFor="">Đến ngày </label>
                                <input className='pl-2' type="date" value={endTimeDate} onChange={handleEndDateChange} min={getCurrentDate()} />
                            </div>
                            <Button onClick={handleApiCall}>Tìm</Button>
                            <Button onClick={handleCancelSearchDate}>Hủy</Button>
                        </div>
                    ) : (
                        <div className='flex mt-3 mb-3'>
                            <div className='w-56 mr-4 '>
                                <label className='' htmlFor="">Từ ngày</label>
                                <input className='pl-2' type="date" value={startTimeDate} onChange={handleStartDateChange} max={getCurrentDate()} />
                            </div>
                            <span >{`=>`}</span>
                            <div className='w-56 mr-4'>
                                {/* <label htmlFor="">Đến ngày </label>
                            <input className='pl-2' type="date" value={endTimeDate} onChange={handleEndDateChange} max={getCurrentDate()} /> */}
                                <label htmlFor="">Đến ngày </label>
                                <input className='pl-2' type="date" value={getCurrentDate()} readOnly />
                            </div>
                            <Button onClick={handleApiCall}>Tìm</Button>
                            <Button onClick={handleCancelSearchDate}>Hủy</Button>
                        </div>
                    )
                )}
            </div>

            {isLoading ? (
                    <BounceLoader
                    color="#36d7b7"
                    style={{position: "absolute", top: "50%", left: "54%"}}
                    />
                ) : (
                    <TemplateTableTrip
                        title={`Danh sách chuyến đi `}
                        callBack={handelGetList}
                        dataTable={dataTrip}
                        columnTable={column}
                        deleteFunc={deleteTrip}
                        createFunc={addTrip}
                        dataId={fomatCustomCurrent}
                        changeFunc={updateTrip}
                        buttonAdd={buttonAdd}
                        showAction={showAction}
                        formEdit={
                            <Fragment>
                                <Form.Item label='Tên xe' name='car_id' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                                    <Select placeholder="lựa chọn xe">
                                        {dataCarTrip?.map((item: any) => (
                                            <Option value={item?.id} key={item?.id}>{item?.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item label='chuyến Tuyến đường' name='route_id' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                                    <Select placeholder="Chọn tuyến đường" onChange={handleRouteChange} >
                                        {dataRouteTrip?.map((item: any) => (
                                            <Option value={item?.id} key={item?.id}>{item?.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item label='Thời gian bắt đầu' name='start_time' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>

                                    <Input
                                        type='datetime-local'
                                        style={{ width: 200 }}
                                    // value={startTime} 
                                    />

                                </Form.Item>
                                <Form.Item label='Địa điểm bắt đầu' name='start_location' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                                    <Select placeholder="lựa chọn địa điểm bắt đầu">
                                        {startLocations?.location?.map((location: any) => (
                                            <Option key={location?.id} value={location?.name}>{location?.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item label='Trạng thái' name='status' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                                    {/* <CustomSwitchs checked={current} onChange={handleChange} value={checked} /> */}
                                    <Select onChange={handleChange} value={`${current}`}>
                                        {[
                                            { value: acctive, label: "Hoạt động" },
                                            { value: inAcctive, label: "Không hoạt động" }
                                        ].map((option: any) => (
                                            <Option key={option?.value} value={option?.value}>
                                                {option.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item label='Giá chuyến đi' name='trip_price' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label='Địa điểm kết thúc ' name='end_location' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                                    <Select placeholder="lựa chọn địa điểm bắt đầu">
                                        {endLocations?.location?.map((location: any) => (
                                            <Option key={location?.id} value={location?.name} >{location?.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item label='Thời gian ước tính' name='interval_trip' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                                    <Input />
                                </Form.Item>
                            </Fragment>
                        }
                    />
                )
            }
        </>
    )
}

export default TripComponent