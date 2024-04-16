import { css } from '@emotion/react';
import React, { FC, useState } from 'react';
import imgSeatH from '../../../../assets/img/icons/seat/seat_hold.svg'
interface IChair {
    children?: any;
    status?: number; 
    seatHold?:any;
    dataSeatHold?:any,
    checkSeatHold?:any,
    seatSold?:any
}

const ChairUiComponent: FC<IChair> = ({ children, status , seatHold,dataSeatHold,checkSeatHold,seatSold}) => {
    // Sử dụng state để lưu trạng thái đã chọn của ghế
    const [selected, setSelected] = useState(false);
    const isSold = status === 1 ;
    // Chọn hình ảnh tương ứng với trạng thái của ghế
    const isSeatHold = checkSeatHold && checkSeatHold.includes(children) && isSold; 
    
    // const isSeatSold = seatSold && status === 1
    const handleSeatClick = () => {
            // Đảo ngược trạng thái đã chọn của ghế
            if (status === 1 || isSold) return ;
            setSelected(!selected);  
        };
    
    let seatImage;
    if (status === 1 && !isSeatHold) {
        seatImage = "https://futabus.vn/images/icons/seat_disabled.svg"; // Ghế đã bán
    }else if (isSeatHold) {       
        seatImage = imgSeatH                                           //Ghế giữ
    }else if (selected) {
        seatImage = "https://futabus.vn/images/icons/seat_selecting.svg"; // Ghế đang được chọn
    }
    else {
        seatImage = "https://futabus.vn/images/icons/seat_active.svg"; // Ghế còn trống
    }
    return (
        <div css={chairUiCss} className="container py-1"  onClick={handleSeatClick}>
            <div className="position-relative bg-inherit">
            <img src={seatImage} alt="Seat" style={{ cursor: status === 1 ? 'not-allowed' : 'pointer' }} />
                <div className='seat-number'>{children.slice(3,5)}</div>
            </div>
        </div>
    )
}

export default ChairUiComponent;

const chairUiCss = css`
    .container {
        position: relative;
        display: inline-block;
    }

    .position-relative {
        position: relative;
        width: fit-content;
    }

    .seat-number {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 11px;
        font-weight: bold;
        text-align: center;
        color: gray; /* Mặc định */
    }
`;
