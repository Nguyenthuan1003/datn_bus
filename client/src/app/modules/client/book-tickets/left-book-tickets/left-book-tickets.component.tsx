import { css } from '@emotion/react';
import CheckChaircomponent from './component/check-chair/check-chair.component';
import CustomerInformation from './component/customer-information/customer-information.component';
import Reception from './component/reception/reception.component';
import FutapayComponent from './component/futapay/futapay.component';
import BreadCrumb from '~/app/component/parts/BreadCrumb/BreadCrumb';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validateTicket } from '~/app/utils/validateForm';
import { addBill } from '~/app/api/bill/bill.api';
import { message } from 'antd';
import { useCartRedux } from '../../redux/hook/useCartReducer';
import { useNavigate } from 'react-router-dom';
import { getTripId } from '~/app/api/trip/trip.api';

const LeftBookTickets: FC<any> = ({trip_id,setSelectData, setDataPrice, selectData, dataPrice }) => {
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(validateTicket)
    })
    const [startLocation, setStartLocation] = useState<any>();
    const [endLocation, setEndLocation] = useState<any>();
    const [route, setRoute] = useState<any>()
    console.log("route",route);
    
    useEffect(()=>{
        getTripId(trip_id).then((res)=>{  
            setStartLocation(res?.data?.trip?.start_location);
            setEndLocation(res?.data?.trip?.end_location);
            setRoute(res?.data?.trip?.route?.name);
        });
    },[trip_id])
    const locationData = {
        start_location: startLocation,
        end_location: endLocation
    };
    
    // useEffect(() => {
    //     getTripId(trip_id).then((res: any) => {
    //         if (res) {
    //             const { start_location, end_location } = res?.data?.trip;
    //             setAdddressLocation({ start_location, end_location });
    //         } else {
    //             console.error('Không thể tải dữ liệu chuyến đi.');
    //         }
    //     }).catch(error => {
    //         console.error('Lỗi khi tải dữ liệu chuyến đi:', error);
    //     });
    // }, [trip_id]);
    // const { start_location, end_location } = adddressLocation;

    //     const locationData = {
    //         start_location,
    //         end_location
    //     };    
    const [bill, setBill] = useState<any>();
    const { data: { cart }, actions } = useCartRedux()
    
    console.log('bill',cart);
    
    const navigate=useNavigate()
    const onSubmit = (data: any) => {
        actions.setDataBill({
            full_name: data?.full_name,
            phone_number: data?.phone_number,
            email: data?.email,
            total_money:dataPrice,
            total_money_after_discoun:dataPrice,
            seat_id:selectData,
            trip_id: trip_id ,
            location:locationData,
            status:'Chờ xác nhận',
            route:route
        })
   
        localStorage.setItem('cart', JSON.stringify(actions.setDataBill({
            full_name: data?.full_name,
            phone_number: data?.phone_number,
            email: data?.email,
            total_money:dataPrice,
            total_money_after_discoun:dataPrice,
            seat_id:selectData,
            trip_id: trip_id ,
            location:locationData,
            route: route
        })));
        localStorage.setItem('loation', JSON.stringify(locationData));
        localStorage.setItem('route', JSON.stringify(route));
        localStorage.setItem('seat', JSON.stringify(selectData));
        
        // try {
        //     const billData = {
        //         full_name: data?.full_name,
        //         phone_number: data?.phone_number,
        //         email: data?.email,
        //         total_money: dataPrice,
        //         total_money_after_discount: dataPrice,
        //         seat_id: JSON.stringify(selectData),
        //         trip_id: trip_id,
        //         status_pay: "0",
        //         type_pay: "0",
        //         total_seat: selectData.length ,
        //     };
        //     // Gọi API để lưu hóa đơn
        //      addBill(billData);
        // } catch (error) {
        //     console.error('Error saving bill:', error);
        // }
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
                    <CheckChaircomponent trip_id={trip_id} setSelectData={setSelectData} setDataPrice={setDataPrice} />
                </div>
                <div>
                    <CustomerInformation trip_id={trip_id} control={control} errors={errors} />
                </div>
                <div className='py-4'>
                    {/* setSelectData={setSelectLocation}  */}
                    <Reception trip_id={trip_id}  />
                </div>
                <div className='py-4'>
                    <FutapayComponent trip_id={trip_id} selectData={selectData} dataPrice={dataPrice} setSelectData={setSelectData} setDataPrice={setDataPrice} />
                </div>
            </form>
        </div>
    );
};

export default LeftBookTickets;

const leftBookCss = css`
   
`;
