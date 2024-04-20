import { Modal } from 'antd'
import React, { FunctionComponent } from 'react'

interface TemplateModalProps{
   isModalOpen: boolean
   handleOk():void
   handleCancel():void
   children: any
   title: any 
   actionType?: string; 
}

const TemplateModal:FunctionComponent<TemplateModalProps> = ({isModalOpen, handleOk, handleCancel,children,title,actionType}) => {
  let modalContent = children;
  if (actionType === 'DETAIL') {
      modalContent = <div>Thông tin chi tiết</div>; // Thay thế bằng nội dung chi tiết bạn muốn hiển thị
  }
  return (
    <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800}>
            {children}
        </Modal>
  )
}

export default TemplateModal