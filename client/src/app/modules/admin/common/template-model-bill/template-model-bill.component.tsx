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
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedRoute, setSelectedRoute] = useState('')
    const [detailRecord, setDetailRecord] = useState<any>({})
    const [objectTicket, setObjectTicket] = useState<any>([])
    const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('')
    const [searchPhoneNumber, setSearchPhoneNumber] = useState('');
    const routes = [...new Set(dataTable.map((trip: any) => trip?.trip?.route?.name))]
    // console.log('objectTicket', objectTicket);
    // console.log('detailRecord', detailRecord);
    console.log('searchTerm', searchTerm);

    

    const paymentTypes = [
        { key: '0', name: 'VNP' },
        { key: '1', name: 'Mono' },
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
    const getStatusTicket = (status: any) => {
        if (status === 1) {
            return <h3 style={{ color: 'green' }}>Đã check vé </h3>;
        } else {
            return <h3 style={{ color: 'orange' }}>Chưa check</h3>;
        }
    };

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
            total_seat: record?.total_seat,
            phoneNumber : record?.phone_number,
        })
  
        const combinedTickets = record.ticket_order.map((ticket: any) => ({
            route: record?.trip?.route.name,
            codeSeat: ticket?.code_seat,
            price: record?.trip?.trip_price,
            quantity: 1,
            totalPrice: record?.total_money,
            codeTicket: ticket?.code_ticket,
            statusTicket: ticket?.status
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
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
      }
      const handleSearchPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchPhoneNumber(event.target.value)
      }
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
    const handlePaymentStatusChange = (value: string) => {
        if (value === '-- Trạng thái thanh toán --') {
          setSelectedPaymentStatus('')
        } else {
          setSelectedPaymentStatus(value)
        }
      }
      const handleRouteChange = (value: string) => {
        if (value === '-- Chọn tuyến đường --') {
          setSelectedRoute('')
        } else {
          setSelectedRoute(value)
        }
      }
      const filteredData = dataTable.filter((item: any) => {
        console.log(item);
        
        const paymentStatusText = item.status_pay === 1 ? 'Thanh toán thành công' : 'Chưa thanh toán'
        return (
          item.code_bill.includes(searchTerm) && 
          (selectedRoute === '' || item.trip?.route?.name === selectedRoute) &&
          (selectedPaymentStatus === '' || paymentStatusText === selectedPaymentStatus) &&
          item.phone_number.includes(searchPhoneNumber)
        //   (searchPhoneNumber === '' || item.phone?.phone_number.includes(searchPhoneNumber))
        )
      })
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
            render: (_:any, record:any) =>{
            return <span>{record?.trip?.route?.name ? record?.trip?.route?.name : ' tuyến đường không tồn tại'}</span>;
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
                    {
                        record?.status_pay === 0  ? (
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
                        ) : (
                            <div>

                            </div>

                        )
                    }
                    
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
            children: moment.utc(detailRecord?.created_at).local().format('DD/MM/YYYY HH:mm:ss') 
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
        {
            key: "8",
            label: "Số điện thoại",
            children: detailRecord?.phoneNumber
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
                return <div>{record.price ? record.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' }) : "Tuyến xe không tồn tại không thấy giá tiền"}</div>
            }
        },
        
        {
            title: 'Mã vé ghế',
            key: 'codeTicket',
            dataIndex: 'codeTicket',
            render: (_: any, record: any) => {
                return <div>{record?.codeTicket}</div>;
            },
        },
        {
            title: 'Trạng thái vé',
            key: 'statusTicket',
            dataIndex: 'statusTicket',
            render: (_: any, record: any) => {
                return <div>{getStatusTicket(record?.statusTicket)}</div>;
            },
        },
        {
            title: 'Tổng số tiền',
            key: 'totalPrice',
            dataIndex: 'totalPrice',
            colSpan: 1,
            render: (_: any, record: any, index: number) => {
                return {
                    children: <div>{record.totalPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>,
                    props: {
                        rowSpan: index === 0 ? objectTicket.length : 0,
                    },
                };
            },
        },
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
                    onChange={handleSearch as any}
                     />
                </div>
                <div className='px-3'>
                    <Input placeholder="Nhập số điện thoại người mua" onChange={handleSearchPhone as any} />
                </div>
                <div className='px-3'>
                <Select placeholder='-- Chọn tuyến đường --' onChange={handleRouteChange}>
                    <Option value='-- Chọn tuyến đường --' />
                    {routes.filter(Boolean).map((routeName: any , index: any) => (
                    <Option key={index} value={routeName}>
                        {routeName}
                    </Option>
                    ))}
                </Select>
                </div>
                <div className='px-3'>
                <Select className='w-[210px]' placeholder='-- Trạng thái thanh toán --' onChange={handlePaymentStatusChange}>
                    <Option value='-- Trạng thái thanh toán --' />
                    <Option value='Thanh toán thành công' />
                    <Option value='Chưa thanh toán' />
                </Select>
                </div>
            </div>
            <hr className='py-3' />
            <Table columns={columns} dataSource={filteredData} />
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