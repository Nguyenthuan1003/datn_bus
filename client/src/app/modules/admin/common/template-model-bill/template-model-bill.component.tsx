import { Button, Descriptions, DescriptionsProps, Input, Modal, Popconfirm, Select, Table, message } from 'antd'
import { AnyObject } from 'antd/es/_util/type';
import { ColumnType } from 'antd/es/list';
import { time } from 'console';
import moment from 'moment-timezone';
import React, { FC, useState } from 'react'
import { MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Option } from 'antd/es/mentions';
import { IoEyeSharp } from "react-icons/io5";
interface ITemplateModelBill {
    dataTable?: any
    title?: any
    deleteFunc?: any;
    callBack?: any
}
const TemplateModelBill: FC<ITemplateModelBill> = ({ dataTable, title, deleteFunc, callBack }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [state, setState] = useState({});
    const [detailRecord, setDetailRecord] = useState<any>({})
    const [objectTicket, setObjectTicket] = useState<any>([])
    console.log('objectTicket', objectTicket);
    console.log('detailRecord', detailRecord);

    

    const paymentTypes = [
        { key: '0', name: 'VNP' },
        { key: '1', name: 'Thanh toán tại quầy' },
        { key: '2', name: 'Mono' }
    ];
    const getTypePayName = (typePayKey: any) => {
        const foundType = paymentTypes.find(type => type.key === typePayKey);;
        
        // console.log('foundType', foundType);
        return foundType ? foundType?.name : 'Không xác định';
    };
    const getStatusText = (status: any) => {
        if (status === 1) {
            return <h3 style={{ color: 'green' }}>Thanh toán thành công</h3>;
        } else {
            return <h3 style={{ color: 'red' }}>Chưa thanh toán</h3>;
        }
    };
    console.log(dataTable);

    const trip = dataTable.map((trip: any) => trip?.trip)
    const route = trip.map((route: any) => route?.route)
    console.log('route', route);
    console.log('trip', trip);



    const showModal = (record: any) => {
        console.log(record)

        setIsModalOpen(true);
        setDetailRecord({
            code_bill: record?.code_bill,
            created_at: record?.created_at,
            full_name: record?.full_name,
            email: record?.email,
            type_pay: getTypePayName(record?.type_pay),
            status_pay: record?.status_pay,
            total_money: record?.total_money,
            total_money_after_discount: record?.total_money_after_discount,
            ticket_order: record?.ticket_order,
            trip: record?.trip,
            total_seat: record?.total_seat
        })
        // setObjectTicket([
        //     { 
        //       route: record?.trip?.route?.name,
        //       ticket_order: record?.ticket_order?.map((item: any) => item?.code_ticket).join(', ') // lấy ra mã ticket từ mảng ticket_order và nối chúng thành một chuỗi
        //     }
        //   ]);
        const combinedTickets = record.ticket_order.map((ticket: any) => ({
            route: record?.trip?.route.name,
            codeSeat: ticket?.code_seat,
            price: record?.trip?.trip_price,
            quantity: 1,
            totalPrice: record?.total_money,
            phoneNumber : record?.phone_number
        }));
        setObjectTicket(combinedTickets);


    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const confirmDelete = (itemId: any) => {
        deleteFunc(itemId).then((res: any) => {
            if (res) {
                callBack(res.data.message)
                message.success('xoá thành công');
            }
            else {
                message.error('xoá thất bại');
            }
        })
    };
    const cancel = (e: any) => {
        message.info('huỷ xoá');
    };
    const onHandleSearch = async (value: any) => {
        try {
            const searchOptions: any = {
                bill_code: value.bill_code,
            }
            setState(searchOptions);
        } catch (error) {
            console.log(error);
        }
    }
    const columns: any = [
        {
            title: 'Mã hoá đơn',
            key: 'code_bill',
            render: (_: any, record: any) => (
                <div>{record?.code_bill}</div>
            )
        },
        {
            title: 'Chuyến đi',
            key: 'trip_id',
            // render: (_: any, record: any) => {
            //     const matchedTrip = trip?.find((trip: any) => trip?.id === record?.trip_id);
            //     const matchedRoute = route?.find((route: any) => route?.id)
            //     const routeName = matchedRoute?.name
            //     console.log('route',matchedRoute);
                
            //     console.log('matchedRoute', matchedRoute);

            //     const time = matchedTrip?.start_time

            //     const timetrip = moment.utc(time).local().format('HH:mm')
            //     if (!matchedTrip) {
            //         return <span>Tuyến đường không tồn tại </span>
            //     }else{
            //         return <span>
            //         {/* {`${matchedTrip.start_location} - ${matchedTrip.end_location} (khởi hành)`} */}
            //         {routeName ? routeName  : " Tuyền đường không còn tồn tại"}  {timetrip}
            //     </span>;
            //     }
            // }
            render: (_:any, record:any) =>{
            return <span>{record?.trip.route.name}</span>;
            }
        },
        {
            title: 'Trạng thái đơn hàng',
            key: 'status_pay',
            render: (_: any, record: any) => {
                const satusPay = record?.status_pay
                const typePay = getStatusText(satusPay);
                return <h3>{typePay}</h3>
            }
        },
        {
            title: 'Loại Thanh toán',
            key: 'type_pay',
            render: (_: any, record: any) => {
                const typePay = record?.type_pay
                const typeName = getTypePayName(typePay);
                return <h3>{typeName}</h3>
            }
        },

        {
            title: 'Tổng số tiền',
            key: 'total_money',
            render: (_: any, record: any) => (
                <span key={record?.id}>{record?.total_money?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
            )
        },
        {
            title: 'Số điện thoại',
            key: 'phone_number',
            render: (_: any, record: any) => (
                <div>{record?.phone_number}</div>
            )
        },
        {
            title: 'Tên người mua',
            key: 'full_name',
            render: (_: any, record: any) => (
                <div>{record?.full_name}</div>
            )
        },
        {
            title: 'Ngày tạo',
            key: 'created_at',
            render: (_: any, record: any) => {
                const time = record?.created_at
                const timeCreate = moment.utc(time).local().format('DD/MM/YYYY HH:mm:ss');
                return (<div>{timeCreate}</div>)
            }

        },

        {
            title: 'Hành động',
            key: 'action',
            render: (_: any, record: any) => (
                <div className='flex'>
                    <Popconfirm
                        title="xác nhận xoá"
                        description="bạn có chắc chắn muốn xoá không ?"
                        onConfirm={() => confirmDelete(record.id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >       <button
                        className='text-[23px] text-red-600'
                        title={`Xoá theo ID: ${record.id}`}
                    >
                            <MdDeleteForever />
                            
                        </button>
                    </Popconfirm>
                    <IoEyeSharp 
                        onClick={() => showModal(record)}
                        className= 'text-[23px] cursor-pointer text-green-500 hover:text-green-700 dark:hover:text-green-800 ml-4'
                        style={{ cursor:'pointer' }}
                        title={`Chi tiết thông tin hóa đơn: ${record.id}`}
                    />
                
                </div>

            )
        }
    ]
    const items: DescriptionsProps['items'] = [
        {
            key: "1",
            label: "Mã hóa đơn",
            children: detailRecord?.code_bill
        },
        {
            key: "2",
            label: "Tên khách hàng",
            children: detailRecord?.full_name
        },
        {
            key: "3",
            label: "Email",
            children: detailRecord?.email
        },
        {
            key: "4",
            label: "Thời gian mua",
            children: detailRecord?.created_at
        },
        {
            key: "5",
            label: "Số vé",
            children: detailRecord?.total_seat
        },
        {
            key: "6",
            label: "Loại thanh toán",
            children: detailRecord?.type_pay
        },
        {
            key: "7",
            label: "Trạng thái",
            children: getStatusText(detailRecord?.status_pay)
        },

    ]

    const columsTicket = [
        {
            title: 'Tuyến xe',
            key: 'route',
            dataIndex: 'route',
            render: (_: any, record: any, index: number) => {
                return {
                    children: record.route ? record.route : " Tuyến xe không tồn tại ",
                    props: {
                        rowSpan: index === 0 ? objectTicket.length : 0,
                    },
                };
            },
        },
        {
            title: 'Mã ghế',
            key: 'codeSeat',
            dataIndex: 'codeSeat',
            render: (_: any, record: any) => {
                return <div>{record.codeSeat}</div>;
            },
        },
        {
            title: 'Giá vé',
            key: 'price',
            dataIndex: 'price',
            sorter: (a: any, b: any) => a.price - b.price,
            render: (_: any, record: any) => {
                return <div>{record.price ? record.price : "Tuyến xe không tồn tại không thấy giá tiền"}</div>
            }
        },
        {
            title: 'Tổng số tiền',
            key: 'totalPrice',
            dataIndex: 'totalPrice',
            colSpan: 1,
            render: (_: any, record: any, index: number) => {
                return {
                    children: <div>{record.totalPrice}</div>,
                    props: {
                        rowSpan: index === 0 ? objectTicket.length : 0,
                    },
                };
            },
        },
        // {
        //     title: '', // Để trống vì cột "Tổng số tiền" sẽ chiếm cả cột "Giá vé"
        //     key: 'empty',
        //     dataIndex: 'empty',
        //     render: () => null, // Đảm bảo không có gì được hiển thị trong ô này
        // },
    ]

    return (
        <div>
            <div className='pb-4 text-[20px] font-semibold'>
                {title}
            </div>
            <div className='flex mb-4'>
                <div>
                    <Input 
                    placeholder="Nhập mã hoá đơn"
                    onSubmit={onHandleSearch as any}
                     />
                </div>
                <div className='px-3'>
                    <Input placeholder="Nhập số điện thoại người mua" />
                </div>
                <div className='px-3'>
                  <Select placeholder="-- Chọn tuyến đường --">
                    <Option value="1"/>
                  </Select>
                </div>
                <div className='px-3'>
                  <Select placeholder="-- Loại thanh toán --">
                    <Option value="1"/>
                  </Select>
                </div>

                <div className='px-3'>
                  <Select placeholder="-- Trạng thái thanh toán --">
                    <Option value="1"/>
                  </Select>
                </div>
            </div>
            <hr className='py-3' />
            <Table columns={columns} dataSource={dataTable} />
            <Modal title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
                <Descriptions title="THÔNG TIN HOÁ ĐƠN" items={items} />
                <div>
                    <Table columns={columsTicket} dataSource={objectTicket} />
                </div>
            </Modal>
        </div>
    )
}

export default TemplateModelBill