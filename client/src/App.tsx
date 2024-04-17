import { useRoutes, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import DefaulLayoutComponent from './app/container/defaul-layout/defaul-layout.component'
import DefaulHomeComponent from './app/container/defaul-home/defaul-home.component'
import { clientRouter } from './app/modules/client/router'
import DefaulAdmin from './app/container/defaul-admin/defail-admin.component'
import { adminRouter } from './app/modules/admin/router'
import { Modal } from 'antd'
import NotFoundComponent from './app/component/stacks/not-found/not-found.component'

// Tạo một component PrivateRoute
function PrivateRoute({ children, setIsModalVisible }) {
  const user = JSON.parse(localStorage.getItem('user'))

  // Kiểm tra nếu user là admin, driver hoặc assistant thì cho phép truy cập, ngược lại hiển thị modal
  if (user?.type_user === 'admin' || user?.type_user === 'driver' || user?.type_user === 'assistant') {
    return children
  } else {
    setIsModalVisible(true)
    return <Navigate to='/' />
  }
}

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const navigate = useNavigate()
  let timeoutId

  useEffect(() => {
    if (isModalVisible) {
      timeoutId = setTimeout(() => {
        setIsModalVisible(false)
        navigate('/')
      }, 5000)
    }

    return () => clearTimeout(timeoutId)
  }, [isModalVisible, navigate])

  let element: any = useRoutes([
    {
      path: '/',
      element: <DefaulLayoutComponent />,
      children: [
        {
          path: '',
          element: <DefaulHomeComponent />,
          children: clientRouter
        },
        {
          path: 'admin',
          element: (
            <PrivateRoute setIsModalVisible={setIsModalVisible}>
              <DefaulAdmin />
            </PrivateRoute>
          ),
          children: adminRouter
        },
        { path: '*', element: <NotFoundComponent /> }
      ]
    }
  ])

  return (
    <>
      {element}
      <Modal
        title='Thông báo'
        visible={isModalVisible}
        onOk={() => {
          setIsModalVisible(false)
          clearTimeout(timeoutId)
          navigate('/')
        }}
        onCancel={() => {
          setIsModalVisible(false)
          clearTimeout(timeoutId)
          navigate('/')
        }}
      >
        <p>Bạn không phải admin, vui lòng đăng nhập với tư cách admin</p>
      </Modal>
    </>
  )
}

export default App
