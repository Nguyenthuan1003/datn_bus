import React, { Fragment, useEffect, useState } from 'react'
import TemplateTable from '../common/template-table/template-table.component'
import { addLocaltion, deleteLocaltion, getAllLocaltion, updateLocaltion } from './service/location.service';

import { Form, Input, Upload } from 'antd';
const LocaltionComponent = () => {
    const [column, setColumn] = useState<any>([]);
    const [dataLocation, setDataLocation] = useState<any>([]);

    useEffect(() => {
        const columsTemp: any = []
        const title = ['STT','tên','ảnh','description','parent_locations_id']
        if (dataLocation.length > 0) {
            Object.keys(dataLocation[0]).forEach((itemKey, key = 0) => {
                if (![ 'id','created_at', 'updated_at'].includes(itemKey)) {
                    columsTemp.push({
                        title: title[key++],
                        dataIndex: itemKey,
                        key: itemKey,
                        render:(text:any,record:any,index:any)=>{
                            if(itemKey=='image'){
                                const image = record?.image
                                return <img src={image} alt="" />
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
  return (
    <div>
        <TemplateTable
         title={`Danh sách tỉnh thành `}
         callBack={handelGetList}
         dataTable={dataLocation}
         columnTable={column}
         deleteFunc={deleteLocaltion}
         createFunc={addLocaltion}
         changeFunc={updateLocaltion}
         formEdit={
            <Fragment>
                <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                    <Input />
                </Form.Item>
                {/* <Form.Item label='image' name='image' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
       <input type="file" />
                </Form.Item> */}

                <Form.Item label='description' name='description' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                    <Input />
                </Form.Item>


                <Form.Item label='parent_locations_id' name='parent_locations_id' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                    <Input />
                </Form.Item>                
            </Fragment>
        }
        />
    </div>
  )
}

export default LocaltionComponent