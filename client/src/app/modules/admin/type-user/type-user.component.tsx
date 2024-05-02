import React, { Fragment, useEffect, useState } from 'react'
import TemplateTable from '../common/template-table/template-table.component'
import { Form, Input } from 'antd'
import { addType, deleteType, getAllType, updateType } from './service/type-user.service'
import { BounceLoader } from 'react-spinners'

const ParentType = () => {
    const [column, setColumn] = useState<any>([]);
    const [dataType, setDataType] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    
    const [reset, setReset] = useState<any>([]);
    console.log('reset',column);
    useEffect(() => {
        getAllType().then((res) => {
            if (res) {
                setDataType(res.data?.typeUsers)
                setLoading(false);
            }
        })
    }, [reset])

    useEffect(() => {
        const columsTemp: any = []
        const title = ['STT','Name']
        if (dataType.length > 0) {
            Object.keys(dataType[0]).forEach((itemKey, key = 0) => {
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
    }, [dataType])


    const handelGetList = () => {
        setReset(!reset)
    }
    return (
        <div>
            {loading ? (
                <BounceLoader
                color="#36d7b7"
                style={{position: "absolute", top: "50%", left: "54%"}}
                />
            ) : (
            <TemplateTable
                title={`Thành viên `}
                callBack={handelGetList}
                dataTable={dataType}
                columnTable={column}
                deleteFunc={deleteType}
                createFunc={addType}
                changeFunc={updateType}
                formEdit={
                    <Fragment>
                        <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                            <Input />
                        </Form.Item>
                    </Fragment>
                } />
            )}
        </div>
    )
}

export default ParentType