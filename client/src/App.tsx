import { useRoutes, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import DefaulLayoutComponent from './app/container/defaul-layout/defaul-layout.component'
import DefaulHomeComponent from './app/container/defaul-home/defaul-home.component'
import { clientRouter } from './app/modules/client/router'
import DefaulAdmin from './app/container/defaul-admin/defail-admin.component'
import { adminRouter } from './app/modules/admin/router'
import { Modal } from 'antd'
import NotFoundComponent from './app/component/stacks/not-found/not-found.component'

function PrivateRoute({ children, setIsModalVisible, setModalContent }) {
  const user = JSON.parse(localStorage.getItem('user'))

  if (!user) {
    setIsModalVisible(true)
    setModalContent('Vui lòng đăng nhập')
    return <Navigate to='/' />
  }

  if (user?.type_user === 'admin' || user?.type_user === 'driver' || user?.type_user === 'assistant') {
    return children
  } else {
    setIsModalVisible(true)
    setModalContent('Bạn không phải admin, vui lòng đăng nhập với tư cách admin')
    return <Navigate to='/' />
  }
}

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const navigate = useNavigate()
  let timeoutId

  useEffect(() => {
    if (isModalVisible && modalContent === 'Vui lòng đăng nhập') {
      timeoutId = setTimeout(() => {
        setIsModalVisible(false)
        navigate('/login')
      }, 5000)
    }

    return () => clearTimeout(timeoutId)
  }, [isModalVisible, navigate, modalContent])

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
            <PrivateRoute setIsModalVisible={setIsModalVisible} setModalContent={setModalContent}>
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
          if (modalContent === 'Vui lòng đăng nhập') {
            navigate('/login')
          }
        }}
        onCancel={() => {
          setIsModalVisible(false)
          clearTimeout(timeoutId)
        }}
      >
        <p>{modalContent}</p>
      </Modal>
    </>
  )
}

export default App