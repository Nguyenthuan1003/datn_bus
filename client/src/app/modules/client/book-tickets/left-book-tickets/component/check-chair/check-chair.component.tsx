import { css } from '@emotion/react';
import ChairUiComponent from '~/app/component/parts/chair-ui/chair-ui.component';

const CheckChaircomponent = () => {
    return (
        <div css={checkChairCss} className='py-4'>
            <div className='chair p-4 bg-white'>
                <div className='grid grid-cols-3'>
                    <div className='font-semibold text-[18px]'>
                        Chọn ghế
                    </div>
                    <div className='font-medium text-[16px] underline text-blue-500'>
                        Thông tin xe
                    </div>
                </div>

                <div className='py-3'>
                    <div className='grid grid-cols-3'>
                        <div>
                            <div>
                                <h3 className='font-medium py-2'>Tầng dưới</h3>
                            </div>

                            <div className='flex '>
                                <div>
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                </div>

                                <div className='px-6'>
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                </div>

                                <div >
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                </div>
                            </div>
                        </div>

                        <div className='px-3'>
                            <div>
                                <h3 className='font-medium py-2'>Tầng trên</h3>
                            </div>

                            <div className='flex'>
                                <div>
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                </div>

                                <div className='px-6'>
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                </div>

                                <div>
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                    <ChairUiComponent />
                                </div>
                            </div>
                        </div>

                        <div className='py-3'>
                            <span className='flex items-center'>
                                <div className='mr-2 h-4 w-4 rounded bg-[#D5D9DD] border-[#C0C6CC]'></div>
                                Đã bán
                            </span>

                            <span className='flex items-center clear-left py-4'>
                                <div className='mr-2 h-4 w-4 rounded bg-[#DEF3FF] border-[#C0C6CC]'></div>
                                còn trống
                            </span>

                            <span className='flex items-center'>
                                <div className='mr-2 h-4 w-4 rounded bg-[#FDEDE8] border-[#C0C6CC]'></div>
                                Đang chọn
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CheckChaircomponent;

const checkChairCss = css`
    .chair {
        box-sizing: border-box;
        border: 0 solid #e5e7eb;
        border-radius: 6px;
    }
`;
