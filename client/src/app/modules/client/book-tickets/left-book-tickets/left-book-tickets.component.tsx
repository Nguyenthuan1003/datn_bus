import { css } from '@emotion/react';
import CheckChaircomponent from './component/check-chair/check-chair.component';
import CustomerInformation from './component/customer-information/customer-information.component';
import Reception from './component/reception/reception.component';
import FutapayComponent from './component/futapay/futapay.component';
import BreadCrumb from '~/app/component/parts/BreadCrumb/BreadCrumb';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validateTicket } from '~/app/utils/validateForm';
import { addBill } from '~/app/api/bill/bill.api';
import { message } from 'antd';

const LeftBookTickets:FC<any> = ({setSelectData,setDataPrice,selectData,dataPrice}) => {
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(validateTicket)
        
    })
    const onSubmit = (data: any) => {
        addBill(data).then((res:any)=>{// sau truyền giá, địa chị cụ thể ,.......
            if(res){
                message.success("thành công")
                localStorage.setItem('userBill', JSON.stringify(data));
                 localStorage.setItem('userBill', JSON.stringify(data));
                console.log('data', data);
            }
            else{
                message.error("thất bại")
            }
        })
    }
    return (
        <div css={leftBookCss}>
             <form onSubmit={handleSubmit(onSubmit)} >
            <div className='py-4 '>
                <BreadCrumb  />
            </div>

            <div>
                <CheckChaircomponent setSelectData={setSelectData} setDataPrice={setDataPrice} />
            </div>
            <div>
                <CustomerInformation  control={control} errors={errors}/>
            </div>
            <div className='py-4'>
                <Reception />
            </div>
            <div className='py-4'>
                <FutapayComponent selectData={selectData} dataPrice={dataPrice} setSelectData={setSelectData} setDataPrice={setDataPrice} />
            </div>
</form>
        </div>
    );
};

export default LeftBookTickets;

const leftBookCss = css`
   
`;
