import React, { FC, useState } from 'react';
import { Form, message, Popconfirm, Table } from 'antd';
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineBrowserUpdated } from "react-icons/md";
import TemplateModal from '../template-model/template-model.component';

interface ITemplateTable {
    title:any,
    formEdit?: any,
    dataTable?:any,
    columnTable?:any
    deleteFunc?:any
    createFunc?:any
    callBack?:any
    changeFunc?:any
}
const TemplateTable:FC<ITemplateTable> = (
    {
    formEdit,
    dataTable,
    columnTable,
    deleteFunc,
    createFunc,
    callBack,
    changeFunc,
    title
     }) => {
    const [selectedRowKeys,setSelectedRowKeys] = useState<React.Key[]>([])
    const [isModalOpen, setIsModalOpen ] = useState(false)
    const [type,setType]=useState('CREATE')
    const [defaultValue,setDefaultValue]=useState<any>(null)
    const [form] = Form.useForm()
    const showModal = (typeAction: string, recordTable?: any) => {
        setIsModalOpen(true);
        setType(typeAction)
        if(typeAction=="CHANGE"){
            setDefaultValue(recordTable)
            form.setFieldsValue(recordTable)
        }
        else{
            form.resetFields()
        }
    };

    const handleOk = () => {
        if(type=='CREATE'){
            form.validateFields().then((value:any)=>{
                createFunc(value).then((res:any)=>{
                    if(res){
                        callBack(res.data)
                       message.success("thêm thành công") 
                    }      
                })
                form.resetFields()
             } )
        }

        if(type=='CHANGE'){
            form.validateFields().then((value:any)=>{
                changeFunc(value,defaultValue.id).then((res:any)=>{
                    if(res){
                        callBack(res.data)
                       message.success("cập nhật thành công") 
                    }            
                })
             form.resetFields()})
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
        deleteFunc(itemId).then((res:any)=>{
            if(res){
                 callBack(res.data)
                message.success('xoá thành công');
            }
            else{
                message.error('xoá thất bại');  
            }
        }) 
    };
    const columns:any = [
       ...columnTable,
        {
            title: 'Thao tác',
            key: "action",
            render: (_:any, record: any) => {
                return (
                    <div className='flex'>
                        <Popconfirm
                            title="xác nhận xoá"
                            description="bạn có chắc chắn muốn xoá không ?"
                            onConfirm={()=>confirmDelete(record.id)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        ><button className='text-[23px] text-red-600'>
                                <MdDeleteForever />
                            </button>
                        </Popconfirm>

                        <div className='px-6'>
                            <button className='text-[23px] text-blue-600'onClick={() => showModal('CHANGE', record)}>
                                <MdOutlineBrowserUpdated />
                            </button>
                        </div>
                    </div>
                )
            }
        },
    ];



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
                {title}
            </div>
            <hr className='py-3' />
            <div className='p-3 bg-success text-white w-[150px] text-center font-medium rounded-md' onClick={()=>showModal('CREATE')}>
                Thêm mới +
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={dataTable} />
            <div className=''>
                <TemplateModal title={title} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel}>
                    <Form form={form} layout='vertical' name='form_in_modal'>
                        {formEdit}
                    </Form>
                </TemplateModal>
            </div>
    </div>
  )
}

export default TemplateTable