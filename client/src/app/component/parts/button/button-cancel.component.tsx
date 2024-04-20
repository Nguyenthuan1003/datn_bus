import { css } from '@emotion/react'
import React, { FC } from 'react'
interface IButtonRadius {
    content: string
    type?: any,
    bgcolor?: any,
    onchange?:any
}
const ButtonCanelCompoennt: FC<IButtonRadius> = ({ content, type, bgcolor , onchange}) => {
    return (
        <div css={buttonCss(bgcolor)}>
            <button onClick={onchange}  className=' rounded-2xl py-2 px-6'>
                {content}
            </button>
        </div>
    )
}

export default ButtonCanelCompoennt

const buttonCss = (bgcolor: any) => css`
button{
    background-color: ${bgcolor ? '#fff' : 'var(--color-btn)'};
    color: ${bgcolor ? 'var(--color-black)' : 'var(--color-white)'};
    border: 1px solid ${bgcolor ? '#c0c6cc' : '#fff'};
    box-shadow:var(--box-shadow)
}
button:hover{
    background-color: ${bgcolor ? '#f2754e' : 'var(--color-blue-hover)'};
    color: ${bgcolor ? 'var(--color-white)' : ''};
    border: 1px solid ${bgcolor ? '#c0c6cc' : '#c0c6cc'};
}
`