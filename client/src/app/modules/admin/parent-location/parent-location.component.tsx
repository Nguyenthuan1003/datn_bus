import React, { Fragment, useEffect, useState } from 'react'
import TemplateTable from '../common/template-table/template-table.component'
import { Form, Input } from 'antd'
import { addParent, deleteParent, getAllParent, updateParent } from './service/parent-location.service'

const ParentLocaltion = () => {
    const [column, setColumn] = useState<any>([]);
    const [dataParent, setDataParen] = useState<any>([]);
    const [reset, setReset] = useState<any>([]);
    console.log('reset',column);
    useEffect(() => {
        getAllParent().then((res) => {
            if (res) {
                setDataParen(res.data)
            }
        })
    }, [reset])

    useEffect(() => {
        const columsTemp: any = []
        const title = ['STT','Tỉnh thành']
        if (dataParent.length > 0) {
            Object.keys(dataParent[0]).forEach((itemKey, key = 0) => {
                if (![ 'id','created_at', 'updated_at'].includes(itemKey)) {
                    columsTemp.push({
                        title: title[key++],
                        dataIndex: itemKey,
                        key: itemKey
                    })
                }
            })
        }
        setColumn(columsTemp)
    }, [dataParent])


    const handelGetList = () => {
        setReset(!reset)
    }
    return (
        <div>
            <TemplateTable
                title={`Danh sách tỉnh thành `}
                callBack={handelGetList}
                dataTable={dataParent}
                columnTable={column}
                deleteFunc={deleteParent}
                createFunc={addParent}
                changeFunc={updateParent}
                formEdit={
                    <Fragment>
                        <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                            <Input />
                        </Form.Item>
                    </Fragment>
                } />
        </div>
    )
}

export default ParentLocaltion