import { useState, useEffect } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout, Menu, Button, theme } from 'antd'
import { css } from '@emotion/react'
import { Outlet, useNavigate } from 'react-router-dom'
import { menuDashBoard } from '~/app/modules/admin/constance/menu-dashboard'
import { filterMenuByUserType } from '~/app/modules/admin/constance/menu-dashboard'
import logo from '~/assets/img/logo_book_bus.png'
const { Header, Sider, Content } = Layout

const DefaulAdmin = () => {
  let navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const userMenu = filterMenuByUserType(user?.type_user)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const handleClickMenuDashboard = (data: any) => {
    navigate(data.key)
  }

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768)
    }

    // Call handleResize right away to set the initial value of collapsed
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint='md'
        collapsedWidth='0'
        onBreakpoint={(broken) => {
          setCollapsed(broken)
        }}
      >
        <div css={cssLogoAdmin} className='flex justify-center'>
          <img src={logo} alt='' width={70} height={70} />
        </div>
        <div className='demo-logo-vertical' />
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']} onSelect={handleClickMenuDashboard}>
          {userMenu.map((menu) => (
            <Menu.Item key={menu.key}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {menu.icon}
                <span style={{ marginLeft: '10px' }}>{menu.label}</span>
              </div>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout style={{ height: '100%', minHeight: '100vh' }}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className='flex' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Button
                type='text'
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64
                }}
              />
            </div>

            <div className='float-right px-9 bg-slate-200 font-bold'>Admin hệ thống</div>
          </div>
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default DefaulAdmin

const cssLogoAdmin = css`
  margin: 10px;
  padding: 10px 10px;
  text-align: center;
  background-color: white;
  .ant-menu-item-selected {
    background-color: #fff;
  }
`
