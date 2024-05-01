import React, { FC, useState } from 'react'
import { Form, message, Popconfirm, Table, Button, Upload } from 'antd'
import { MdDeleteForever } from 'react-icons/md'
import { MdOutlineBrowserUpdated } from 'react-icons/md'
import { UploadOutlined } from '@ant-design/icons'
import TemplateModal from '../template-model/template-model.component'

interface ITemplateTableUser {
  title: any
  formEdit?: any
  dataTable?: any
  columnTable?: any
  deleteFunc?: any
  createFunc?: any
  callBack?: any
  changeFunc?: any
  dataId?: any
}
const TemplateTableUser: FC<ITemplateTableUser> = ({
  formEdit,
  dataTable,
  columnTable,
  deleteFunc,
  createFunc,
  callBack,
  changeFunc,
  title,
  dataId
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [type, setType] = useState('CREATE')
  const [defaultValue, setDefaultValue] = useState<any>(null)
  const [form] = Form.useForm()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  // const [current, setCurrent] = useState(null);
  // console.log(current)
  const showModal = (typeAction: string, recordTable?: any) => {
    setIsModalOpen(true)
    setType(typeAction)
    if (typeAction == 'CHANGE') {
      setDefaultValue(recordTable)
      console.log(recordTable)
      dataId(recordTable)
      form.setFieldsValue(recordTable)
    } else {
      form.resetFields()
      setSelectedFile(null) // Reset selected file when opening the modal
    }
  }

  const handleOk = () => {
    if (type == 'CREATE') {
      form.validateFields().then((value: any) => {
        value.role_id = value.user_type_id
        const formData = new FormData()
        Object.keys(value).forEach((key) => {
          formData.append(key, value[key])
        })
        if (selectedFile) {
          formData.append('avatar', selectedFile)
        }
        createFunc(formData).then((res: any) => {
          if (res) {
            callBack(res.data)
            message.success('thêm thành công')
          }
        })
        form.resetFields()
      })
    }

    if (type === 'CHANGE') {
      form.validateFields().then((value: any) => {
        // Kiểm tra xem dữ liệu có thay đổi hay không
        value.role_id = value.user_type_id
        const isDataChanged = Object.keys(value).some((key) => value[key] !== defaultValue[key])
        if (isDataChanged || selectedFile) {
          // Check if data or file has changed
          // Nếu có thay đổi, thực hiện cập nhật
          const formData = new FormData()
          Object.keys(value).forEach((key) => {
            if (key !== 'avatar' || selectedFile) {
              // Only append 'avatar' if a new file was selected
              formData.append(key, value[key])
            }
          })
          if (selectedFile) {
            formData.append('avatar', selectedFile)
          }
          changeFunc(formData, defaultValue.id).then((res: any) => {
            if (res) {
              console.log(value)

              callBack(res.data)
              message.success('Cập nhật thành công')
            }
          })
        } else {
          // Nếu không có thay đổi, hiển thị thông báo
          message.warning('Cập nhật không có thay đổi')
        }
        form.resetFields()
        setSelectedFile(null) // Reset selected file after updating
      })
    }

    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const cancel = (e: any) => {
    message.info('huỷ xoá')
  }
  const confirmDelete = (itemId: any) => {
    deleteFunc(itemId).then((res: any) => {
      if (res) {
        callBack(res.data)
        message.success('xoá thành công')
      } else {
        message.error('xoá thất bại')
      }
    })
  }
  const columns: any = [
    {
      title: 'STT', // Tiêu đề cột số thứ tự
      dataIndex: 'stt', // Khai báo dataIndex, giá trị này sẽ được sử dụng trong render
      render: (text: any, record: any, index: number) => {
        return index + 1 // Sử dụng index để tạo số thứ tự, bắt đầu từ 1
      }
    },
    ...columnTable,
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => {
        return (
          <div className='flex'>
            <Popconfirm
              title='xác nhận xoá'
              description='bạn có chắc chắn muốn xoá không ?'
              onConfirm={() => confirmDelete(record.id)}
              onCancel={cancel}
              okText='Yes'
              cancelText='No'
            >
              {' '}
              <button className='text-[23px] text-red-600' title={`Xoá theo ID: ${record.id}`}>
                <MdDeleteForever />
              </button>
            </Popconfirm>

            <div className='px-6'>
              <button
                className='text-[23px] text-blue-600'
                onClick={() => showModal('CHANGE', record)}
                title={`Cập nhật tên tỉnh : ${record.name}`}
              >
                <MdOutlineBrowserUpdated />
              </button>
            </div>
          </div>
        )
      }
    }
  ]

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  return (
    <div>
      <div className='pb-4 text-[20px] font-semibold'>{title}</div>
      <hr className='py-3' />
      <button
        className='p-3 bg-success text-white w-[150px] text-center font-medium rounded-md'
        onClick={() => showModal('CREATE')}
      >
        Thêm mới +
      </button>
      <Table rowSelection={rowSelection} columns={columns} dataSource={dataTable} />
      <div className=''>
        <TemplateModal
          title={type === 'CREATE' ? 'Thêm mới' : 'Cập nhập'}
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        >
          <Form form={form} layout='vertical' name='form_in_modal'>
            {formEdit}
            {type === 'CREATE' && (
              <Form.Item label='Avatar' name='avatar'>
                <Upload
                  beforeUpload={(file) => {
                    setSelectedFile(file) // Save the selected file
                    return false // Prevent the upload from being handled automatically
                  }}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            )}
          </Form>
        </TemplateModal>
      </div>
    </div>
  )
}

export default TemplateTableUser
