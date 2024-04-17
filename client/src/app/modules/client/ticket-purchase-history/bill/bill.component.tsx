import React, { useEffect, useState } from 'react'
import TemplateModelBill from '~/app/modules/client/ticket-purchase-history/bill/common/template-model-bill/template-model-bill.component'
import { axiosPrivate } from '~/app/api/confighHTTp'

const BillClientComponent = () => {
  const [dataBill, setDataBill] = useState<Bill[]>([])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const userId = user.id
    console.log('userId', userId);
    
    if (userId) {
      axiosPrivate
        .get(`/bill/show/${userId}`)
        .then((response) => {
          if (Array.isArray(response.data.bill)) {
            setDataBill(response.data.bill)
          } else {
            console.error('response.data.bills is not an array:', response.data.bill)
          }
        })
        .catch((error) => console.error('Error:', error))
    }
  }, [])

  return (
    <div>
      <TemplateModelBill 
        title={`Lịch sử mua vé`} 
        dataTable={dataBill} 
      />
    </div>
  )
}

export default BillClientComponent
