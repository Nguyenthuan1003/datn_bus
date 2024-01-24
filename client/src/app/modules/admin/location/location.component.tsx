import React, { useEffect, useState } from 'react'
import TemplateTable from '../common/template-table/template-table.component'
import { getAllLocaltion } from './service/location.service';
import image from '../../../../../../server/public/media/1706029012.jpg'
const LocaltionComponent = () => {
    const [column, setColumn] = useState<any>([]);
    const [dataLocation, setDataLocation] = useState<any>([]);

    useEffect(() => {
        const columsTemp: any = []
        const title = ['STT','tên','ảnh','description','parent_locations_id']
        if (dataLocation.length > 0) {
            Object.keys(dataLocation[0]).forEach((itemKey, key = 0) => {
                if (![ 'id','created_at', 'updated_at'].includes(itemKey)) {
                    columsTemp.push({
                        title: title[key++],
                        dataIndex: itemKey,
                        key: itemKey,
                        render:(text:any,record:any,index:any)=>{
                            if(itemKey=='image'){
                                console.log(`../../../../../.${record?.image}`)
                                return <img src={`../../../../../.${record?.image}`} alt="" />
                            }
                            return text
                        }
                    })
                }
            })
        }
        setColumn(columsTemp)
    }, [dataLocation])
    
    const [reset, setReset] = useState<any>([]);
    useEffect(() => {
        getAllLocaltion().then((res) => {
            if (res) {
                setDataLocation(res?.data?.Locations)
            }
        })
    }, [reset])


    const handelGetList = () => {
        setReset(!reset)
    }
  return (
    <div>
        <TemplateTable
         title={`Danh sách tỉnh thành `}
         callBack={handelGetList}
         dataTable={dataLocation}
         columnTable={column}
        //  deleteFunc={deleteParent}
        //  createFunc={addParent}
        //  changeFunc={updateParent}
        />
    </div>
  )
}

export default LocaltionComponent