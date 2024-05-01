import React, { FC, useState } from 'react';
import { Flex, Form, Popconfirm, Popover, Progress, Table, message } from 'antd'
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineBrowserUpdated } from "react-icons/md";
import TemplateModal from '../template-model/template-model.component';
import { IoEyeSharp } from 'react-icons/io5';
import DetailComponent from './detail.component';
import dayjs from 'dayjs';
interface ITemplateTable {
    title: any,
    formEdit?: any,
    dataTable?: any,
    columnTable?: any
    deleteFunc?: any
    createFunc?: any
    callBack?: any
    changeFunc?: any
    dataId?: any
    buttonAdd?: any,
    formDetail?: any,
    dataDetail?: any,
    showAction?:any
}
const TemplateTableTrip: FC<ITemplateTable> = (
    {
        formEdit,
        dataTable,
        columnTable,
        deleteFunc,
        createFunc,
        callBack,
        changeFunc,
        title,
        dataId,
        buttonAdd,
        showAction

    }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [obJectDetail, setObjectDetail] = useState({})
    const [type, setType] = useState('CREATE')
    const [defaultValue, setDefaultValue] = useState<any>(null)
    const [form] = Form.useForm()
    const [detailRecord, setDetailRecord] = useState<any>()
    // const [selectedOption, setSelectedOption] = useState('week');
    const [showCustomDateInput, setShowCustomDateInput] = useState(false);
    const [selectedOptionType, setSelectedOptionType] = useState('fixed'); // Giá trị mặc định cho loại select là 'Ngày dựng sẵn'
    const [selectedOption, setSelectedOption] = useState('week');
    // const [current, setCurrent] = useState(null);
    // console.log(current)
    const showModal = (typeAction: string, recordTable?: any) => {
        setIsModalOpen(true);
        setType(typeAction)
        if (typeAction == "CHANGE") {
            console.log('CHANGE');
            setDefaultValue(recordTable)
            dataId(recordTable)
            form.setFieldsValue(recordTable)
        }
        else {
            form.resetFields()
        }

        if (typeAction == "DETAIL") {
            setDetailRecord(recordTable);
        }
    };

    const handleOk = () => {
        // if (form.getFieldValue('image')) {
        //     const dataList = [...form.getFieldValue('image')].map((item: any) => (console.log(item)))

        //     form.setFieldsValue({
        //       images: dataList
        //     })
        //   }
        if (type == 'CREATE') {
            form.validateFields().then((value: any) => {

                const data = {
                    ...value,
                    start_time: dayjs(value?.start_time).format('YYYY-MM-DD HH:mm:ss')
                }
                createFunc(data)
                    .then((res: any) => {
                        if (res.data.status == "success") {
                            callBack(res.data)
                            message.success(res.data.message)
                            console.log(res);
                        } else {
                            message.error(res.data.message)
                        }

                    })
                form.resetFields()
            })
        }

        if (type === 'CHANGE') {
            console.log('change');

            form.validateFields().then((value: any) => {
                // Kiểm tra xem dữ liệu có thay đổi hay không
                const isDataChanged = Object.keys(value).some(key => value[key] !== defaultValue[key]);
                if (isDataChanged) {
                    // Nếu có thay đổi, thực hiện cập nhật
                    changeFunc(value, defaultValue.id).then((res: any) => {
                        if (res?.data?.status == "success") {
                            callBack(res.data);
                            message.success('Cập nhật thành công');
                            console.log('value', value);
                        } else {
                            message.error(res.data.message)
                        }
                    });
                } else {
                    // Nếu không có thay đổi, hiển thị thông báo
                    message.warning('Cập nhật không có thay đổi');
                }
                form.resetFields();
            });
        }


        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const cancel = (e: any) => {
        message.info('huỷ xoá');
    };
    const confirmDelete = (itemId: any) => {
        deleteFunc(itemId).then((res: any) => {
            if (res) {
                callBack(res.data)
                message.success('xoá thành công');
            }
            else {
                message.error('xoá thất bại');
            }
        })
    };
    const sortedDataTable = [...dataTable];
    const sortRate = sortedDataTable.sort((a, b) => {
        // Sắp xếp theo giá trị fill_rate, từ lớn đến bé
        if (a.fill_rate !== b.fill_rate) {
            return b.fill_rate - a.fill_rate;
        }
        // Nếu fill_rate bằng nhau, sắp xếp theo giá trị fill_pending_rate, từ lớn đến bé
        if (a.fill_pending_rate !== b.fill_pending_rate) {
            return b.fill_pending_rate - a.fill_pending_rate;
        }
        // Nếu cả fill_rate và fill_pending_rate đều bằng nhau, sắp xếp theo fill_unbooked_rate, từ lớn đến bé
        return b.fill_unbooked_rate - a.fill_unbooked_rate;
    });
    const content = (
        <div>
          <div className=''><div className='w-[10px] h-[10px] bg-green-600'></div> Ghế đã đặt và thanh toán </div>
          <div className=''><div className='w-[10px] h-[10px] bg-amber-500'></div>Ghế chưa thanh toán</div>
          <div className=''><div className='w-[10px] h-[10px] bg-red-500'></div>Ghế còn trống </div>

        </div>
      );
    const columns: any = [
        {
            title: 'STT', // Tiêu đề cột số thứ tự
            dataIndex: 'stt', // Khai báo dataIndex, giá trị này sẽ được sử dụng trong render
            render: (text: any, record: any, index: number) => {
                return index + 1; // Sử dụng index để tạo số thứ tự, bắt đầu từ 1
            },
        },
        ...columnTable,
        {
            title: 'Tỉ lệ', // Tiêu đề cột số thứ tự
            dataIndex: 'fill_pending_rate', // Khai báo dataIndex, giá trị này sẽ được sử dụng trong renderr
            sorter:(a: any, b: any) => a.fill_rate - b.fill_rate,
            render: (text: any, record: any, index: number) => {
                return <div>
                     <Popover content={content} title="Chú thích">
                     <Flex vertical gap="small" style={{ width: 180 }}>
                        <Progress percent={record.fill_rate.toFixed(0)} status="active" strokeColor={'#32CD32'} />
                        <Progress percent={record.fill_pending_rate.toFixed(0)} strokeColor={'#FFD700'} title={`Fill Pending Rate: ${record.fill_pending_rate.toFixed(0)}%`}  />
                        <Progress percent={record.fill_unbooked_rate.toFixed(0)}  status="exception" />
                    </Flex>
                     </Popover>
             
                </div>
            },
        },
        {
            title: 'Thao tác',
            key: "action",
            render: (_: any, record: any) => {
                return (
                    <div className='flex'>
                        
                        {
                            showAction && (
                                <div className='px-2'>
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
                        </div>
                            )
                        }

                        {
                            showAction && (
                                <div className='px-2'>
                                <button
                                    className='text-[23px] text-blue-600' onClick={() => showModal('CHANGE', record)}
                                    title={`Cập nhật Truyến đi : ${record.route.name}`}
                                >
                                    <MdOutlineBrowserUpdated />
                                </button>
                            </div>
                            )
                        }

                        <div className='px-2'>
                            <IoEyeSharp
                                onClick={() => showModal('DETAIL', record)}
                                className='text-[23px] cursor-pointer text-green-500 hover:text-green-700 dark:hover:text-green-800 '
                                style={{ cursor: 'pointer' }}
                                title={`Chi tiết chuyến đi: ${record.id}`}
                            />
                        </div>

                    </div>
                )
            }
        },
    ];



    // const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    //     console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    //     setSelectedRowKeys(newSelectedRowKeys);
    // };

    // const rowSelection = {
    //     selectedRowKeys,
    //     onChange: onSelectChange,
    // };
    // const handleSelectChange = (value:any) => {
    //     setSelectedOption(value);
    //     setShowCustomDateInput(value);
    //     if (value === '2') {
    //         setShowCustomDateInput(true);
    //       } else {
    //         setShowCustomDateInput(false);
    //       }
    // };

    return (
        <div>
            <div className='pb-4 text-[20px] font-semibold'>
                {title}
            </div>
            {buttonAdd && (
                <button className='p-3 bg-success text-white w-[150px] text-center font-medium rounded-md' onClick={() => showModal('CREATE')}>
                    Thêm mới +
                </button>
            )}
                 {/* <button className='p-3 bg-success text-white w-[150px] text-center font-medium rounded-md' onClick={() => showModal('CREATE')}>
                    Thêm mới +
                </button>
        */}
            <Table  columns={columns} dataSource={dataTable} />
            <div className=''>
                <TemplateModal
                    title={type === "CREATE" ? 'Thêm mới' : type === "CHANGE" ? 'Cập nhật' : 'Chi tiết'} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel}
                    actionType={type}
                >
                    {
                        type == 'DETAIL' ? (
                            <div>
                                {/* <Descriptions title="THÔNG TIN XE " items={items} /> */}
                                {/* <DetailForm onRef={(ref) => this.onRef(ref)}/> */}
                                <DetailComponent data={detailRecord} />
                            </div>
                        ) : (
                            <Form form={form} layout='vertical' name='form_in_modal'>
                                {formEdit}
                            </Form>
                        )
                    }

                </TemplateModal>

            </div>
        </div>
    )
}

export default TemplateTableTrip