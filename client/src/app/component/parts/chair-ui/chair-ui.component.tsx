import { css } from '@emotion/react'
import React from 'react'

const ChairUiComponent = () => {
    return (
        <div css={chairUiCss} className="container py-1">
            <div className="position-relative">
                <img src="https://futabus.vn/images/icons/seat_disabled.svg" alt="Seat" />
                <div className="seat-number">A01</div>
            </div>
        </div>
    )
}

export default ChairUiComponent

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
    color: gray;
    text-align: center;
}
`