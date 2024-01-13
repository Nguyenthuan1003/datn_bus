import React, { FC, useState } from 'react';
import { Form, message, Popconfirm, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineBrowserUpdated } from "react-icons/md";
import TemplateModal from '../template-model/template-model.component';

interface ITemplateTable {
    formEdit?: any
}
    

const TemplateTable:FC<ITemplateTable> = ({formEdit}) => {
    const [selectedRowKeys,setSelectedRowKeys] = useState<React.Key[]>([])
    const [isModalOpen, setIsModalOpen ] = useState(false)
    const [form] = Form.useForm()
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const cancel = (e: any) => {
        console.log(e);
        message.error('Click on No');
    };
    const confirm = (e: any) => {
        console.log(e);
        message.success('Click on Yes');
    };
    const columns: ColumnsType<any> = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Thao tác',
            key: "action",
            render: (_, record: any) => {
                return (
                    <div className='flex'>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        ><button className='text-[23px] text-red-600'>
                                <MdDeleteForever />
                            </button>
                        </Popconfirm>

                        <div className='px-6'>
                            <button className='text-[23px] text-blue-600'>
                                <MdOutlineBrowserUpdated />
                            </button>
                        </div>
                    </div>
                )
            }
        },
    ];

    const data: any = [];
    for (let i = 0; i < 5; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
        });
    }


    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
  return (
    <div>
        <div className='pb-4 text-[20px] font-semibold'>
                Danh sách người dùng
            </div>
            <hr className='py-3' />
            <div className='p-3 bg-success text-white w-[150px] text-center font-medium rounded-md' onClick={showModal}>
                Thêm mới +
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            <div className=''>
                <TemplateModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel}>
                    <Form form={form} layout='vertical' name='form_in_modal'>
                        {formEdit}
                    </Form>
                </TemplateModal>
            </div>

    </div>
  )
}

export default TemplateTable