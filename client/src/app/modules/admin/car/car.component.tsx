import React, { Fragment, useEffect, useState } from 'react'
import TemplateTable from '../common/template-table/template-table.component'
import {getAllCar , deleteCar, addCar, updateCar } from './service/car.service';
import  { getAllTypeCar } from '../type_car/service/typeCar.service'
import { Form, Input, Select, Switch } from 'antd';
import { Option } from 'antd/es/mentions';
import CustomSwitch from './component/CustomSwitch'; 
const CarComponent = () => {
    
    const [column, setColumn] = useState<any>([]);
    const [dataCar, setDataCar] = useState<any>([]);
    const [dataTypecar, setDataTypecar] = useState<any>([]); 
    const [checked, setChecked] = useState(false); // Trạng thái ban đầu cho Switch

    const handleChange = (value:any) => {
      setChecked(value); // Cập nhật trạng thái khi Switch thay đổi
    };
     
    console.log('cc',dataCar);
    console.log();
    
    
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
    return (
        <div>
            <TemplateTable
                title={`Danh sách xe `}
                callBack={handelGetList}
                dataTable={dataCar}
                columnTable={column}
                deleteFunc={deleteCar}
                createFunc={addCar}
                changeFunc={updateCar}
                formEdit={
                    <Fragment>
                        <Form.Item label='Loại xe' name='name' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
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
                            <CustomSwitch checked={checked} onChange={handleChange} value={checked} />
                        </Form.Item>
                    </Fragment>
                }       
            />
        </div >
    )
}

export default CarComponent