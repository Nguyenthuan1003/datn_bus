import { css } from '@emotion/react';
import React, { FC, useState } from 'react';

interface IChair {
    children?: any;
    status?: number; // Thêm prop để xác định trạng thái của ghế
}

const ChairUiComponent: FC<IChair> = ({ children, status }) => {
    // Sử dụng state để lưu trạng thái đã chọn của ghế
    const [selected, setSelected] = useState(false);
    const [isSold, setIsSold] = useState(status === 1);
    // Hàm xử lý sự kiện click vào ghế
    const handleSeatClick = () => {
        // Đảo ngược trạng thái đã chọn của ghế
        if (status === 1 || isSold) return ;
        setSelected(!selected);
    };

    // Chọn hình ảnh tương ứng với trạng thái của ghế
    let seatImage;
    if (status === 1) {
        seatImage = "https://futabus.vn/images/icons/seat_disabled.svg"; // Ghế đã bán
    } else if (selected) {
        seatImage = "https://futabus.vn/images/icons/seat_selecting.svg"; // Ghế đang được chọn
    } else {
        seatImage = "https://futabus.vn/images/icons/seat_active.svg"; // Ghế còn trống
    }

    return (
        <div css={chairUiCss} className="container py-1"  onClick={handleSeatClick}>
            <div className="position-relative bg-inherit">
            <img src={seatImage} alt="Seat" style={{ cursor: status === 1 ? 'not-allowed' : 'pointer' }} />
                <div className='seat-number'>{children}</div>
               
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
        /* Áp dụng màu sắc tương ứng với trạng thái của ghế */
        color: gray; /* Mặc định */
    }
`;
