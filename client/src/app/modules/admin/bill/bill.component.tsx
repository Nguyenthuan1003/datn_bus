import React, { Fragment, useEffect, useState } from 'react'
import TemplateTable from '../common/template-table/template-table.component'
import { createBill, deleteBill, getAllBill } from './service/bill.service'
// import  { getAllTypeCar } from '../type_car/service/typeCar.service'
import { Button, DatePicker, Form, Input, Modal, Select, Skeleton, Switch, Tag, TimePicker, message } from 'antd';
import TemplateModelBill from '../common/template-model-bill/template-model-bill.component';



const BillComponent = () => {

    // const [column, setColumn] = useState<any>([]);
    const [dataBill, setDataBill] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm()

    useEffect(() => {
        getAllBill().then((res) => {
            if (res) {
                setDataBill(res?.data?.bills)
                setIsLoading(true)
                setTimeout(function () {
                    setIsLoading(false)
                }, 2000)

            }
        })
    }, [])



    const [reset, setReset] = useState<any>([]);
    useEffect(() => {
        getAllBill().then((res) => {
            if (res) {
                setDataBill(res?.data?.bills?.sort((a:any , b:any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
            }
        })
    }, [reset])


    const handelGetList = () => {
        setReset(!reset)
    }


    // const fomatCustomCurrent = (data: any) => {
    //     setCurrent(data)
    // }
    // const handleChange = (checked: number) => {
    //     setCurrent(checked ? 1 : 0);
    //     console.log(checked);

    // };
    // const handleChange = (value: any) => {
    //     setCurrent(value);
    //     setChecked(value);
    //     console.log(value);

    // };
    // const acctive = 1;
    // const inAcctive = 0
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.validateFields().then((value: any) => {
            createBill(value).then((res: any) => {
                setIsModalOpen(true);
                if (res) {
                    setIsModalOpen(false);
                    message.success("thêm thành công")
                }
            })
        })

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    }
    return (
        <div>
            <div>
                <Button onClick={showModal}>Thêm</Button>
                <div>

                </div>
                <Modal title="Thêm đơn hàng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} centered width={800}>
                    <Form form={form} layout='vertical' >
                        <Fragment>
                            <Form.Item label='Chuyến đi' name='trip_id' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label='Khách hàng' name='discount_code_id' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label='Tổng chỗ ngồi' name='total_seat' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label='Mã ghế' name='seat_id' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label='Khách hàng' name='user_id' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label='Tổng tiền' name='total_money' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label='Tổng số tiền Hóa đơn' name='total_money_after_discount' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label='Tên khách hàng' name='full_name' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label='email' name='email' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
                                <Input />
                            </Form.Item>
                        </Fragment>
                    </Form>
                </Modal>
            </div>
            {
                isLoading ? <Skeleton /> : (
                    <TemplateModelBill
                        title={`Danh sách hóa đơn `}
                        dataTable={dataBill}
                        deleteFunc={deleteBill}
                        callBack={handelGetList}
                    // columnTable={column}
                    // onRef={(ref) => (this.child = ref)}
                    // handleSearch={handleSearch}
                    // rowSelection={rowSelection}
                    // search={search}
                    // total={total}
                    // currentPage={currentPage}
                    // pageSize={pageSize}
                    // showTotal={showTotal}
                    // onShowSizeChange={onShowSizeChange}
                    // onChange={onChange}
                    />
                )
            }


        </div>
    )
}

export default BillComponent