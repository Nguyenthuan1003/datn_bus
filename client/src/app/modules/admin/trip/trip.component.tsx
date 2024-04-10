import React, { Fragment, useEffect, useState } from 'react'
import TemplateTableTrip from '../common/template-table-trip/template-table-trip.component'
import { getAllTrip, addTrip, deleteTrip, updateTrip, getCarTrip, getRouteTrip, getLocationForRoute, } from './service/trip.service'
// import  { getAllTypeCar } from '../type_car/service/typeCar.service'
import { DatePicker, Descriptions, DescriptionsProps, Form, Input, Segmented, Select, Switch, Tag, TimePicker } from 'antd';

import { Option } from 'antd/es/mentions';
import moment, { Moment } from 'moment';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { log } from 'console';

// dayjs.extend(utc);
// dayjs.extend(timezone);

// // Đặt múi giờ mong muốn
// dayjs.tz.setDefault("Asia/Ho_Chi_Minh");
const TripComponent = () => {


    
    
    const [column, setColumn] = useState<any>([]);
    const [dataDetail, setDataDetail] = useState<any>([])
    const [dataTrip, setDataTrip] = useState<any>([]);
    const [dataCarTrip, setDataCarTrip] = useState<any>([]);
    const [dataRouteTrip, setDataRouteTrip] = useState<any>([]);
    const [selectedRouteId, setSelectedRouteId] = useState<any>({});
    const [current, setCurrent] = useState<any>(null);
    const [checked, setChecked] = useState<any>(0);
    const [checkStatus, setCheckStatus] = useState<any>("not_started_trips")
    const [checkload, setCheckLoad] = useState<any>(true)
    const [buttonAdd , setButtonAdd] = useState<any>(false)
    const [reset, setReset] = useState<any>([]);
    // Lấy dữ liệu từ API
    useEffect(() => {
        getAllTrip()
        .then((res) => {
            if (checkStatus === "not_started_trips") {
                setDataTrip(res?.data?.not_started_trips?.sort((a:any , b:any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
                setButtonAdd(true);
                setCheckLoad(false);
            }
        })
        console.log('ressssss');
    }, [reset])

    useEffect(() => {
        getAllTrip().then((res) => {
            if (res) {
                if (checkStatus == "not_started_trips") {
                    setDataTrip(res?.data?.not_started_trips?.sort((a:any , b:any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())),
                    setCheckLoad(false)
                    setButtonAdd(true);
                    console.log('nooot');
                    
                }
                if (checkStatus == "all_trips") {
                    setDataTrip(res?.data?.all_trips?.sort((a:any , b:any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
                    setCheckLoad(false)
                    setButtonAdd(false);       
                }
                if (checkStatus == "started_trips") {
                    setDataTrip(res?.data?.started_trips?.sort((a:any , b:any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
                    setButtonAdd(false);    
                }
                
                // setDataTrip(res.data?.all_trips)
                console.log('use1');
                
            }
        })
    }, [checkStatus,checkload])
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
        const title = ['', 'Tên xe', 'Thời gian bắt đầu ', 'Địa điểm bắt đầu ', 'Trạng Thái', 'Giá chuyến đi', 'Địa điểm kết thúc ', ' ' ,'Tuyến đường ', ' ']
        const titleDetail = ['tên xe', 'biển số xe']
        if (dataTrip?.length > 0) {
            Object.keys(dataTrip[0]).forEach((itemKey, key = 0) => {
                if (!['id','car' , 'interval_trip', 'created_at', 'updated_at', 'route'].includes(itemKey)) {
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
                                const time =  moment.utc(utcDateTimeString).format('HH:mm')
                                return <div>{`${localDateTimeString} (${time})`}</div>
                            }
                            return text
                        }
                    })
                }
            })
        }
        setColumn(columsTemp)

    }, [dataTrip])
    

    


    const handelGetList = () => {
        setReset(!reset)
    }


    const fomatCustomCurrent = (data: any) => {
        setCurrent(data)
        console.log("current", data)
    }

    const handleChange = (value: any) => {
        setCurrent(value);
        setChecked(value);
        console.log(value);

    };

    const acctive = 1;
    const inAcctive = 0
    const handelStatusTrip = (value: any) => {
        setCheckStatus(value)
        console.log(value);
    }
    

    const [startTime, setStartTime] = useState<string>('');
  

    return (
        <div>
            <Segmented
                options={[
                    { value: 'not_started_trips', label: 'chuyến xe chưa đi' },
                    { value: 'started_trips', label: 'chuyến xe đã đi' },
                    { value: 'all_trips', label: 'Tất cả chuyến đi' },
                ]}
                size='large'
                style={{color: "blue"}}
                value={checkStatus}
                onChange={handelStatusTrip}

            />
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
                            style={{width:200}}  
                            value={startTime} 
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
                                ].map((option:any) => (
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