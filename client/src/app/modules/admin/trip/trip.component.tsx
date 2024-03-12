import React, { Fragment, useEffect, useState } from 'react'
import TemplateTable from '../common/template-table/template-table.component'
import { getAllTrip, addTrip, deleteTrip, updateTrip, getCarTrip, getRouteTrip, getLocationForRoute, } from './service/trip.service'
// import  { getAllTypeCar } from '../type_car/service/typeCar.service'
import { DatePicker, Form, Input, Select, Switch, Tag, TimePicker } from 'antd';
import viVN from 'antd/es/date-picker/locale/vi_VN';
import { Option } from 'antd/es/mentions';

import moment, { Moment } from 'moment-timezone';



const TripComponent = () => {

    const [column, setColumn] = useState<any>([]);
    const [dataTrip, setDataTrip] = useState<any>([]);
    const [dataCarTrip, setDataCarTrip] = useState<any>([]);
    const [dataRouteTrip, setDataRouteTrip] = useState<any>([]);
    const [selectedRouteId, setSelectedRouteId] = useState<any>({});
    const [current, setCurrent] = useState<any>(null);
    const [checked, setChecked] = useState<any>(0);
    console.log('dataTrip',dataTrip);
    
    // const checkLocation = startLocations?.find((item:any) => item?.route_id ==  selectedRouteId );
    // console.log('checkLocation',checkLocation);

    // const [checked, setChecked] = useState<any>();



    // const handleRouteChange = async (routeId:any) => {
    //     try {
    //         const response = await fetch(`http://127.0.0.1:8000/api/trip/locations-for-route/1`);
    //         const data = await response.json();
    //         console.log('data',data);

    //         setStartLocations(data?.start_locations);
    //         setEndLocations(data?.end_locations);
    //     } catch (error) {
    //         console.error('Error fetching locations:', error);
    //     }
    // };
    useEffect(() => {
        getRouteTrip().then((res) => {
            if (res) {
                setDataRouteTrip(res?.data?.routes)
            }
        })
    }, [])
    useEffect(() => {
        getAllTrip().then((res) => {
            if (res) {
                setDataTrip(res.data?.trips)
            }
        })
    }, [])

    const [startLocations, setStartLocations] = useState<any>({});
    const [endLocations, setEndLocations] = useState<any>({});
    // const checkLocation = startLocations?.find((item:any) => item?.route_id ==  selectedRouteId );
    //     console.log('checkLocation',checkLocation);
    useEffect(() => {
        getLocationForRoute(selectedRouteId).then((res) => {
            if (res) {
                setStartLocations(res.data?.start_locations);
            }

            if (res) {
                setEndLocations(res.data?.end_locations);
            }
        });
    }, [selectedRouteId]);
    // useEffect(() => {
    //     getLocationForRoute(selectedRouteId).then((res) => {
    //         if (res) {
    //             setEndLocations(res.data?.end_locations);
    //         }
    //     });
    // }, [selectedRouteId]);

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
        const title = ['STT', 'Tên xe' ,'Thời gian bắt đầu ', 'Địa điểm bắt đầu ', 'Trạng Thái', 'Giá chuyến đi', 'Địa điểm kết thúc ', 'Tổng thời gian chuyến đi', 'Tuyến đường ']

        if (dataTrip.length > 0) {
            Object.keys(dataTrip[0]).forEach((itemKey, key = 0) => {
                if (!['id', 'created_at', 'updated_at'].includes(itemKey)) {
                    columsTemp.push({
                        title: title[key++],
                        dataIndex: itemKey,
                        key: itemKey,
                        render: (text: any, record: any, index: any) => {
                            if (itemKey === 'car_id') {
                                const nameCar = dataCarTrip.find((val: any) => val.id === text)?.name;
                                return <>{nameCar ? nameCar : "Not Car"}</>;
                            }
                            if (itemKey === 'status') {
                                // return <Tag color={text ? 'green' : 'red'}>{text ? 'Active' : 'Inactive'}</Tag>
                                return <Switch
                                    style={{ background: text ? 'green' : 'red' }}
                                    checked={text}
                                    checkedChildren="Đang hoạt động"
                                    unCheckedChildren="Ngừng hoạt động"
                                    disabled
                                />
                            }
                            if (itemKey === 'route_id') {
                                // return <Link to={`/trip/${text}`}>Ver Ruta</Link>
                                const nameRoute = dataRouteTrip.find((val: any) => val.id === text)?.name;
                                return <h2>{nameRoute ? nameRoute : "Not route"}</h2>
                            }
                            if (itemKey == "trip_price") {
                                return <div>{record?.trip_price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                            }
                            if (itemKey == "start_time") {
                                //    const dataTime=record?.start_time
                                //    const doneTime=moment(dataTime).format('YYYY-MM-DD HH:mm:ss')
                                // record?.start_time = 2024-03-02T12:48:50Z
                                const utcDateTimeString = record?.start_time;
                                const vietnamDateTimeString = moment.utc(utcDateTimeString).local().format('DD/MM/YYYY HH:mm:ss');
                                // const localDateTimeString = moment.utc(utcDateTimeString).format('YYYY/MM/DD HH:mm:ss')
                                return <div>{vietnamDateTimeString}</div>
                            }
                            if (itemKey === "interval_trip") {
                                const utcDateTimeString = record?.interval_trip;
                                const momentTime = moment(utcDateTimeString, 'HH:mm');
                                
                                let time = "";
                                
                                if (momentTime.hours() === 0 && momentTime.minutes() === 30) {
                                    time = `30 phút`;
                                } else if (momentTime.hours() === 0 && momentTime.minutes() < 60) {
                                    time = `${momentTime.minutes()} phút`;
                                } else {
                                    time = `${momentTime.hours()} giờ ${momentTime.minutes()} phút`;
                                }
                            
                                return <div><span>{time}</span></div>;
                            }
                            return text
                        }
                    })
                }

            })

        }
        setColumn(columsTemp)
    }, [dataTrip])

    const [reset, setReset] = useState<any>([]);
    useEffect(() => {
        getAllTrip().then((res) => {
            if (res) {
                setDataTrip(res?.data?.trips)
            }
        })
    }, [reset])


    const handelGetList = () => {
        setReset(!reset)
    }


    const fomatCustomCurrent = (data: any) => {
        setCurrent(data?.status === 1 ? 1 : 0)
    }
    // const handleChange = (checked: number) => {
    //     setCurrent(checked ? 1 : 0);
    //     console.log(checked);

    // };
    const handleChange = (value: any) => {
        setCurrent(value);
        setChecked(value);
        console.log(value);

    };
    const handleDateChange = (date: Moment | null | any) => {
        if (date) {
            const year = date.year(); // Lấy giá trị năm
            const month = date.month() + 1; // Lấy giá trị tháng (chú ý là tháng trong Moment bắt đầu từ 0)
            const day = date.date(); // Lấy giá trị ngày
            const hour = date.hour(); // Lấy giá trị giờ
            const minute = date.minute(); // Lấy giá trị phút
    
            console.log(`Ngày được chọn: ${year}-${month}-${day} ${hour}:${minute}`);
        } else {
            console.log('Ngày không hợp lệ');
        }
    };
    // const handleDateChange = (date: Moment | null  | any) => {
    //     // Xử lý thay đổi ngày
    //     console.log('Ngày được chọn:', date);
    //   };
    const acctive = 1;
    const inAcctive = 0

    return (
        <div>
            <TemplateTable
                title={`Danh sách chuyến đi `}
                callBack={handelGetList}
                dataTable={dataTrip}
                columnTable={column}
                deleteFunc={deleteTrip}
                createFunc={addTrip}
                dataId={fomatCustomCurrent}
                changeFunc={updateTrip}
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
                        {/* <Form.Item label='Ngày bắt đầu' name='start_date' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>

                            <Input />
                        </Form.Item> */}
                        <Form.Item label='Thời gian bắt đầu' name='start_time' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                        {/* <DatePicker
                            // showTime={{ defaultValue: moment('00:00', 'HH:mm'), format: 'HH:mm' }}
                            showTime
                            format="DD/MM/YYYY HH:mm:ss"
                            placeholder="Chọn ngày và giờ"
                            onChange={handleDateChange}
                            locale={viVN}
                        /> */}
                            <Input />
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
                                ].map(option => (
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
                        <Form.Item label='Tổng chuyến đi' name='interval_trip' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                               <Input />
                        </Form.Item>
                    </Fragment>
                }
            />
        </div >
    )
}

export default TripComponent