import React, { Fragment } from 'react'
import TemplateTable from '../common/template-table/template-table.component'
import { Form, Select, Upload } from 'antd'
const { Option } = Select
const BannerAdmin = () => {
    return (
        <div>
            <TemplateTable
                formEdit={
                    <Fragment>
                        <Form.Item
                            label='Images'
                            name='images'
                            getValueFromEvent={(event) => event.fileList}
                            rules={[{ required: true, message: 'Đây là trường bắt buộc' }]}
                            valuePropName={'fileList'}
                        >
                            <Upload listType='picture-card' >
                                + Upload
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            label='Trạng thái'>
                            <Select placeholder="lựa chọn trạng thái">

                                <Option value="0" >Áp dụng</Option>
                                <Option value="1" >Vô hiệu hoá</Option>

                            </Select>
                        </Form.Item>

                    </Fragment>
                }
            />
        </div>
    )
}

export default BannerAdmin