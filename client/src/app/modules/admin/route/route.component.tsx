import React, { Fragment, useEffect, useState } from 'react'
import TemplateTable from '../common/template-table/template-table.component'
import { Form, Input, Select, Switch } from 'antd'
import { addRoute, deleteRoute, getAllRoute, updateRoute } from './service/route.service'
import {getAllParent} from '../parent-location/service/parent-location.service'
import CustomSwitchs from './component/CustomSwitchs.component'
import { Option } from 'antd/es/mentions';
const Route = () => {
    const [column, setColumn] = useState<any>([]);
    const [dataRoute, setRoute] = useState<any>([]);
    const [dataParentLocation, setDataParentLocation] = useState<any>([]);
    console.log('ss',dataParentLocation);
    console.log('dataRoute',dataRoute);
    
    const [checked, setChecked] = useState<any>();
    const [current, setCurrent] = useState<any>(true);
    console.log('c',current);
    
    const handleChange = (value:any) => {
        setCurrent(value); 
    };
    
    const [reset, setReset] = useState<any>([]);
    useEffect(() => {
        getAllRoute().then((res) => {
            if (res) {
                setRoute(res.data?.routes)
            }
        })
    }, [reset])
    useEffect(() => {
        getAllParent().then((res) => {
            if (res) {
                setDataParentLocation(res.data?.parent_location)
            }
        })
    }, [])
    

    useEffect(() => {
        const columsTemp: any = []
        const title = ['STT','Tuyến Đường','Địa điểm bắt đầu','Địa điểm kết thúc', 'Trạng thái', 'Mô tả']
        if (dataRoute.length > 0) {
            Object.keys(dataRoute[0]).forEach((itemKey, key = 0) => {
                if (![ 'id','created_at', 'updated_at'].includes(itemKey)) {
                    columsTemp.push({
                        title: title[key++],
                        dataIndex: itemKey,
                        key: itemKey,
                        render:(text: any, record:any , index:any )=> {
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
    }, [dataRoute])


    const handelGetList = () => {
        setReset(!reset)
    }
    const  fomatCustomCurrent=(data:any)=>{
        setCurrent(data?.status === 1 ? true : false)
          }
    return (
        <div>
            <TemplateTable
                title={`Danh sách Tuyến đường  `}
                callBack={handelGetList}
                dataTable={dataRoute}
                columnTable={column}
                deleteFunc={deleteRoute}
                createFunc={addRoute}
                changeFunc={updateRoute}
                dataId={fomatCustomCurrent}
                formEdit={
                    <Fragment>
                        <Form.Item label='Điểm bắt đầu' name='start_location' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                        <Select placeholder="lựa chọn trạng thái">
                                {dataParentLocation?.map((item: any, index: any) => (
                                    <Option value={item?.name} >{item?.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label='Điểm kết thúc' name='end_location' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                        <Select placeholder="lựa chọn trạng thái">
                                {dataParentLocation?.map((item: any, index: any) => (
                                    <Option value={item?.name} >{item?.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label='Mô tả' name='description' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label='Trạng Thái' name='status' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                            <CustomSwitchs checked={current}  onChange={handleChange} value={checked} />
                        </Form.Item>
                    </Fragment>
                } />
        </div>
    )
}

export default Route