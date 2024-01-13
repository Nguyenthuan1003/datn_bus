import { css } from '@emotion/react';
import React, { FC } from 'react'
import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
interface ISwiperList {
    title?: string
    children?: any

}
const SwiperListComponent: FC<ISwiperList> = ({ title, children }) => {
    return (
        <>
            <div css={cssSwiper}>
                <div className='my-7'>
                    <h2 >{title}</h2>
                </div>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    // pagination={{
                    //     clickable: true,
                    // }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper"
                >
                    {children}
                </Swiper>

            </div>
        </>
    )
}

export default SwiperListComponent

const cssSwiper = css`
padding: 12px 0;
border-radius: 8px;
height: 100%;
width: 100%;
background-color: var(--color-white);
.title{
    margin-bottom: 12px;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    color: rgb(39, 39, 42);
}

h2{
    font-weight: 600;
    font-size: 28px;
    line-height: 33px;
    color: #00613d;
    text-align:center; 
}

`