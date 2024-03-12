import React, { Fragment, useEffect, useState } from 'react'
import TemplateTable from '../common/template-table/template-table.component'
import {getAllCar , deleteCar, addCar, updateCar } from './service/car.service';
import  { getAllTypeCar } from '../type_car/service/typeCar.service'
import { Form, Input, Select, Switch } from 'antd';
import { Option } from 'antd/es/mentions';
<<<<<<< HEAD
=======
import CustomSwitch from './component/CustomSwitch'; 
import { log } from 'console';
>>>>>>> 7dd0ffc31139e10126e59a22ab45443a5c363b59
const CarComponent = () => {
    
    const [column, setColumn] = useState<any>([]);
    const [dataCar, setDataCar] = useState<any>([]);
    const [dataTypecar, setDataTypecar] = useState<any>([]); 
    const [checked, setChecked] = useState<any>();
    const [current, setCurrent] = useState<any>();
    console.log(dataCar)
    const handleChange = (value:any) => {
        setCurrent(value); 
    };
    
    
    useEffect(() => {
        getAllTypeCar().then((res) => {
            if (res) {
                setDataTypecar(res.data?.type_car)
            }
        })
    }, [])
    

    useEffect(() => {
        const columsTemp: any = []
        const title = ['STT', 'Tên xe', 'Màu xe', 'Hình ảnh', 'Mô tả' ,'Biển số xe', 'Trạng Thái', 'Kiểu xe']
        
        if (dataCar.length > 0) {
            Object.keys(dataCar[0]).forEach((itemKey, key = 0) => {
                if (!['id', 'created_at', 'updated_at'].includes(itemKey)) {
                    columsTemp.push({
                        title: title[key++],
                        dataIndex: itemKey,
                        key: itemKey,
                        render: (text: any, record: any, index: any) => {
                            if (itemKey == 'image') {
                                const image = record?.image
                                return <img src={image} alt="" className='w-[100px]' />
                            }
                            if (itemKey === 'id_type_car') {
                                const typeCar = dataTypecar.find((typeCar: any) => typeCar.id === text);
                                return <h2>{typeCar ? typeCar.name : 'Chưa phân loại'}</h2>;
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
                            return text
                        }
                    })
                }
                
            })
            
        }
        setColumn(columsTemp)
    }, [dataCar])

    const [reset, setReset] = useState<any>([]);
    useEffect(() => {
        getAllCar().then((res) => {
            if (res) {
                setDataCar(res?.data)
            }
        })
    }, [reset])


    const handelGetList = () => {
        setReset(!reset)
    }
    const fomatCustomCurrent = (data: any) => {
        setCurrent(data?.status === 1 ? 1 : 0)
    }
    const acctive = 1;
    const inAcctive = 0
    return (
        <div>
            <TemplateTable
                title={`Danh sách xe `}
                callBack={handelGetList}
                dataTable={dataCar}
                columnTable={column}
                deleteFunc={deleteCar}
                createFunc={addCar}
                dataId={fomatCustomCurrent}
                changeFunc={updateCar}
                formEdit={
                    <Fragment>
                        <Form.Item label='Tên xe' name='name' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label='Màu xe' name='color' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label='Mô tả loại xe' name='description' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label='Biển số xe' name='license_plate' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label='Hình ảnh( copy link ảnh )' name='image' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label='Kiểu xe' name='id_type_car' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                        <Select placeholder="lựa chọn trạng thái">
                                {dataTypecar?.map((item: any, index: any) => (
                                    <Option value={item?.id} key={item?.id}>{item?.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label='Trạng Thái' name='status' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                        <Select placeholder='Chọn trạng thái' onChange={handleChange} value={`${current}`}>
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
                    </Fragment>
                }       
            />
        </div >
    )
}

export default CarComponent