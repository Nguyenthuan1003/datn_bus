
import { css } from '@emotion/react';
import { Controller, useForm } from 'react-hook-form';
import ButtonRadiusCompoennt from '~/app/component/parts/button/button.component';
import { yupResolver } from '@hookform/resolvers/yup';
import { validateTicket } from '../../../utils/validateForm';

const CheckTicketComponent = () => {
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(validateTicket)
    })
    const onSubmit = (data: any) => console.log(data)
    return (
        <div css={ticketCss} className='w-[1128px] m-auto'>
            <h2>TRA CỨU THÔNG TIN ĐẶT VÉ</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='w-[600px] m-auto'>
                <div className=''>
                    <Controller
                        control={control}
                        name='phoneNumber'
                        render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                            <input placeholder='Vui lòng nhập số điện thoại' className='' type='text' value={value} onChange={onChange} ref={ref} />
                        )}
                    />
                    {errors && <span className='text-red-600'>{errors.phoneNumber?.message}</span>}
                </div>


                <div className='my-5'>
                    <Controller
                        control={control}
                        name='ticket'
                        render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                            <input placeholder='Vui lòng nhập mã vé' className='' type='text' value={value} onChange={onChange} ref={ref} />
                        )}
                    />
                    {errors && <span className='text-red-600'>{errors.ticket?.message}</span>}
                </div>

                <div className='text-center'>
                    <ButtonRadiusCompoennt type="submit" content='Tra cứu' />
                </div>
            </form>
        </div>
    )
}

export default CheckTicketComponent

const ticketCss = css`
input {
    width: 100%;
    padding: 6px 12px;
    border-radius: 8px;
    border: 1px solid #dde2e8;
    outline: none;
}

input:focus {
    border-color: orange;
    outline: none; 
}

h2{
    text-align:center;
    margin-bottom: 12px;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    color: #00613d;
}
`