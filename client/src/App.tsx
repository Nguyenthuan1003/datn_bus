import { useRoutes, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import DefaulLayoutComponent from './app/container/defaul-layout/defaul-layout.component'
import DefaulHomeComponent from './app/container/defaul-home/defaul-home.component'
import { clientRouter } from './app/modules/client/router'
import DefaulAdmin from './app/container/defaul-admin/defail-admin.component'
import { adminRouter } from './app/modules/admin/router'
import { Modal } from 'antd'
import NotFoundComponent from './app/component/stacks/not-found/not-found.component'

const driverRoutes = ['/', '/admin/check-ticket', '/admin/check-bill']

function PrivateRoute({ children, setIsModalVisible, setModalContent, setModalDestination }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.type_user === 'driver' && !driverRoutes.includes(window.location.pathname)) {
      setIsModalVisible(true);
      setModalContent('Bạn không có quyền truy cập trang này');
      setModalDestination('/admin/check-ticket');
    } else if (user?.type_user === 'user' && window.location.pathname.startsWith('/admin')) {
      setIsModalVisible(true);
      setModalContent('Bạn không có quyền truy cập trang này, vui lòng đăng nhập với tư cách admin');
      setModalDestination('/');
    }
  }, [user, navigate, setIsModalVisible, setModalContent, setModalDestination]);

  if (!user) {
    setIsModalVisible(true);
    setModalContent('Vui lòng đăng nhập');
    setModalDestination('/login');
    return <Navigate to='/' />;
  }

  if (user?.type_user === 'admin') {
    return children;
  } else if (user?.type_user === 'driver') {
    if (driverRoutes.includes(window.location.pathname)) {
      return children;
    } else {
      return null;
    }
  } else {
    setIsModalVisible(true);
    setModalContent('Bạn không có quyền truy cập trang này, vui lòng đăng nhập với tư cách admin');
    setModalDestination('/');
    return <Navigate to='/' />;
  }
}

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const [modalDestination, setModalDestination] = useState('')
  const navigate = useNavigate()
  let timeoutId

  useEffect(() => {
    if (isModalVisible) {
      timeoutId = setTimeout(() => {
        setIsModalVisible(false)
        navigate(modalDestination)
      }, 3000)
    }

    return () => clearTimeout(timeoutId)
  }, [isModalVisible, navigate, modalContent, modalDestination])

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
            <PrivateRoute setIsModalVisible={setIsModalVisible} setModalContent={setModalContent} setModalDestination={setModalDestination}>
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
          navigate(modalDestination)
        }}
        onCancel={() => {
          setIsModalVisible(false)
          clearTimeout(timeoutId)
          navigate(modalDestination)
        }}
      >
        <p>{modalContent}</p>
      </Modal>
    </>
  )
}

export default App