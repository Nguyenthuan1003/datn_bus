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
import { Spin, message } from 'antd';
import { useCartRedux } from '../../redux/hook/useCartReducer';
import { useNavigate } from 'react-router-dom';
import { getTripId } from '~/app/api/trip/trip.api';
import { getOneUser } from '~/app/api/auth/auth.api';
import { LoadingOutlined } from '@ant-design/icons';

const LeftBookTickets: FC<any> = ({ trip_id, setSelectData, setDataPrice, selectData, dataPrice, seat_id }) => {
    const accsetoken: any = localStorage.getItem('token')
    // console.log(accsetoken)
    const arrayFilter = ['phone_number', 'name', 'email']
    const { handleSubmit, control, formState: { errors } } = useForm({
        mode: "onChange",
        resolver: yupResolver(validateTicket),
        defaultValues: async () => {
            const userData = (await getOneUser(accsetoken)).data.user
            // console.log("1",userData)
            const filterData: any = {}
            arrayFilter.forEach((key: any) => {
                if (userData.hasOwnProperty(key)) {
                    filterData[key] = userData[key]
                }
            })
            return filterData
        }
    })
    const [dataTrip, setDataTrip] = useState<any>({})

    const [startLocation, setStartLocation] = useState<any>();
    const [endLocation, setEndLocation] = useState<any>();
    const [loading, setLoading] = useState(false);

    const [idUser, setIdUser] = useState<any>()
    const [route, setRoute] = useState<any>()



    useEffect(() => {
        getTripId(trip_id).then((res) => {
            setDataTrip(res?.data?.trip)
            setStartLocation(res?.data?.trip?.start_location);
            setEndLocation(res?.data?.trip?.end_location);
            setRoute(res?.data?.trip?.route?.name);
        });
        getOneUser(accsetoken).then((res: any) => {
            setIdUser(res?.data?.user?.id)
        })

    }, [trip_id])
    // console.log("userdđ",idUser);

    const locationData = {
        start_location: startLocation,
        end_location: endLocation
    };


    const { data: { cart }, actions } = useCartRedux()
    console.log('cart',cart);
    console.log('slect',selectData);
    


    const navigate = useNavigate()
    const onSubmit = async (data: any) => {

        if (selectData.length == 0) {
            message.error("vui lòng chọn chỗ ngồi")
            return
        }
        if (selectData.length > 5) {
            message.error("vui lòng chỉ mua 5 vé")
            return
        }
             actions.setDataBill({
                full_name: data?.name,
                phone_number: data?.phone_number,
                email: data?.email,
                total_money: dataPrice,
                total_money_after_discoun: dataPrice,
                // seat_id: selectData,
                // seat_id: JSON.stringify(selectData),
                // seat_id: selectData.map((seat: string) => `'${seat}'`).join(', '),
                seat_id: JSON.stringify(selectData),      
                trip_id: trip_id,
                location: locationData,
                pickup_location: locationData?.start_location,
                pay_location: locationData?.end_location,
                route: route,
                // code_bill: billUser[0]?.code_bill,
                total_seat: selectData.length,
                user_id: idUser || null,
                discount_code_id: null
            })
       
            
           

            localStorage.setItem('loation', JSON.stringify(locationData));
            localStorage.setItem('route', JSON.stringify(route));
            localStorage.setItem('seat', JSON.stringify(selectData))
        try {
                const billData = {
                    full_name: data?.name,
                    phone_number: data?.phone_number,
                    email: data?.email,
                    total_money: dataPrice,
                    total_money_after_discount: dataPrice,
                    code_seat: selectData.map((seat: string) => `'${seat}'`).join(', '),
                    // seat_id: selectData.map((seat: string) => `'${seat}'`).join(', '),
                    // code_seat: JSON.stringify(selectData),
                    seat_id: JSON.stringify(selectData),
                    trip_id: trip_id,
                    status_pay: "0",
                    type_pay: "0",
                    pickup_location: locationData?.start_location,
                    pay_location: locationData?.end_location,
                    total_seat: selectData.length,
                    // code_bill: cart?.code_bill,
                    discount_code_id: null,
                    user_id: idUser?.id || null
                };
                // Gọi API để lưu hóa đơn
                console.log('billData', billData);


                await addBill(billData);
                // localStorage.setItem('billData', JSON.stringify(billData));
                const dataBillUser = localStorage.getItem("bill_user");
                const objBillUser = JSON.parse(dataBillUser!);
                console.log('ssss',objBillUser)
    
            const dataCart = actions.setDataBill({
                    full_name: data?.name,
                    phone_number: data?.phone_number,
                    email: data?.email,
                    total_money: dataPrice,
                    total_money_after_discoun: dataPrice,
                    total_seat: selectData?.length,
                    // seat_id: selectData,
                    code_seat: selectData.map((seat: string) => `'${seat}'`).join(', '),
                    seat_id: selectData,
                    trip_id: trip_id,
                    location: locationData,
                    route: route,
                    code_bill: objBillUser?.code_bill,
                    user_id: idUser || null,
                    discount_code_id: null
                })
            const dataCartTolocal = dataCart.payload;
            localStorage.setItem("cart",JSON.stringify(dataCartTolocal))
          
            
        } catch (error: any) {
            if (error.response) {
                // Lỗi từ API
                console.error('API error:', error.response.data);
            } else if (error.request) {
                // Lỗi từ không có phản hồi từ server
                console.error('No response received:', error.request);
            } else {
                // Lỗi khác
                console.error('Error:', error.message);
            }
        }
        setLoading(true);
        setTimeout(() => {
          navigate(`/payment`);
          
        }, 5000); // Thời gian delay: 1000ms = 1 giây
        // navigate(`/payment?codeBook=${cart?.code_bill}&phone=${cart?.phone_number}`)
    };

    return (
        <div css={leftBookCss}>
           {loading && (
                 <div className="fixed inset-0 z-50 bg-black opacity-50"></div>
             )}
             {
                loading  ?  (
                    <div className="fixed z-50 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='py-4 '>
                        <BreadCrumb dataTrip={dataTrip} />
                    </div>
                    <div>
                        <CheckChaircomponent seat_id={seat_id} trip_id={trip_id} setSelectData={setSelectData} setDataPrice={setDataPrice} />
                    </div>
                    <div>
                        <CustomerInformation trip_id={trip_id} control={control} errors={errors} />
                    </div>
                    <div className='py-4'>
                        {/* setSelectData={setSelectLocation}  */}
                        <Reception trip_id={trip_id} />
                    </div>
                    <div className='py-4'>
                        <FutapayComponent trip_id={trip_id} selectData={selectData} dataPrice={dataPrice} setSelectData={setSelectData} setDataPrice={setDataPrice} />
                    </div>
                </form>
                )
             }
          
        </div>
    );
};

export default LeftBookTickets;

const leftBookCss = css`
   
`;
