import React, { useState } from 'react'
import { Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { css } from '@emotion/react';
import ButtonRadiusCompoennt from '~/app/component/parts/button/button.component';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const { RangePicker } = DatePicker;
const FormToFromComponent = () => {
    const [value, setValue] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const defaultDate = dayjs('2024-01-01')
    return (
        <div css={formCss} >
            <div className='flex justify-between'>
                <div >
                    <Radio.Group onChange={onChange} value={value}>
                        <Radio value={1}>Một chiều</Radio>
                        <Radio value={2}>Khứ hồi</Radio>
                    </Radio.Group>
                </div>
                <div className='text-orange-600'>
                    Hướng dẫn mua vé
                </div>
            </div>

            <div className='mt-2 flex justify-between'>
                <div className='flex'>
                    <div>
                        <div className='mb-2 font-semibold text'>điểm đi</div>
                        <p className='input-search font-semibold'> An Giang</p>
                    </div>
                    <img src="https://futabus.vn/images/icons/switch_location.svg" alt="" className='mt-7' />

                    <div>
                        <div className='mb-2 font-semibold text'>điểm đến</div>
                        <p className='input-search font-semibold'> Bà Rịa- Vũng Tàu</p>
                    </div>
                </div>

                <div>
                    <div className='mb-2 font-semibold text'>ngày  đi</div>
                    <p className='input-search font-semibold'> <DatePicker
                        defaultValue={defaultDate}
                        suffixIcon={null}
                        style={{ border: 'none' }}
                    /></p>
                </div>


                <div>
                    <div className='mb-2 font-semibold text'>ngày về</div>
                    <p className='input-search font-semibold'> <DatePicker
                        defaultValue={defaultDate}
                        suffixIcon={null}
                        style={{ border: 'none' }}
                    /></p>
                </div>

                <div>
                    <div className='mb-2 font-semibold text'>số vé</div>
                    <p className='input-search font-semibold'>1</p>
                </div>
            </div>

            <div className='mt-3 '>
                <div className='font-semibold text'>
                    Tìm kiếm gần đây
                </div>
                <div className=' mt-2 bg-gray-100 view-search'>
                    <p className='font-medium'> An Giang - Bà Rịa- Vũng Tàu</p>
                    <p className='text-gray-500 font-semibold text-[14px]'>18-01-2024</p>
                </div>

            </div>

            <div className="button-wrapper">
                <Link to={"/buy-search-results"}>
                    <ButtonRadiusCompoennt content='Tìm chuyến xe' />
                </Link>

            </div>
        </div>
    )
}

export default FormToFromComponent
const formCss = css`

    background: #fff;
    border: 1px solid var(--color-blue-primary);
    border-radius: 1rem;
    padding: 1.5rem;
    outline: 8px solid #e0f2fe;

    .input-search {
        width:200px;
        border: 1px solid #dde2e8;
        padding: 12px 5px;
        border-radius: 8px;
       line-height: 37px;
    }
    .view-search{
        width:200px;
        border: 1px solid #dde2e8;
        padding: 0px 5px;
        border-radius: 8px;
       line-height: 37px; 
       font-size:14px;
    }
    .text{
        font-size: 15px;
    margin-left: 20px; 
    }

    .button-wrapper {
        margin-top: 10px;
        display: flex;
        justify-content: center;
    }

`