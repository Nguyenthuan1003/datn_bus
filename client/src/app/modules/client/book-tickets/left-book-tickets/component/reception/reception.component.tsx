import { css } from '@emotion/react'
import { useEffect, useState } from 'react';
import { BsInfoLg } from "react-icons/bs";
import { getTripId } from '~/app/api/trip/trip.api';

// const content = (
//     <SelectLocationComponent />
//   );
const Reception = ({trip_id,setSelectData}:any) => {
    const [data, SetData] = useState<any>([]);
    console.log('data', data);    
    useEffect(() => {
        getTripId(trip_id).then((res: any) => {
            if (res) {
                SetData(res.data);
            }
        });
    }, []);


    // useEffect(() => {
    //     if (selectStart && selectStart) {
    //         setSelectData({selectStart, selectEnd})
    //     }
    // }, [selectEnd,selectStart])



    return (
        <div css={receptioncss} className='bg-white px-4'>
            <div className=''>
                <h2 className='flex items-center py-3 font-semibold text-[18px]'>Thông tin đón trả <span><BsInfoLg className='text-orange-600 text-[20px]' /></span></h2>
            </div >

            <div className='flex justify-between'>
                <div className='w-[340px]'>
                    <h2 className='text-[17px] font-medium'>Điểm đón</h2>
                    {/* <div className='flex'>
                        <Radio.Group onChange={onChange} value={value}>
                            <Radio value={1}>Điểm đón</Radio>
                            <Radio value={2}>Trung chuyển</Radio>
                        </Radio.Group>
                        <div>
                            <span><BsInfoLg className='text-orange-600 text-[20px]' /></span>
                        </div>
                    </div> */}

                    <div className='py-6'>
                         {/* <SelectLocationComponent title="chọn chuyến đi" setSelectStart={setSelectStart} content={dataLocationStart} /> */}
                        <input type="text" value={data?.trip?.start_location} readOnly />

                    </div>
                </div>

                <div className='border-l-2 border-gray-300 px-3'></div>
                <div className='w-[340px]'>
                    <h2 className='text-[17px] font-medium'>Điểm trả</h2>
                    <div className='flex'>
                    </div>

                    <div className='py-6'>
                     {/* <SelectLocationComponent  title="chọn chuyến đi" setSelectEnd={setSelectEnd} content={dataLocationEnd} /> */}
                        <input type="text" value={data?.trip?.end_location} readOnly />
                    </div>
                </div>
            </div>
        </div >

    )
}

export default Reception

const receptioncss = css`
input {
    padding: 6px 12px;
    border-radius: 8px;
    border: 1px solid #dde2e8;
    outline: none;
}
input:focus {
border-color: black;
}
.input-form {
    border-radius: 8px;
    padding: 9px 16px;
    height: 36px;
    border-color: #dde2e8;
}
`