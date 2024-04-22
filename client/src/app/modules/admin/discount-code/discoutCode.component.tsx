import React, { Fragment, useEffect, useState } from 'react'
import TemplateTable from '../common/template-table/template-table.component'
import { addDiscountCode, deleteDiscountCode, getAllDiscountCode, updateDiscountCode } from './service/discountCode.service';
import { Form, Input, Select } from 'antd';
import { getAllTypeDiscountCode } from '../typeDiscout/service/typeDiscount.service';
import { Option } from 'antd/es/mentions';

const DiscoutCodeComponent = () => {
  const [column, setColumn] = useState<any>([]);
    const [dataDiscountCode, setDataDiscountCode] = useState<any>([]);
    const [dataTypeDiscount, setDataTypeDiscount] = useState<any>([]);
    const [dataCurrent, setDataCurrent] = useState<any>({});    
    console.log('dataTypeDiscount',dataTypeDiscount);
    console.log('dataDiscountCode',dataDiscountCode);

    
    useEffect(() => {
        getAllDiscountCode().then((res) => {
            if (res) {
              setDataDiscountCode(res?.data?.discounts)
            }
        })
        getAllTypeDiscountCode().then((res) => {
          if (res) {
              setDataTypeDiscount(res?.data?.type_discounts)
          }
      })
    }, [])
    useEffect(() => {
        const columsTemp: any = []
        const title = ['', 'Loại Giảm Giá', 'Chương trình giảm giá', 'Số lượng mã', 'Số lượng sử dụng','Thời gian hiệu lực',' Giá trị', 'Mã Giảm giá', 'Thời Gian hết hiệu lực']
        if (dataDiscountCode?.length > 0) {
            Object.keys(dataDiscountCode[0]).forEach((itemKey, key = 0) => {
                if (!['id', 'created_at', 'updated_at'].includes(itemKey)) {
                    columsTemp.push({
                        title: title[key++],
                        dataIndex: itemKey,
                        key: itemKey,
                        render: (text: any, record: any, index: any) => {
                          if(itemKey === "id_type_discount_code"){
                              const NameTypeDiscount =  dataTypeDiscount.find((val:any)=> val.id === record.id_type_discount_code)?.name;                              
                              return <div>{NameTypeDiscount}</div>
                          }
                          return text
                        }
                    })
                }
            })
        }
        setColumn(columsTemp)
    }, [dataDiscountCode])

    const [reset, setReset] = useState<any>([]);
    useEffect(() => {
        getAllDiscountCode().then((res) => {
            if (res) {
                setDataDiscountCode(res?.data?.discounts)
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
    <TemplateTable
      title={`Mã giảm giá `}
      dataTable={dataDiscountCode}
      columnTable={column}
      callBack={handelGetList}
      dataId={fomatCustomCurrent}
      deleteFunc={deleteDiscountCode}
      createFunc={addDiscountCode}
      changeFunc={updateDiscountCode}
      formEdit={
        <Fragment>
            <Form.Item label='Loại mã giảm giá' name='id_type_discount_code' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
            <Select placeholder="lựa chọn loại mã">
                                {dataTypeDiscount?.map((item: any, index: any) => (
                                    <Option value={item?.id} key={item?.id}>{item?.name}</Option>
                                ))}
                            </Select>
            </Form.Item>
            <Form.Item label='Chương trình giảm giá' name='name' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                <Input />
            </Form.Item>
            <Form.Item label='Số lượng giảm giá' name='quantity' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                <Input />
            </Form.Item>
            <Form.Item label='Thời gian hiệu lực' name='start_time' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                <Input
                  type='Date' 
                />
            </Form.Item>
            <Form.Item label='Thời gian hết hiệu lực' name='end_time' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
            <Input
                  type='Date' 
                />
            </Form.Item>
            <Form.Item label='Giá trị mã giảm giá' name='value' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                <Input />
            </Form.Item>
            <Form.Item label='Mã giảm giá' name='code' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                <Input />
            </Form.Item>
        </Fragment>
      }
     />
   
   </>
  )
}

export default DiscoutCodeComponent