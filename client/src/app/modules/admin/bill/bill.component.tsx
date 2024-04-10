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
    // const [dataCarTrip, setDataCarTrip] = useState<any>([]);
    // const [dataRouteTrip, setDataRouteTrip] = useState<any>([]);
    // const [selectedRouteId, setSelectedRouteId] = useState<any>({});
    // const [current, setCurrent] = useState<any>(null);
    // const [checked, setChecked] = useState<any>(0);
    // console.log('data',dataBill);
    // const paymentTypes = [
    //     { key: '0', name: 'VNP' },
    //     { key: '1', name: 'Thanh toán tại quầy' },
    //     { key: '2', name: 'Mono' }
    //   ];
    //   const getTypePayName = (typePayKey:any) => {
    //     const foundType = paymentTypes.find(type => type.key === typePayKey);
    //     console.log('foundType',foundType);

    //     return foundType ? foundType?.name : 'Không xác định';
    // };
    // const trip = dataBill.map((trip:any) => trip?.trip)


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

    // const getStatusText = (status:any) => {
    //     if (status === 1) {
    //         return <h3 style={{ color: 'green' }}>Thanh toán thành công</h3>;
    //     } else {
    //         return <h3 style={{ color: 'red' }}>Chưa thanh toán</h3>;
    //     }
    // };

    // const handleRouteChange = (routeId: any) => {
    //     setSelectedRouteId(routeId);
    // };

    // useEffect(() => {
    //     const columnsTemp: any = [];
    //     const title = ['STT','', '','Chuyến đi', '',  'Trạng thái thanh toán', '','Tổng số tiền','Loại thanh toán','Tổng số ghế ','Mã hóa đơn', 'Số điện thoại', 'khách hàng','Ngày tạo', '',''];
    //     console.log();


    //     if (dataBill.length > 0) {
    //         // Bắt đầu từ chỉ số 1 để bỏ qua cột 'STT'
    //         Object.keys(dataBill[0]).forEach((itemKey, index =0) => {
    //             if (!['id', "discount_code_id", 'seat_id', 'discount_code', 'user_id', 'total_money' , 'seat', 'user', 'tiket', 'ticket_order', 'updated_at' ,'email'].includes(itemKey)) {
    //                 columnsTemp.push({

    //                     title: title[index++],
    //                     dataIndex: itemKey,
    //                     key: itemKey,
    //                     render: (text: any, record: any) =>{
    //                         if(itemKey == "total_money"){
    //                             return <span key={record?.id}>{record?.total_money?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
    //                         }
    //                         if(itemKey == "total_money_after_discount"){
    //                             return <span key={record?.id}>{record?.total_money_after_discount?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
    //                         }
    //                         if(itemKey === "trip_id"){
    //                             const matchedTrip = trip?.find((trip: any) => trip?.id === record?.trip_id);
    //                             const time = matchedTrip?.start_time
    //                             const timetrip =  moment.utc(time).local().format('HH:mm')
    //                                 if (matchedTrip) {
    //                                     return <span>{`${matchedTrip.start_location} - ${matchedTrip.end_location} (khởi hành ${timetrip})`}</span>;
    //                                 }
    //                         }
    //                         if(itemKey === 'created_at'){
    //                             const time = record?.created_at
    //                             const timeCreate =  moment.utc(time).local().format('DD/MM/YYYY HH:mm:ss');
    //                             return <span>{timeCreate}</span>
    //                         }
    //                         if(itemKey === 'status_pay'){
    //                             const status = record?.status_pay
    //                             return <h3>{getStatusText(status)}</h3>
    //                         }
    //                         if(itemKey === 'type_pay'){
    //                             const typePay = record?.type_pay
    //                             const typeName = getTypePayName(typePay);
    //                             return <h3>{typeName}</h3>
    //                         }
    //                         return text
    //                     }
    //                 });
    //             }
    //         });
    //     }
    //     setColumn(columnsTemp);
    //     console.log(columnsTemp);
    // }, [dataBill]);



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
        // <div>
        //     <TemplateTable
        //         title={`Danh sách hóa đơn `}
        //         callBack={handelGetList}
        //         dataTable={dataBill}
        //         columnTable={column}
        //         // deleteFunc={deleteTrip}
        //         // createFunc={addTrip}
        //         dataId={fomatCustomCurrent}
        //         // changeFunc={updateTrip}
        //         formEdit={
        //             <Fragment>
        //                 <Form.Item label='Mã Hóa đơn' name='code_bill' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
        //                     <Input />
        //                 </Form.Item>
        //                 <Form.Item label='Chuyến đi' name='trip_id' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
        //                    <Input />
        //                 </Form.Item>
        //                 <Form.Item label='Khách hàng' name='discount_code_id' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
        //                     <Input />
        //                 </Form.Item>
        //                 <Form.Item label='Tổng chỗ ngồi' name='total_seat' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
        //                         <Input />
        //                 </Form.Item>
        //                 <Form.Item label='Mã ghế' name='seat_id' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
        //                         <Input />
        //                 </Form.Item>
        //                 <Form.Item label='Khách hàng' name='user_id' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
        //                     <Input />
        //                 </Form.Item>
        //                 <Form.Item label='Tổng tiền' name='total_money' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
        //                     <Input />
        //                 </Form.Item>
        //                 <Form.Item label='Tổng số tiền Hóa đơn' name='total_money_after_discount' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
        //                         <Input />
        //                 </Form.Item>
        //                 <Form.Item label='Tên khách hàng' name='full_name' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
        //                        <Input />
        //                 </Form.Item>
        //                 <Form.Item label='email' name='email' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
        //                        <Input />
        //                 </Form.Item>
        //             </Fragment>
        //         }
        //     />
        // </div >
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