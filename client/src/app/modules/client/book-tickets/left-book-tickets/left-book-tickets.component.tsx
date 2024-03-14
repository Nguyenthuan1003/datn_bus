import { css } from '@emotion/react';
import CheckChaircomponent from './component/check-chair/check-chair.component';
import CustomerInformation from './component/customer-information/customer-information.component';
import Reception from './component/reception/reception.component';
import FutapayComponent from './component/futapay/futapay.component';
import BreadCrumb from '~/app/component/parts/BreadCrumb/BreadCrumb';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validateTicket } from '~/app/utils/validateForm';
import { addBill } from '~/app/api/bill/bill.api';
import { message } from 'antd';
import { useCartRedux } from '../../redux/hook/useCartReducer';
import { useNavigate } from 'react-router-dom';

const LeftBookTickets: FC<any> = ({ setSelectData, setDataPrice, selectData, dataPrice }) => {
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(validateTicket)
    })
    
    const [selectLocation, setSelectLocation] = useState<any>();
    console.log('Loo',selectLocation);
    console.log('skkkk',selectData);
    
    
    
    const [bill, setBill] = useState<any>();
    const { data: { cart }, actions } = useCartRedux()
    console.log('bill',cart);
    
    const navigate=useNavigate()
    const onSubmit = (data: any) => {
        actions.setDataBill({
            code_bill: "A11",
            full_name: data?.full_name,
            phone_number: data?.phone_number,
            email: data?.email,
            total_money:dataPrice,
            total_money_after_discoun:dataPrice,
            seat_id:'1000000000000000000',
            trip_id:"1025",
        })
        console.log('select',selectData);
        
        localStorage.setItem('cart', JSON.stringify(data));
        localStorage.setItem('loation', JSON.stringify(selectLocation));
        localStorage.setItem('seat', JSON.stringify(selectData));
        
        
        //add bill to database 
        
        // setBill({
        //     code_bill: "A11",
        //     full_name: data?.full_name,
        //     phone_number: data?.phone_number,
        //     email: data?.email,
        //     total_money:dataPrice,
        //     total_money_after_discoun:dataPrice,
        //     seat_id:"1012",
        //     trip_id:"1025",
        //     status_pay:"1",
        //     type_pay:"0",
        //     total_seat:"1",
        //     // listSeat:[...cart].map((item:any)=>{return{seat_id: item.id}})
        // })
     
        try {
            const billData = {
                code_bill: "A11",
                full_name: data?.full_name,
                phone_number: data?.phone_number,
                email: data?.email,
                total_money: dataPrice,
                total_money_after_discount: dataPrice,
                seat_id: selectData,
                trip_id: "1025",
                status_pay: "0",
                type_pay: "0",
                total_seat: "1",
            };

            // Gọi API để lưu hóa đơn
             addBill(billData);

        } catch (error) {
            console.error('Error saving bill:', error);
            // Xử lý lỗi (hiển thị thông báo lỗi, ghi log, vv.)
        }
        if(cart){
            navigate("/payment")
            }
    };
    
    return (
        <div css={leftBookCss}>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className='py-4 '>
                    <BreadCrumb />
                </div>

                <div>
                    <CheckChaircomponent setSelectData={setSelectData} setDataPrice={setDataPrice} />
                </div>
                <div>
                    <CustomerInformation control={control} errors={errors} />
                </div>
                <div className='py-4'>
                    <Reception setSelectData={setSelectLocation}  />
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
