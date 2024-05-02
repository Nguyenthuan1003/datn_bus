import { Button, Descriptions, DescriptionsProps, Input, Modal, Popconfirm, Select, Table, message } from 'antd'
import { AnyObject } from 'antd/es/_util/type'
import { ColumnType } from 'antd/es/list'
import { time } from 'console'
import moment from 'moment-timezone'
import React, { FC, useState } from 'react'
import { MdDeleteForever } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { Option } from 'antd/es/mentions'
import { IoEyeSharp } from 'react-icons/io5'
import ButtonRadiusCompoennt from '~/app/component/parts/button/button.component'
import { Bill } from '~/app/modules/client/ticket-purchase-history/bill/common/template-model-bill/template-model-bill.component'
interface ITemplateModelBill {
  dataTable?: Bill[]
  title?: any
  deleteFunc?: any
  callBack?: any
}

const TemplateModelBill: FC<ITemplateModelBill> = ({ dataTable, title, deleteFunc, callBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [state, setState] = useState({})
  const [detailRecord, setDetailRecord] = useState<any>({})
  const [objectTicket, setObjectTicket] = useState<any>([])
  console.log('objectTicket', objectTicket)
  console.log('detailRecord', detailRecord)

  const paymentTypes = [
    { key: '0', name: 'VNP' },
    { key: '1', name: 'Thanh toán tại quầy' },
    { key: '2', name: 'Mono' }
  ]
  const getTypePayName = (typePayKey: any) => {
    const foundType = paymentTypes.find((type) => type.key === typePayKey)

    return foundType ? foundType?.name : 'Không xác định'
  }
  const getStatusText = (status: any) => {
    if (status === 1) {
      return <h3 style={{ color: 'green' }}>Thanh toán thành công</h3>
    } else {
      return <h3 style={{ color: 'red' }}>Chưa thanh toán</h3>
    }
  }
  console.log(dataTable)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRoute, setSelectedRoute] = useState('')
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('')
  const routes = [...new Set(dataTable.map((trip: any) => trip?.trip?.route?.name))]

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleRouteChange = (value: string) => {
    if (value === '-- Chọn tuyến đường --') {
      setSelectedRoute('')
    } else {
      setSelectedRoute(value)
    }
  }

  const handlePaymentStatusChange = (value: string) => {
    if (value === '-- Trạng thái thanh toán --') {
      setSelectedPaymentStatus('')
    } else {
      setSelectedPaymentStatus(value)
    }
  }

  const filteredData = dataTable.filter((item: any) => {
    const paymentStatusText = item.status_pay === 1 ? 'Thanh toán thành công' : 'Chưa thanh toán'
    return (
      item.code_bill.includes(searchTerm) &&
      (selectedRoute === '' || item.trip?.route?.name === selectedRoute) &&
      (selectedPaymentStatus === '' || paymentStatusText === selectedPaymentStatus)
    )
  })

  const trip = dataTable.map((trip: any) => trip?.trip)
  const route = trip.map((route: any) => route?.route)
  console.log('route', route)
  console.log('trip', trip)

  const showModal = (record: any) => {
    console.log(record)

    setIsModalOpen(true)
    setDetailRecord({
      code_bill: record?.code_bill,
      created_at: record?.created_at,
      type_pay: getTypePayName(record?.type_pay),
      status_pay: record?.status_pay,
      total_money: record?.total_money,
      total_money_after_discount: record?.total_money_after_discount,
      ticket_order: record?.ticket_order,
      trip: record?.trip,
      total_seat: record?.total_seat
    })
    const combinedTickets = record.ticket_order.map((ticket: any) => ({
      route: record?.trip?.route.name,
      codeSeat: ticket?.code_seat,
      price: record?.trip?.trip_price,
      quantity: 1,
      totalPrice: record?.total_money
    }))
    setObjectTicket(combinedTickets)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const onHandleSearch = async (value: any) => {
    try {
      const searchOptions: any = {
        bill_code: value.bill_code
      }
      setState(searchOptions)
    } catch (error) {
      console.log(error)
    }
  }
  const columns: any = [
    {
      title: 'Mã hoá đơn',
      key: 'code_bill',
      render: (_: any, record: any) => <div>{record?.code_bill}</div>
    },
    {
      title: 'Chuyến đi',
      key: 'trip_id',
      render: (_: any, record: any) => {
        return <span>{record?.trip?.route?.name}</span>
      }
    },
    {
      title: 'Trạng thái đơn hàng',
      key: 'status_pay',
      render: (_: any, record: any) => {
        const satusPay = record?.status_pay
        const typePay = getStatusText(satusPay)
        return <h3>{typePay}</h3>
      }
    },

    {
      title: 'Tổng số tiền',
      key: 'total_money',
      render: (_: any, record: any) => (
        <span key={record?.id}>
          {record?.total_money?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
        </span>
      )
    },

    {
      title: 'Ngày tạo',
      key: 'created_at',
      render: (_: any, record: any) => <div>{moment(record?.created_at).format('DD/MM/YYYY')}</div>
    },

    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: any) => (
        <div className='flex'>
          <IoEyeSharp
            onClick={() => showModal(record)}
            className='text-[23px] cursor-pointer text-green-500 hover:text-green-700 dark:hover:text-green-800 ml-4'
            style={{ cursor: 'pointer' }}
            title={`Chi tiết thông tin hóa đơn: ${record.id}`}
          />
        </div>
      )
    }
  ]
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Mã hóa đơn',
      children: detailRecord?.code_bill
    },
    {
      key: '2',
      label: 'Thời gian mua',
      children: detailRecord?.created_at
    },
    {
      key: '3',
      label: 'Số vé',
      children: detailRecord?.total_seat
    },
    {
      key: '4',
      label: 'Loại thanh toán',
      children: detailRecord?.type_pay
    },
    {
      key: '5',
      label: 'Trạng thái',
      children: getStatusText(detailRecord?.status_pay)
    }
  ]

  const columsTicket = [
    {
      title: 'Tuyến xe',
      key: 'route',
      dataIndex: 'route',
      render: (_: any, record: any, index: number) => {
        return {
          children: record.route ? record.route : ' Tuyến xe không tồn tại ',
          props: {
            rowSpan: index === 0 ? objectTicket.length : 0
          }
        }
      }
    },
    {
      title: 'Mã ghế',
      key: 'codeSeat',
      dataIndex: 'codeSeat',
      render: (_: any, record: any) => {
        return <div>{record.codeSeat}</div>
      }
    },
    {
      title: 'Giá vé',
      key: 'price',
      dataIndex: 'price',
      sorter: (a: any, b: any) => a.price - b.price,
      render: (_: any, record: any) => {
        return <div>{record.price ? record.price : 'Tuyến xe không tồn tại không thấy giá tiền'}</div>
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
            rowSpan: index === 0 ? objectTicket.length : 0
          }
        }
      }
    }
  ]

  return (
    <div>
      <div className='pb-4 text-[20px] font-semibold'>{title}</div>
      <div className='flex mb-4'>
        <div className='pr-5'>
          <Input placeholder='Nhập mã hoá đơn' onChange={handleSearch} />
        </div>
        <div className='px-5'>
          <Select placeholder='-- Chọn tuyến đường --' onChange={handleRouteChange}>
            <Option value='-- Chọn tuyến đường --' />
            {routes.filter(Boolean).map((routeName: string, index: number) => (
              <Option key={index} value={routeName}>
                {routeName}
              </Option>
            ))}
          </Select>
        </div>
        <div className='px-5'>
          <Select className='w-[210px]' placeholder='-- Trạng thái thanh toán --' onChange={handlePaymentStatusChange}>
            <Option value='-- Trạng thái thanh toán --' />
            <Option value='Thanh toán thành công' />
            <Option value='Chưa thanh toán' />
          </Select>
        </div>
      </div>
      <hr className='py-3' />

      <Table columns={columns} dataSource={filteredData} />
      <Modal title='' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
        <Descriptions title='THÔNG TIN HOÁ ĐƠN' items={items} />
        <div>
          <Table columns={columsTicket} dataSource={objectTicket} />
        </div>
      </Modal>
    </div>
  )
}

export default TemplateModelBill
