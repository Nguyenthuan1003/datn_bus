import { Button, Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const PaymentFailComponent = () => {
  return (
    <div className=" flex items-center justify-center">
       <Result
        status='error'
        title="Thanh toán thất bại "
        subTitle="Đã có lỗi trong quá trình thanh toán , vui lòng hãy thử lại"
        extra={<Button type="primary"><Link to={"/"}>Trang chủ</Link></Button>}
      />
    </div>
  )
}

export default PaymentFailComponent