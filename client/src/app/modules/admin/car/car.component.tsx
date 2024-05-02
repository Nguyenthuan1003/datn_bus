import React, { Fragment, useEffect, useState } from 'react'

import { getAllCar, deleteCar, addCar, updateCar } from './service/car.service'
import { getAllTypeCar } from '../type_car/service/typeCar.service'
import { Form, Input, Select, Switch } from 'antd'
import { Option } from 'antd/es/mentions'
import { ColorPicker, Space } from 'antd'
import { BounceLoader } from 'react-spinners'
import { DownOutlined } from '@ant-design/icons'
import { log } from 'console'
import TemplateTableImgae from '../common/template-table-image/templateTableImage'
const CarComponent = () => {
  const [column, setColumn] = useState<any>([])
  const [dataCar, setDataCar] = useState<any>([])
  const [dataTypecar, setDataTypecar] = useState<any>([])
  const [checked, setChecked] = useState<any>()
  const [current, setCurrent] = useState<any>()
  const [selectedColor, setSelectedColor] = useState<string>('#1677ff')
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(true);
  const handleChange = (value: any) => {
    setCurrent(value)
  }

  useEffect(() => {
    getAllTypeCar().then((res) => {
      if (res) {
        setDataTypecar(res.data?.type_car)
        setLoading(false);
      }
    })
  }, [])

  useEffect(() => {
    const columsTemp: any = []
    const title = ['STT', 'Tên xe', 'Màu xe', 'Hình ảnh', 'Mô tả', 'Biển số xe', 'Trạng Thái', 'Kiểu xe']

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
                const baseUrl = 'http://127.0.0.1:8000/'
                const imageUrl = `${baseUrl}${image}`
                return <img src={imageUrl} alt='' className='w-[80px]' />
              }
              if (itemKey === 'color') {
                return <div style={{ backgroundColor: text }}>{text}</div>
              }
              if (itemKey === 'id_type_car') {
                const typeCar = dataTypecar.find((typeCar: any) => typeCar.id === text)
                return <h2>{typeCar ? typeCar.name : 'Chưa phân loại'}</h2>
              }
              if (itemKey === 'status') {
                return (
                  <Switch
                    style={{ background: text ? 'green' : 'red' }}
                    checked={text}
                    checkedChildren='Đang hoạt động'
                    unCheckedChildren='Ngừng hoạt động'
                    disabled
                  />
                )
              }
              return text
            }
          })
        }
      })
    }
    setColumn(columsTemp)
  }, [dataCar])

  const [reset, setReset] = useState<any>([])
  useEffect(() => {
    getAllCar().then((res) => {
      if (res) {
        const sortedData = res.data.sort(
          (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        setDataCar(sortedData)
        setLoading(false);
      }
    })
  }, [reset])

  useEffect(() => {
    const currentData = form.getFieldsValue();
    currentData.color = selectedColor;
    form.setFieldsValue(currentData);
  }, [selectedColor, form]);

  const handelGetList = () => {
    setReset(!reset)
  }
  const fomatCustomCurrent = (data: any) => {
    setCurrent(data?.status === 1 ? 1 : 0)
  }
  const acctive = 1
  const inAcctive = 0
  return (
    <>
    {loading ? (
        <BounceLoader
        color="#36d7b7"
        style={{position: "absolute", top: "50%", left: "54%"}}
        />
    ) : (
    <div>
      <TemplateTableImgae
        title={`Danh sách xe `}
        callBack={handelGetList}
        dataTable={dataCar}
        columnTable={column}
        deleteFunc={deleteCar}
        createFunc={(data: any) => {
          data.color = selectedColor;
          addCar(data).then(() => {
            handelGetList();
          });
        }}
        dataId={fomatCustomCurrent}
        changeFunc={updateCar}
        formEdit={
          <Fragment>
            <Form.Item label='Tên xe' name='name' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
              <Input />
            </Form.Item>
            <Form.Item label='Màu xe' name='color' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
              <ColorPicker
                defaultValue='#1677ff'
                showText={(color) => color.metaColor.toHexString()}
                format='hex'
                // onChange={(color) => {
                //   console.log(color)
                //   setSelectedColor(color.metaColor.toHex())
                // }}
              />
            </Form.Item>
            <Form.Item
              label='Mô tả loại xe'
              name='description'
              rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Biển số xe'
              name='license_plate'
              rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Kiểu xe'
              name='id_type_car'
              rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}
            >
              <Select placeholder='lựa chọn trạng thái'>
                {dataTypecar?.map((item: any, index: any) => (
                  <Option value={item?.id} key={item?.id}>
                    {item?.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label='Trạng Thái' name='status' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
              <Select placeholder='Chọn trạng thái' onChange={handleChange} value={`${current}`}>
                {[
                  { value: acctive, label: 'Hoạt động' },
                  { value: inAcctive, label: 'Không hoạt động' }
                ].map((option: any) => (
                  <Option key={option?.value} value={option?.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Fragment>
        }
      />
    </div>
    )}
    </>
  )
}

export default CarComponent
