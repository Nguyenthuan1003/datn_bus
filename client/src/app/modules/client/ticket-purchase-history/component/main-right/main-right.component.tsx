import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { Space, Table, Tag } from 'antd'
import ButtonRadiusCompoennt from '~/app/component/parts/button/button.component'
import Column from 'antd/es/table/Column'
import ColumnGroup from 'antd/es/table/ColumnGroup'
import BillClientComponent from '~/app/modules/client/ticket-purchase-history/bill/bill.component'

const MainRightComponent = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const userId = user.id
  return (
    <div>
      <div className='mt-4'>
      <BillClientComponent userId={userId} />
      </div>
    </div>
  )
}

export default MainRightComponent
