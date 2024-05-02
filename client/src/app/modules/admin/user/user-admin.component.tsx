import { Form, Input, Select, Space, Upload } from 'antd'
import { Option } from 'antd/es/mentions'
import { Fragment, useEffect, useState } from 'react'
import TemplateTableUser from '../common/template-table-user/template-table-user.component'
import { getAllType } from '../type-user/service/type-user.service'
import { addUser, deleteUser, getAllUser, updateUser } from './service/user-admin.service'
import { BounceLoader } from 'react-spinners'

const UserAdminComponent = () => {
  const [column, setColumn] = useState<any>([])
  const [dataUser, setDataUser] = useState<any>([])
  const [dataParentType, setDataParentType] = useState<any>([])
  const [current, setCurrent] = useState<any>(true)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllType().then((res) => {
      if (res) {
        setDataParentType(res.data?.typeUsers)
        setLoading(false);
      }
    })
  }, [])
  useEffect(() => {
    const columsTemp: any = []
    const title = ['STT', 'email', 'tên', 'số điện thoại', 'địa chỉ', 'mô tả', 'avatar', 'vai trò']
    if (dataUser && dataUser.length > 0) {
      Object.keys(dataUser[0]).forEach((itemKey, key = 0) => {
        if (!['id', 'role_id', 'password', 'location', 'created_at', 'updated_at'].includes(itemKey)) {
          columsTemp.push({
            title: title[key++],
            dataIndex: itemKey,
            key: itemKey,
            render: (text: any, record: any, index: any) => {
              if (itemKey === 'user_type_id') {
                const ParentType = dataParentType.find((parent: any) => parent.id === text)
                return <h2>{ParentType ? ParentType.name : 'Chưa phân loại'}</h2>
              }
              if (itemKey === 'avatar') {
                return <img src={`http://172.20.10.7:8000/${text}`} alt='avatar' style={{ width: '50px', height: '50px' }} />;
              }
              return text
            }
          })
        }
      })
    }
    setColumn(columsTemp)
  }, [dataUser])

  const [reset, setReset] = useState<any>([])
  useEffect(() => {
    getAllUser().then((res) => {
      if (res) {
        setDataUser(res?.data?.uesrs)
        setLoading(false);
      }
    })
  }, [reset])

  const handelGetList = () => {
    setReset(!reset)
    setIsEditing(false)
  }

  const fomatCustomCurrent = (data: any) => {
    setCurrent(data)
    setIsEditing(true)
  }
  return (
    <div>
     {loading ? (
        <BounceLoader
          color="#36d7b7"
          style={{position: "absolute", top: "50%", left: "54%"}}
        />
      ) : (
      <TemplateTableUser
        title={`Danh sách thành viên `}
        callBack={handelGetList}
        dataTable={dataUser}
        columnTable={column}
        deleteFunc={deleteUser}
        dataId={fomatCustomCurrent}
        createFunc={addUser}
        changeFunc={updateUser}
        formEdit={
          <Fragment>
            <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
              <Input />
            </Form.Item>

            <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
              <Input />
            </Form.Item>

            {!isEditing && (
              <Form.Item
                label='Password'
                name='password'
                rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}
              >
                <Input />
              </Form.Item>
            )}

            <Form.Item
              label='Số điện thoại'
              name='phone_number'
              rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label='Mô tả' name='description' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
              <Input />
            </Form.Item>

            <Form.Item label='Vị trí' name='location' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
              <Input />
            </Form.Item>

            <Form.Item label='Địa chỉ' name='address' rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label='Khách hàng'
              name='user_type_id'
              rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}
            >
              <Select placeholder='lựa chọn trạng thái'>
                {dataParentType?.map((item: any, index: any) => (
                  <Option value={item?.id} key={item?.id}>
                    {item?.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Fragment>
        }
      />
      )}
    </div>
  )
}

export default UserAdminComponent
