import { css } from '@emotion/react';
import { FC, useEffect, useState } from 'react';
import { getTripId } from '~/app/api/trip/trip.api';
import ChairUiComponent from '~/app/component/parts/chair-ui/chair-ui.component';
import tripSlice from '~/app/modules/client/redux/reducer/tripSlice/tripSlice';

const CheckChaircomponent:FC<any> = ({trip_id,setSelectData,setDataPrice}) => {
    const [data, setData] = useState<any>();    
    const [dataChair, setDataChair] = useState<any>();
    const [dataTrips, setDataTrips] = useState<any>();
    const [selectData1, setSelectData1] = useState<any>([]);
    // const [totalPrice, setTotalPrice] = useState<any>(0);
    
    useEffect(() => {
        getTripId(trip_id).then((res: any) => {
            if (res) {
                setDataChair(res?.data?.seats);
                setDataTrips(res?.data?.trip);
                setData(res?.data);
            }
        });
    }, []);
    
  
    const tripData=dataTrips?.trip_price
    const handelSelecttion = (seat: any) => {
        const seatCode=seat?.code_seat
        const seat_id = seat?.id
        // console.log('seat',seat);

        console.log('seat_id',seatCode);
        
        const status = seat?.status
        if (status === 1) {
            return;
        }
        const index=selectData1?.indexOf(seatCode)
        
        if (index==-1) {
            setSelectData1([...selectData1,seat?.code_seat])
            setSelectData([...selectData1,seat?.code_seat])
            setDataPrice((prewPrice:any)=>prewPrice+Number(tripData))
            localStorage.setItem('seat_id', JSON.stringify(seat_id));
        }
        else {
            const newSelectSeat=[...selectData1]            
            
            newSelectSeat?.splice(index,1)
            setDataPrice((prewPrice:any)=>prewPrice-Number(tripData))
            setSelectData1(selectData1?.filter((item:any)=>item!=seat?.code_seat))
            setSelectData(selectData1?.filter((item:any)=>item!=seat?.code_seat))
        }
    }
    const upperArray = dataChair?.filter((item: any) => item?.code_seat?.startsWith('F1'))
    const lowarArray = dataChair?.filter((item: any) => item?.code_seat?.startsWith('F2'))
    return (
        <div css={checkChairCss} className='py-4'>
            <div className='chair p-4 bg-white'>
                <div className='grid grid-cols-3'>
                    <div className='font-semibold text-[18px]'>
                        Chọn ghế
                    </div>
                </div>

                <div className='py-3'>
                    <div className='grid grid-cols-3'>
                        <div>
                            <div>
                                <h3 className='font-medium py-2'>Tầng dưới</h3>
                            </div>

                            <div className='flex-wrap grid grid-cols-3'>
                                {upperArray?.map((item: any,index: number) => (
                                    <div className='my-4'onClick={()=>handelSelecttion(item)}>
                                        {/* <ChairUiComponent key={index} children={item?.code_seat?.slice(0,2)} /> */}
                                        <ChairUiComponent key={index} children={item?.code_seat.slice(3,5)} status={item?.status} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='px-3'>
                            <div>
                                {
                                    lowarArray?.length == 0 ? "" : (
                                        <h3 className='font-medium py-2'>Tầng trên</h3>
                                    )
                                }
                            </div>

                            <div className='flex-wrap grid grid-cols-3'>
                                {lowarArray?.map((item: any) => (
                                    <div className='my-4'onClick={()=>handelSelecttion(item)}>
                                        <ChairUiComponent children={item?.code_seat.slice(3,5)} status={item?.status} />
                                    </div>
                                ))}

                            </div>
                        </div>

                        <div className='py-3'>
                            <span className='flex items-center'>
                                <div className='mr-2 h-4 w-4 rounded bg-[#D5D9DD] border-[#C0C6CC]'></div>
                                Đã bán
                            </span>

                            <span className='flex items-center clear-left py-4'>
                                <div className='mr-2 h-4 w-4 rounded bg-[#DEF3FF] border-[#C0C6CC]'></div>
                                còn trống
                            </span>

                            <span className='flex items-center'>
                                <div className='mr-2 h-4 w-4 rounded bg-[#FDEDE8] border-[#C0C6CC]'></div>
                                Đang chọn
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CheckChaircomponent;

const checkChairCss = css`
    .chair {
        box-sizing: border-box;
        border: 0 solid #e5e7eb;
        border-radius: 6px;
    }
`;
