import { css } from '@emotion/react'
import { Button, Popover, Radio, RadioChangeEvent, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import { useEffect, useState } from 'react';
import { BsInfoLg } from "react-icons/bs";
import { getTripId } from '~/app/api/trip/trip.api';
import SelectSearch from '~/app/component/parts/Select/Select.component';
import SelectLocationComponent from './component/SelectLocation.component';
// const content = (
//     <SelectLocationComponent />
//   );
const Reception = ({setSelectData}:any) => {
    const [dataLocationStart, SetDataLocationStart] = useState<any>([]);
    const [dataLocationEnd, SetDataLocationEnd] = useState<any>([]);
    const [selectStart , setSelectStart] = useState<any>('');
    const [selectEnd , setSelectEnd] = useState<any>('');
    console.log('eeee',{selectStart, selectEnd})
    const [data, SetData] = useState<any>([]);

    console.log('data', data);    
    useEffect(() => {
        getTripId().then((res: any) => {
            if (res) {
                SetDataLocationStart(res.data?.pickup_location?.location);
                SetDataLocationEnd(res.data?.pay_location?.location);
                SetData(res.data);
                localStorage.setItem('trip_id', JSON.stringify(dataLocationStart))
            }
        });
    }, []);
    const [value, setValue] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const handleSelect = (option: any) => {
        setSelectedOption(option);
        console.log('option', option);
        console.log('selectedOption', selectedOption);
        // Do something with the selected option
    };
    useEffect(() => {
        if (selectStart && selectStart) {
            setSelectData({selectStart, selectEnd})
        }
    }, [selectEnd,selectStart])

    const firstLocationId = dataLocationStart && dataLocationStart.length > 0 ? dataLocationStart[0].id : '';


    return (
        <div css={receptioncss} className='bg-white px-4'>
            <div className=''>
                <h2 className='flex items-center py-3 font-semibold text-[18px]'>Thông tin đón trả <span><BsInfoLg className='text-orange-600 text-[20px]' /></span></h2>
            </div >

            <div className='flex justify-between'>
                <div className='w-[340px]'>
                    <h2 className='text-[17px] font-medium'>Điểm đón</h2>
                    <div className='flex'>
                        <Radio.Group onChange={onChange} value={value}>
                            <Radio value={1}>Điểm đón</Radio>
                            <Radio value={2}>Trung chuyển</Radio>
                        </Radio.Group>
                        <div>
                            <span><BsInfoLg className='text-orange-600 text-[20px]' /></span>
                        </div>
                    </div>

                    <div className='py-6'>

                        {/* <Popover content={<span>{dataLocationStart?.map((item:any)=>(<div>{item?.name}</div>))}</span> 
                        } placement="bottom" title="Title" trigger="click">
                            <div className='input-form flex w-full cursor-pointer items-center justify-between border text-[15px] '>
                                <span>{dataLocationStart[0]?.name}</span>
                                <div className="icon-gray">
                                    <img src="https://futabus.vn/images/icons/icon_form_droplist.svg" alt="dropdown" />
                                </div>
                            </div>
                        </Popover> */}
                        <SelectLocationComponent title="chọn chuyến đi" setSelectStart={setSelectStart} content={dataLocationStart} />

                        {/* <SelectSearch
                        placeholder={'chọn điểm đón'}
                        options={dataLocationStart}
                        searchable
                        filterOption={false}
                        getOptionLabel={(option: any) => option?.name || ''}
                        getOptionValue={(option: any) => String(option.id)} // Assuming id is unique
                        value={selectedOption}
                        onChange={handleSelect}
                    /> */}
                        {/* <input type="text" value={selectedOption?.name}  readOnly/> */}
                    </div>
                </div>

                <div className='border-l-2 border-gray-300 px-3'></div>
                <div className='w-[340px]'>
                    <h2 className='text-[17px] font-medium'>Điểm trả</h2>
                    <div className='flex'>


                        <div className='flex items-center'>
                            <input type="radio" />
                            <p className='px-2'>Điểm đón</p>
                        </div>

                        <div className='flex items-center'>
                            <input type="radio" />
                            <p className='px-2'>Trung chuyển</p>
                        </div>

                        <div>
                            <span><BsInfoLg className='text-orange-600 text-[20px]' /></span>
                        </div>
                    </div>

                    <div className='py-6'>
                    <SelectLocationComponent  title="chọn chuyến đi" setSelectEnd={setSelectEnd} content={dataLocationEnd} />

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