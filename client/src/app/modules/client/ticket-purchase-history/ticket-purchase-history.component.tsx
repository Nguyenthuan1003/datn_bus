import React from 'react'
import MenuAccount from '~/app/component/stacks/menu-account/menu-account.component'
import MainRightComponent from './component/main-right/main-right.component'

type Props = {}

const ResetPassComponent = (props: Props) => {
  return (
    <div className='flex w-[1128px] m-auto '>
      <div className='w-[22%]'>
        <MenuAccount />
      </div>
      <div className='px-8 w-[78%]'>
        <MainRightComponent />
      </div>
    </div>
  )
}

export default ResetPassComponent
