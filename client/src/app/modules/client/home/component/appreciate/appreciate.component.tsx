import React from 'react'

const AppreciateComponent = () => {
    return (
        <section className="flex flex-col items-center bg-[#FFF7F5] px-4 py-6 text-center sm:p-10" style={{width:'1518px', marginLeft:'-195px'}}>
            <span style={{color:'#00613d', fontWeight: 'bold', fontSize:'30px'}}>LETGO5  BUS LINES - CHẤT LƯỢNG LÀ DANH DỰ</span>
            <span className="home-title-content" style={{ fontSize:'17px', color:'#4a4a4a'}}>Được khách hàng tin tưởng và lựa chọn</span>
            <div className="layout mt-8 sm:grid sm:grid-cols-2 sm:gap-16">
                <div>
                    <div className="mb-6 flex items-center">
                        <div className="">
                            <img alt="" loading="lazy" width="75" height="96" decoding="async" data-nimg="1" 
                            className="transition-all duration-200 undefined" 
                            style={{color: 'transparent', marginLeft:'140px'}} 
                            src="https://storage.googleapis.com/futa-busline-cms-dev/Group_662c4422ba/Group_662c4422ba.svg"/>
                        </div>
                        <div className="ml-4 flex flex-col text-left">
                            <span className="text-2xl font-semibold text-black lg:text-3xl" style={{marginLeft:'13px'}}>Hơn 20 Triệu
                                <span className="ml-3 text-base">Lượt khách</span>
                            </span>
                            <span className="text-gray" style={{marginLeft:'13px'}}>Phục vụ hơn 20 triệu lượt khách bình quân 1 năm trên toàn quốc</span>
                        </div>
                    </div>
                    <div className="mb-6 flex items-center">
                        <div className="">
                            <img alt="" loading="lazy" width="75" height="96" decoding="async" data-nimg="1" 
                            className="transition-all duration-200 undefined" 
                            style={{color: 'transparent', marginLeft:'140px'}} 
                            src="https://storage.googleapis.com/futa-busline-cms-dev/Store_55c0da8bd7/Store_55c0da8bd7.svg"/>
                        </div>
                        <div className="ml-4 flex flex-col text-left">
                            <span className="text-2xl font-semibold text-black lg:text-3xl" style={{marginLeft:'33px'}}>Hơn 350
                                <span className="ml-3 text-base">Phòng vé - Bưu cục</span>
                            </span>
                            <span className="text-gray" style={{marginLeft:'33px'}}>Có hơn 350 phòng vé, trạm trung chuyển, bến xe,... trên toàn hệ thống</span>
                        </div>
                    </div>
                    <div className="mb-6 flex items-center">
                        <div className="">
                            <img alt="" loading="lazy" width="75" height="96" decoding="async" data-nimg="1" 
                            className="transition-all duration-200 undefined" 
                            style={{color: 'transparent', marginLeft:'140px'}} 
                            src="https://storage.googleapis.com/futa-busline-cms-dev/Group_2_75b5ed1dfd/Group_2_75b5ed1dfd.svg"/>
                        </div>
                        <div className="ml-4 flex flex-col text-left">
                            <span className="text-2xl font-semibold text-black lg:text-3xl" style={{marginLeft:'13px'}}>Hơn 1,000
                                <span className="ml-3 text-base" >Chuyến xe</span>
                            </span>
                            <span className="text-gray" style={{marginLeft:'13px'}}>Phục vụ hơn 1,000 chuyến xe đường dài và liên tỉnh mỗi ngày</span>
                        </div>
                    </div>
                </div>
                <div className="relative hidden object-contain sm:block">
                    <img alt="" loading="lazy" decoding="async" data-nimg="fill" 
                    className="transition-all duration-200 relative hidden object-contain sm:block" 
                    style={{position: 'absolute', height: '100%', width: '100%', inset: '0px', color: 'transparent', marginLeft:'-50px'}}
                    src="https://storage.googleapis.com/futa-busline-cms-dev/image_f922bef1bb/image_f922bef1bb.svg"/>
                </div>
            </div>
        </section>
    )
}

export default AppreciateComponent