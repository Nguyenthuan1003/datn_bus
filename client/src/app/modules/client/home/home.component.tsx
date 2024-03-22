import React, { useEffect, useState } from 'react'
import FormToFromComponent from "../home/component/form-to-from/form-to-from.component"
import VoucherComponent from "../home/component/voucher/voucher.component"
import NewsComponent from "../home/component/news/news.component"
import AppreciateComponent from "../home/component/appreciate/appreciate.component"
import ConnectComponent from "../home/component/connect/connect.component"
import PoppularComponent from "../home/component/popular/popular.component"
import { getOneUser } from '~/app/api/auth/auth.api'
const HomeComponent = () => {
    const [user, setUser] = useState<any>({});
    const token = localStorage.getItem("token");
    console.log(token);
    
    useEffect(() => {
      if (!token) {
        // window.location.href='/login';
        console.log('chua đăng nhập');
        
        return;
      }
  
      getOneUser(token).then(res => {
        setUser(res);
      }).catch(error => {
        console.error('Error fetching user:', error);
        // Xử lý lỗi nếu cần
      });
    }, [token]);
    console.log('user',user);
    
    
    return (

        <div >
            <div className='w-[1128px] m-auto '>
                
                <div>
                    <FormToFromComponent />
                </div>
                <div>
                    <VoucherComponent />
                </div>
                <div style={{marginTop: '45px'}}>
                    <PoppularComponent />
                </div>
                <div>
                    <NewsComponent />
                </div>
                <div style={{marginTop: '45px'}}>
                    <AppreciateComponent />
                </div>

                <div style={{marginTop: '45px'}}>
                    <ConnectComponent />
                </div>
            </div>
        </div>

    )
}

export default HomeComponent
