import { Modal } from 'antd'
import React, { FunctionComponent } from 'react'

interface TemplateModalProps{
   isModalOpen: boolean
   handleOk():void
   handleCancel():void
   children: any
   title: any 
}

const TemplateModal:FunctionComponent<TemplateModalProps> = ({isModalOpen, handleOk, handleCancel,children,title}) => {
  return (
    <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            {children}
        </Modal>
  )
}

export default TemplateModal