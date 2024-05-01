import React, { Fragment, useEffect, useState } from 'react'
import TemplateTable from '../common/template-table/template-table.component'
import { addTypeDiscountCode, deleteTypeDiscountCode, getAllTypeDiscountCode, updateTypeDiscountCode } from './service/typeDiscount.service';
import { Form, Input } from 'antd';
import { BounceLoader } from 'react-spinners'

const TypeDiscoutComponent = () => {
    const [column, setColumn] = useState<any>([]);
    const [dataTypeDiscount, setDataTypeDiscount] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [dataCurrent, setDataCurrent] = useState<any>({});    
    useEffect(() => {
        getAllTypeDiscountCode().then((res) => {
            if (res) {
                setDataTypeDiscount(res?.data?.type_discounts)
                setLoading(false);
            }
        })
    }, [])

    useEffect(() => {
        const columsTemp: any = []
        const title = ['', 'tên']
        if (dataTypeDiscount?.length > 0) {
            Object.keys(dataTypeDiscount[0]).forEach((itemKey, key = 0) => {
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
    }, [dataTypeDiscount])

    const [reset, setReset] = useState<any>([]);
    useEffect(() => {
        getAllTypeDiscountCode().then((res) => {
            if (res) {
                setDataTypeDiscount(res?.data?.type_discounts)
                setLoading(false);
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
    <>
        {loading ? (
            <BounceLoader
            color="#36d7b7"
            style={{position: "absolute", top: "50%", left: "54%"}}
            />
        ) : (
        <TemplateTable 
            dataTable={dataTypeDiscount} 
            title={`Loại giảm giá `}
            callBack={handelGetList}
            dataId={fomatCustomCurrent}
            columnTable={column}
            deleteFunc={deleteTypeDiscountCode}
            createFunc={addTypeDiscountCode}
            changeFunc={updateTypeDiscountCode}
            formEdit={
                <Fragment>
                    <Form.Item label='Loại mã giảm giá' name='name' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                        <Input />
                    </Form.Item>
                </Fragment>
            }
        />
        )}
    </>
  )
}

export default TypeDiscoutComponent