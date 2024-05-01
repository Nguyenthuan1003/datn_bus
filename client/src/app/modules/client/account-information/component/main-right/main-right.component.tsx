import { Button, Form, Input, Modal, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { axiosFormData } from '~/app/api/confighHTTp'

const MainRight = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false)
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true')
  const [form] = Form.useForm()
  const formRef = useRef<FormInstance>(null)

  const handleUpdateClick = () => {
    setUserData(user)
    setPreviewImage(`${isLoggedIn ? url : 'http://'}${user?.avatar}`)
    setUpdateFormVisible(true)
  }

  const handleOk = async () => {
    formRef.current?.submit()
  }

  const handleCancel = () => {
    setUpdateFormVisible(false)
  }

  useEffect(() => {
    if (userData) {
      form.setFieldsValue(userData)
    }
  }, [userData])

  const onFinish = async () => {
    try {
      setIsLoading(true)
      const userFromStorage = JSON.parse(localStorage.getItem('user') || '{}')
      const formData = new FormData()
      Object.keys(userData).forEach((key) => {
        formData.append(key, userData[key])
      })
      formData.append('id', userFromStorage.id)
      const response = await axiosFormData.post('/user/update2', formData)
      if (response.status === 200) {
        setUser(response.data.user)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('isLoggedIn', 'true')
        setIsLoggedIn(true)
        setUpdateFormVisible(false)
        setIsLoading(false)
        message.success('Cập nhật thông tin thành công!')
        setTimeout(() => {
          window.location.reload()
        }, 300)
      }
    } catch (error) {
      setIsLoading(false)
      message.error('Cập nhật thông tin thất bại')
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setUserData((prevState) => ({ ...prevState, avatar: file }))
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setUserData((prevState) => ({ ...prevState, [name]: value }))
  }

  const url = 'http://192.168.1.7:8000/'

  return (
    <div>
      <h2 className='font-medium text-[23px]'>Thông tin tài khoản</h2>
      <div className='text-gray-500 mt-2 text-[13px] font-normal sm:text-[15px]'>
        Quản lý thông tin hồ sơ để bảo mật tài khoản
      </div>

      <div className='mt-6 rounded-2xl border p-6'>
        <div className='flex'>
          <div className='w-[30%]'>
            <div className='flex justify-start sm:justify-center'>
              <img
                src={`${isLoggedIn ? url : 'http://'}${user?.avatar}`}
                alt=''
                className='h-[100px] min-w-[100px] rounded-full object-cover sm:h-[200px] sm:w-[200px]'
              />
            </div>
            {/* <div className='text-center mt-4'>
              <Upload>
                {' '}
                <button className='border border-gray-400 rounded-xl px-6 py-3'>Chọn ảnh</button>
              </Upload>
              <p>Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG</p>
            </div> */}
          </div>

          <div className='px-16'>
            <p>
              Họ và tên: <b className='px-7'>{user.name}</b>
            </p>
            <p className='py-6'>
              Số điện thoại: <b className='px-2'>{user.phone_number}</b>
            </p>
            <p className=''>
              Email: <b className='px-7'>{user.email}</b>
            </p>
            <p className='py-6'>
              Địa chỉ: <b className='px-7'>{user.address}</b>
            </p>
            <p>
              Mô tả: <b className='px-7'>{user.description}</b>
            </p>

            <div className='text-center mt-4'>
              <button
                className='border-[1.5px] py-[6px] px-5 rounded-[10px] text-white bg-blue-600'
                onClick={handleUpdateClick}
              >
                {' '}
                Cập nhật{' '}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title='Cập nhật thông tin'
        visible={isUpdateFormVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={450}
        centered
        footer={
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Button type='primary' onClick={handleOk}>
              Cập nhật
            </Button>
            <Button onClick={handleCancel} style={{ width: '90px' }}>
              Hủy
            </Button>
          </div>
        }
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Form
            form={form}
            ref={formRef}
            initialValues={userData}
            onFinish={onFinish}
            onValuesChange={(changedValues, allValues) => setUserData(allValues)}
            style={{
              border: '1px solid white',
              borderRadius: '10px',
              padding: '10px',
              width: '500px',
              backgroundColor: '#fff'
            }}
          >
            <Form.Item label='Tên' name='name' rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
              <Input onChange={handleInputChange} />
            </Form.Item>

            <Form.Item
              label='Số điện thoại'
              name='phone_number'
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!', type: 'phone_number' }]}
            >
              <Input onChange={handleInputChange} />
            </Form.Item>

            <Form.Item label='Địa chỉ' name='address' rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
              <Input onChange={handleInputChange} />
            </Form.Item>

            <Form.Item
              label='Mô tả'
              name='description'
              rules={[{ required: true, message: 'Vui lòng Không để trông!' }]}
            >
              <Input onChange={handleInputChange} />
            </Form.Item>

            <Form.Item label='Vị trí' name='location' rules={[{ required: true, message: 'Vui lòng Không để trông!' }]}>
              <Input onChange={handleInputChange} />
            </Form.Item>

            <Form.Item label='Ảnh' rules={[{ required: true, message: 'Vui lòng Không để trông!' }]}>
              <input type='file' onChange={handleFileChange} />
              {previewImage && <img src={previewImage} alt='Preview' width={100} height={100} className='mt-3' />}
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default MainRight
