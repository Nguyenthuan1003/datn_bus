import React, { Fragment, useEffect, useState } from 'react'
import TemplateTable from '../common/template-table/template-table.component'
import {getAllSeat,deleteSeat,addSeat,updateSeat} from './service/seat.serice';
import  { getAllCar } from '../car/service/car.service'
import { Form, Input, Select, Switch } from 'antd';
import { Option } from 'antd/es/mentions';
import { log } from 'console';
const SeatComponent = () => {
    
    const [column, setColumn] = useState<any>([]);
    const [dataSeat, setDataSeat] = useState<any>([]);
    const [dataCurrent, setDataCurrent] = useState<any>({});
    const [dataCar, setDataCar] = useState<any>([]);
    console.log('s',dataSeat);
    console.log('d',dataCar);
    
    useEffect(() => {
        getAllCar().then((res) => {
            if (res) {
                setDataCar(res?.data)
            }
        })
    }, [])
    
    useEffect(() => {
        const columsTemp: any = []
        const title = ['STT', 'Loại xe','Mã ghế ngồi' ]
        
        if (dataSeat.length > 0) {
            Object.keys(dataSeat[0]).forEach((itemKey, key = 0) => {
                if (!['id', 'created_at', 'updated_at'].includes(itemKey)) {
                    columsTemp.push({
                        title: title[key++],
                        dataIndex: itemKey,
                        key: itemKey,
                        render: (text: any, record: any, index: any) => {
                            console.log(dataCar)
                            if (itemKey === 'car_id') {                      
                                const typecar = dataCar.find((car: any) => car.id == text);
                                return <h2>{typecar ? typecar?.name : 'Chưa phân loại'}</h2>;
                            }
                            return text
                        }
                        
                    })
                }
                
            })
            
        }
        setColumn(columsTemp)
    }, [dataSeat])

    const [reset, setReset] = useState<any>([]);
    useEffect(() => {
        getAllSeat().then((res) => {
            if (res) {
                setDataSeat(res?.data?.seats)
            }
        })
    }, [reset])


    const handelGetList = () => {
        setReset(!reset)
    }
    const  fomatCustomCurrent=(data:any)=>{
            setDataCurrent(data)
            console.log('aaaa',data );
            
          }
    return (
        <div>
            <TemplateTable
                title={`Danh sách ghế ngồi  `}
                callBack={handelGetList}
                dataTable={dataSeat}
                columnTable={column}
                deleteFunc={deleteSeat}
                createFunc={addSeat}
                changeFunc={updateSeat}
                dataId={fomatCustomCurrent}
                formEdit={
                    <Fragment>
                        <Form.Item label='Mã chỗ ngồi' name='code_seat' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label='Xe' name='car_id'
                        // getValueFromEvent={(event,select)=>({name:select?.children,id:select?.value})}
                        // getValueProps={(value)=>({label:value?.name,value:value?.id})}
                         rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                        <Select placeholder="lựa chọn xe">
                                {dataCar?.map((item: any, index: any) => (
                                    <Option value={item?.id} key={item?.id}>{item?.name}</Option>
                                ))
                                }
                            </Select>
                        </Form.Item>
                    </Fragment>
                }       
            />
        </div >
    )
}

export default SeatComponent