import React, { useEffect, useState } from 'react'
import { getDetailTripByid } from '../../trip/service/trip.service';
import { Descriptions, DescriptionsProps } from 'antd';
import ChairUiAdminComponent from '~/app/component/parts/chair-ui/chair-ui-admin.component';
import moment from 'moment-timezone';

const DetailComponent = (data:any) => {

  const [dataDetail, setDataDetail] = useState<any>({})
  const [dataChair, setDataCarTrip] = useState<any>()
  const  id = data?.data?.id;
 
  console.log('data',data);
  
  useEffect(()=>{
    getDetailTripByid(id)
    .then((res)=>{
      setDataDetail(res?.data)
      setDataCarTrip(res?.data?.seats)
    })
  },[id])
  console.log('dataDetail',dataDetail);
  const items: DescriptionsProps['items'] = [
    {
        key: "1",
        label: "Tên xe",
        children: dataDetail?.trip?.car.name
    },
    {
        key: "2",
        label: "Biển số xe",
        children: dataDetail?.trip?.car.license_plate
    },
    {
        key: "3",
         label: "Màu xe " ,
         children: 
         <div style={{ display:"flex" }} >
          <div style={{backgroundColor:`${dataDetail?.trip?.car?.color}`, width:'50px', height:'50px'}} />
             <div className="color-circle" style={{ backgroundColor : `${dataDetail?.trip?.car?.color}`}}></div>
             {data?.data?.car?.color}
         </div>
    },
    {
      key: "4",
      label: "Tổng số ghế",
      children: dataDetail?.seats?.length
  },

    //  {
    //    key:"4",
    //    label:"Trạng thái ",
    //    children:
    //    <>
    //    {
    //      dataDetail.status === 1 ? 'Đang di chuyển':
    //      dataDetail.status === 2 ? 'Chờ giám sát':'Hoàn thành'
    //    }
    //    </>
    //  }
   ];
   const itemsRoute: DescriptionsProps['items'] = [
    {
        key: "1",
        span: 1,
        label: "Tuyến đường",
        children: dataDetail?.trip?.route?.name
    },
    {
        key: "2",
        label: "Điểm đón điểm trả",
        span: 2,
        children: 
            <div className='d-flex'>
                <h3><span>{dataDetail?.trip?.start_location}</span> - <span>{dataDetail?.trip?.end_location}</span> </h3>
            </div>
    },
    {
        key: "3",
         label: "Thời gian bắt đầu" ,
         span: 1,
         children:  moment.utc(dataDetail?.trip?.start_time).format('DD/MM/YYYY HH:mm')
    },
    {
        key: "4",
         label: "Ước tính thời gian đi" ,
         span: 1,
         children:  <div>
               {`${dataDetail?.trip?.interval_trip} giờ`}
         </div>
    },


   ];
   const upperArray = dataChair?.filter((item: any) => item?.code_seat?.startsWith('F1'))
   const lowarArray = dataChair?.filter((item: any) => item?.code_seat?.startsWith('F2'))   
  return (
    <div>
      <div>
      <h1 className='text-[20px] font-semibold mb-3'>Thông tin xe </h1>
        <Descriptions items={items} />
      </div>

      <div className='py-3'>
                    <div className='grid grid-cols-3'>
                        <div className='px-3' >
                            <div>
                                <h3 className='font-medium py-2'>Tầng dưới</h3>
                            </div>

                            <div className='flex-wrap grid grid-cols-3'>
                                {upperArray?.map((item: any,index: number) => (
                                    <div className='my-4'>
                                        {/* <ChairUiComponent key={index} children={item?.code_seat?.slice(0,2)} /> */}
                                        <ChairUiAdminComponent key={index} children={item} codeSeat={upperArray} status={item?.status} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className='px-3'>
                            <div>
                                {
                                    lowarArray?.length === 0 ? "" : (
                                        <h3 className='font-medium py-2'>Tầng trên </h3>
                                    )
                                }
                            </div>

                            <div className='flex-wrap grid grid-cols-3'>
                                {lowarArray?.map((item: any) => (
                                    <div className='my-4'>
                                        <ChairUiAdminComponent children={item} codeSeat={lowarArray} status={item?.status} />
                                    </div>
                                ))}

                            </div>
                        </div>

                        <div className='py-3'>
                            <span className='flex items-center'>
                                <div className='mr-2 h-4 w-4 rounded bg-[#2ebb43] border-[#b7d6b2]'></div>
                                Đã bán
                            </span>

                            <span className='flex items-center clear-left py-4'>
                                <div className='mr-2 h-4 w-4 rounded bg-[#DEF3FF] border-[#C0C6CC]'></div>
                                Còn trống
                            </span>

                            <span className='flex items-center'>
                                <div className='mr-2 h-4 w-4 rounded bg-[#FDEDE8] border-[#C0C6CC]'></div>
                                Giữ ghế ( chưa thanh toán )
                            </span>
                        </div>
                    </div>
                    <div>
                        <span className='mr-5'>  Số ghế đã đặt : <span className='text-green-600'> </span> {dataDetail?.seat_count_booked}</span>
                        <span className='mr-5'> Số ghế còn trống : <span className='text-blue-400'>{dataDetail?.seat_count_unbooked}</span></span>
                        <span className=''> Số ghế chưa thanh toán  : <span className='text-red-400'> {dataDetail?.seat_count_pending}</span> </span>
                    </div>

    </div>

    <div>
         <h1 className='text-[20px] font-semibold mb-3'>Thông tin Chuyến đi </h1>
         <Descriptions items={itemsRoute} />
    </div>
      
    </div>
  )
}

export default DetailComponent