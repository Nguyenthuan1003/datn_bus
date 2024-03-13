import { css } from '@emotion/react';
import CheckChaircomponent from './component/check-chair/check-chair.component';
import CustomerInformation from './component/customer-information/customer-information.component';
import Reception from './component/reception/reception.component';
import FutapayComponent from './component/futapay/futapay.component';
import BreadCrumb from '~/app/component/parts/BreadCrumb/BreadCrumb';

const LeftBookTickets = () => {
    return (
        <div css={leftBookCss}>
            <div className='py-4 '>
                <BreadCrumb  />
            </div>

            <div>
                <CheckChaircomponent />
            </div>
            <div>
                <CustomerInformation />
            </div>
            <div className='py-4'>
                <Reception />
            </div>
            <div className='py-4'>
                <FutapayComponent />
            </div>

        </div>
    );
};

export default LeftBookTickets;

const leftBookCss = css`
   
`;
