import React from 'react'

const TopDataCar = ({ item, index }: any) => {
    
  return <tr key={index}>
  <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
      {index + 1}
  </td>
  <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
      {item?.name}
  </td>
  <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
      {item?.total_trips}
  </td>
  <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
      {item?.total_revenue?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) || 0}
  </td>
  {/* <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
      {item?.total_seat || 0}
  </td>
  <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
      {item?.total_trip}
  </td> */}
  
</tr>;
}

export default TopDataCar