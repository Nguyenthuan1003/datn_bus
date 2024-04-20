import React from 'react'
import { Button, Result } from 'antd'
import HeaderComponent from '~/app/component/stacks/header/header.component'
import FooterComponent from '~/app/component/stacks/footer/footer.component'
import { useNavigate } from 'react-router-dom'

type Props = {}

const NotFoundComponent = (props: Props) => {
  const navigate = useNavigate()

  return (
    <div>
      <HeaderComponent />
      <div className="pt-36">
        <Result
          status='404'
          title='404'
          subTitle='Xin lỗi, trang bạn truy cập không tồn tại.'
          extra={<Button type='primary' onClick={() => navigate('/')}>Quay về</Button>}
        />
      </div>
      <FooterComponent />
    </div>
  )
}

export default NotFoundComponent