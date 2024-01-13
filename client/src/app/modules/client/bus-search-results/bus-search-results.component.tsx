import { css } from '@emotion/react'
import React from 'react'
import FilterDataComponent from './component/filter-data/filter-data.component'
import MainSearchResults from './component/main-results/main-results.component'

const BusSearchResults = () => {
    return (
        <div css={buySearchCss} className='flex  w-[1128px] m-auto'>
            <div>
                <FilterDataComponent />
            </div>
            <div className='px-4'>
                <MainSearchResults />
            </div>
        </div>
    )
}

export default BusSearchResults

const buySearchCss = css`

`