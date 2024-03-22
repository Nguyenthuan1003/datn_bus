import React, { Fragment, useEffect, useState } from 'react'
import TemplateTable from '../common/template-table/template-table.component'
import { getAllBill } from './service/bill.service'
// import  { getAllTypeCar } from '../type_car/service/typeCar.service'
import { DatePicker, Form, Input, Select, Switch, Tag, TimePicker } from 'antd';
import viVN from 'antd/es/date-picker/locale/vi_VN';
import { Option } from 'antd/es/mentions';

import moment, { Moment } from 'moment-timezone';
import { log } from 'console';



const BillComponent = () => {

    const [column, setColumn] = useState<any>([]);
    const [dataBill, setDataBill] = useState<any>([]);
    const [dataCarTrip, setDataCarTrip] = useState<any>([]);
    const [dataRouteTrip, setDataRouteTrip] = useState<any>([]);
    const [selectedRouteId, setSelectedRouteId] = useState<any>({});
    const [current, setCurrent] = useState<any>(null);
    const [checked, setChecked] = useState<any>(0);
    console.log('dataBill',dataBill);
    
    
    useEffect(() => {
        getAllBill().then((res) => {
            if (res) {
                setDataBill(res?.data?.bills)
            }
        })
    }, [])



    const handleRouteChange = (routeId: any) => {
        setSelectedRouteId(routeId);
    };

    useEffect(() => {
        const columnsTemp: any = [];
        const title = ['', 'STT', 'Mã ghế', 'Chuyến đi', 'khách hàng', 'Loại thanh toán','Số tiền','Tổng số tiền','Trạng thái thanh toán','Tổng số ghế ','Mã hóa đơn', 'Số điện thoại', 'Tên khách hàng','Email'];
    
        if (dataBill.length > 0) {
            // Bắt đầu từ chỉ số 1 để bỏ qua cột 'STT'
            Object.keys(dataBill[1]).forEach((itemKey, index) => {
                if (!['id', 'created_at', 'updated_at', 'discount_code', 'seat', 'trip', 'user', 'tiket', 'ticket_order' ,"discount_code_id"].includes(itemKey)) {
                    columnsTemp.push({
                        title: title[index],
                        dataIndex: itemKey,
                        key: itemKey,
                    });
                }
            });
        }
        setColumn(columnsTemp);
    }, [dataBill]);

    const [reset, setReset] = useState<any>([]);
    useEffect(() => {
        getAllBill().then((res) => {
            if (res) {
                setDataBill(res?.data?.bills)
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
    const acctive = 1;
    const inAcctive = 0

    return (
        <div>
            <TemplateTable
                title={`Danh sách hóa đơn `}
                callBack={handelGetList}
                dataTable={dataBill}
                columnTable={column}
                // deleteFunc={deleteTrip}
                // createFunc={addTrip}
                dataId={fomatCustomCurrent}
                // changeFunc={updateTrip}
                formEdit={
                    <Fragment>
                        <Form.Item label='Mã Hóa đơn' name='code_bill' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label='Chuyến đi' name='trip_id' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                           
                        </Form.Item>
                        <Form.Item label='Khách hàng' name='discount_code_id' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label='Tổng chỗ ngồi' name='total_seat' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                                <Input />
                        </Form.Item>
                        <Form.Item label='Mã ghế' name='seat_id' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                                <Input />
                        </Form.Item>
                        <Form.Item label='Khách hàng' name='user_id' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label='Tổng tiền' name='total_money' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label='Tổng số tiền Hóa đơn' name='total_money_after_discount' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                                <Input />
                        </Form.Item>
                        <Form.Item label='Tên khách hàng' name='full_name' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                               <Input />
                        </Form.Item>
                        <Form.Item label='email' name='email' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                               <Input />
                        </Form.Item>
                    </Fragment>
                }
            />
        </div >
    )
}

export default BillComponent