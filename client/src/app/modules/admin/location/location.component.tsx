import React, { Fragment, useEffect, useState } from 'react'
import TemplateTable from '../common/template-table/template-table.component'
import { addLocaltion, deleteLocaltion, getAllLocaltion, updateLocaltion } from './service/location.service';
import { getAllParent } from '../parent-location/service/parent-location.service'
import { Form, Input, Select, Space, Upload } from 'antd';
import { Option } from 'antd/es/mentions';
const LocaltionComponent = () => {
    
    const [column, setColumn] = useState<any>([]);
    const [dataLocation, setDataLocation] = useState<any>([]);
    const [dataParentLocation, setDataParentLocation] = useState<any>([]);
    const [current, setCurrent] = useState<any>(true);
    console.log(dataParentLocation);
    
    useEffect(() => {
        getAllParent().then((res) => {
            if (res) {
                setDataParentLocation(res.data?.parent_location)
            }
        })
    }, [])
    useEffect(() => {
        const columsTemp: any = []
        const title = ['STT', 'tên', 'ảnh', 'Mô tả', 'Tỉnh thành']
        console.log('s', columsTemp);
        console.log('h', dataParentLocation);
        if (dataLocation?.length > 0) {
            Object.keys(dataLocation[0]).forEach((itemKey, key = 0) => {
                if (!['id', 'created_at', 'updated_at'].includes(itemKey)) {
                    columsTemp.push({
                        title: title[key++],
                        dataIndex: itemKey,
                        key: itemKey,
                        render: (text: any, record: any, index: any) => {
                            if (itemKey == 'image') {
                                const image = record?.image
                                const baseUrl = 'http://127.0.0.1:8000/'
                                const imageUrl = `${baseUrl}${image}`
                              
                                console.log('link image', imageUrl);
                                return <img src={imageUrl} alt="" className='w-[100px]' />
                              }
                            if (itemKey === 'parent_location_id') {
                                // Find the corresponding parent_location object
                                const parentLocation = dataParentLocation.find((parent: any) => parent.id === text);

                                // Render the name if found
                                return <h2>{parentLocation ? parentLocation.name : 'Chưa phân loại'}</h2>;
                            }
                            return text
                        }
                    })
                }
            })
        }
        setColumn(columsTemp)
    }, [dataLocation])

    const [reset, setReset] = useState<any>([]);
    useEffect(() => {
        getAllLocaltion().then((res) => {
            if (res) {
                setDataLocation(res?.data?.Locations)
            }
        })
    }, [reset])


    const handelGetList = () => {
        setReset(!reset)
    }
    const fomatCustomCurrent=(data:any)=>{
        setCurrent(data)
    } 

    return (
        <div>
            <TemplateTable
                title={`Danh sách Địa điểm `}
                callBack={handelGetList}
                dataTable={dataLocation}
                dataId={fomatCustomCurrent}
                columnTable={column}
                deleteFunc={deleteLocaltion}
                createFunc={addLocaltion}
                changeFunc={updateLocaltion}
                formEdit={
                    <Fragment>
                        <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label='description' name='description' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label='parent_location_id' name='parent_location_id' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                            <Select placeholder="lựa chọn trạng thái">
                                {dataParentLocation?.map((item: any, index: any) => (
                                    <Option value={item?.id} key={item?.id}>{item?.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                    </Fragment>
                }
            />
        </div >
    )
}

export default LocaltionComponent