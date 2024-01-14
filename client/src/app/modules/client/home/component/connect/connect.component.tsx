import React from 'react'

const ConnectComponent = () => {
    return (
        <section className="flex flex-col items-center px-4 py-6 text-center sm:p-10">
            <span style={{color:'#00613d', fontWeight: 'bold', fontSize:'30px'}}>KẾT NỐI LETGO5 GROUP</span>
            <span className="home-title-content max-w-2xl" style={{ fontSize:'17px', color:'#4a4a4a'}}>Kết nối đa dạng hệ sinh thái LETGO5 Group qua App LETGO5: mua vé Xe Buýt, Xe Hợp Đồng, Giao Hàng,...</span>
            <div className="mb-4 mt-10">
                <div className="relative hidden w-[100vw] max-w-4xl sm:block sm:h-28 2lg:h-36">
                    <img alt="futa connect" loading="lazy" decoding="async" data-nimg="fill" 
                    className="transition-all duration-200 relative hidden w-[100vw] max-w-4xl sm:block sm:h-28 2lg:h-36" 
                    style={{position: 'absolute', height: '130px', width: '100%', inset: '0px', color: 'transparent'}} 
                    src="https://storage.googleapis.com/futa-busline-cms-dev/1_ketnoi_3c401512ac/1_ketnoi_3c401512ac.svg"/>
                </div>
                <div className="relative aspect-[13/7] w-[96vw] sm:hidden">
                    <img alt="futa connect" loading="lazy" decoding="async" data-nimg="fill" 
                    className="transition-all duration-200 relative aspect-[13/7] w-[96vw] sm:hidden" 
                    style={{position:'absolute', height:'100%', width:'100%', color:'transparent',backgroundSize:'cover',
                    backgroundPosition:'50% 50%', backgroundRepeat:'no-repeat'}}
                    src="https://storage.googleapis.com/futa-busline-web-cms-prod/Mobile_8c827bf843/Mobile_8c827bf843.png" />
                </div>
            </div>
        </section>
    )
}

export default ConnectComponent