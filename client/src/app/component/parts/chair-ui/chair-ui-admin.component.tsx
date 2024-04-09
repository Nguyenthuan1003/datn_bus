import { css } from '@emotion/react';
import React, { FC, useState } from 'react';
import img from '../../../../assets/img/icons/seat/seat_active.svg'
interface IChair {
    children?: any;
    status?: any; // Thêm prop để xác định trạng thái của ghế,
    codeSeat?:any;
}

const ChairUiAdminComponent: FC<IChair> = ({ children, status, codeSeat }) => {
    // Sử dụng state để lưu trạng thái đã chọn của ghế
    const [selected, setSelected] = useState(false);
    const [isSold, setIsSold] = useState(status === "booked");
    const [isHovered, setIsHovered] = useState(false);

    // Hàm xử lý sự kiện hover vào ghế
    const handleSeatHover = () => {
        setIsHovered(true);
    };

    // Hàm xử lý sự kiện hover ra khỏi ghế
    const handleSeatLeave = () => {
        setIsHovered(false);
    };
    // Hàm xử lý sự kiện click vào ghế
    const handleSeatClick = () => {
        // Đảo ngược trạng thái đã chọn của ghế
        if (status === 1 || isSold) return ;
        // setSelected(!selected);
    };
    console.log('codeSeat',children);
    const tooltipContent = (
        <div className="tooltip-content">
            {/* Thêm các thông tin bạn muốn hiển thị */}
            <p>Mã ghế : {children?.code_seat} </p>
            <p>Trạng thái: <span style={{ color: status === "booked" ? "green" : "red" }}> {status === "booked" ? 'Đã bán' : 'Còn trống'}</span> </p>
        </div>
    );
    // Chọn hình ảnh tương ứng với trạng thái của ghế
    let seatImage;
    // if (status === 1) {
    //     seatImage = "https://futabus.vn/images/icons/seat_disabled.svg"; // Ghế đã bán
    // } else if (selected) {
    //     seatImage = "https://futabus.vn/images/icons/seat_selecting.svg"; // Ghế đang được chọn
    // } else {
    //     seatImage = "https://futabus.vn/images/icons/seat_active.svg"; // Ghế còn trống
    // }
    if(status === "booked"){
        seatImage = img
    }
    if(status === "unbooked"){
        seatImage = "https://futabus.vn/images/icons/seat_active.svg"
    }
    if(status === "pending"){
        seatImage = "https://futabus.vn/images/icons/seat_selecting.svg"
    }

    return (
        <div css={chairUiCss} className="container py-1" onMouseEnter={handleSeatHover} onMouseLeave={handleSeatLeave} >
            <div className="position-relative bg-inherit">
            <img src={seatImage} alt="Seat"  />
                {/* <div className='seat-number'>{children?.code_seat.slice(3,5)}</div> */}
                <div className={children.status === "booked" ? 'seat-number seat-booked' : 'seat-number'}>{children?.code_seat.slice(3,5)}</div>
            </div>
            {isHovered && tooltipContent}
        </div>
    )
}

export default ChairUiAdminComponent;

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
    .seat-booked {
        color: green;
    }
`;
