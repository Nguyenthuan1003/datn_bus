import React, { Fragment, useEffect, useState } from 'react'
import TemplateTable from '../common/template-table/template-table.component'
import { getAllTypeCar , addTypeCar , deleteTypeCar, updateTypeCar } from './service/typeCar.service';
// import { getAllParent } from '../parent-location/service/parent-location.service'
import { Form, Input, Select, Space, Upload } from 'antd';
import { Option } from 'antd/es/mentions';
const TypeCarComponent = () => {
    
    const [column, setColumn] = useState<any>([]);
    const [dataTypecar, setDataTypecar] = useState<any>([]);
    const [dataCurrent, setDataCurrent] = useState<any>({});    
    useEffect(() => {
        getAllTypeCar().then((res) => {
            if (res) {
                setDataTypecar(res.data?.type_car)
            }
        })
    }, [])
    useEffect(() => {
        const columsTemp: any = []
        const title = ['STT', 'tên', 'description', 'total_seat', 'type_seats']
        console.log('s', columsTemp);
        console.log('c', dataTypecar);
        if (dataTypecar.length > 0) {
            Object.keys(dataTypecar[0]).forEach((itemKey, key = 0) => {
                if (!['id', 'created_at', 'updated_at'].includes(itemKey)) {
                    columsTemp.push({
                        title: title[key++],
                        dataIndex: itemKey,
                        key: itemKey,
                    })
                }
            })
        }
        setColumn(columsTemp)
    }, [dataTypecar])

    const [reset, setReset] = useState<any>([]);
    useEffect(() => {
        getAllTypeCar().then((res) => {
            if (res) {
                setDataTypecar(res?.data?.type_car)
            }
        })
    }, [reset])


    const handelGetList = () => {
        setReset(!reset)
    }
    const  fomatCustomCurrent=(data:any)=>{
        setDataCurrent(data)
          }
    return (
        <div>
            <TemplateTable
                title={`Danh sách Loại xe `}
                callBack={handelGetList}
                dataTable={dataTypecar}
dataId={fomatCustomCurrent}
                columnTable={column}
                deleteFunc={deleteTypeCar}
                createFunc={addTypeCar}
                changeFunc={updateTypeCar}
                formEdit={
                    <Fragment>
                        <Form.Item label='Loại xe' name='name' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label='Chỗ ngồi' name='total_seat' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label='Mô tả loại xe' name='description' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label='Kiểu ngồi của xe' name='type_seats' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                            <Input />
                        </Form.Item>
                    </Fragment>
                }
            />
        </div >
    )
}

export default TypeCarComponent