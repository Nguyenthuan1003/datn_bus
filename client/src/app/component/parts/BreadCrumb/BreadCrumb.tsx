import React from 'react'

const BreadCrumb = ({dataTrip}:any) => {
  return (
    <div className='p-4 bg-white'>
      <h2 className='font-bold'>{dataTrip?.route?.name}</h2>
    </div>
  )
}

export default BreadCrumb