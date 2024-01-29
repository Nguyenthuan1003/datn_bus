import React from 'react'

const AboutComponent = () => {
    return (
        <div className="layout unselectext px-[100px] py-10">
            <div className="flex flex-col text-base">
                <div className="content-editor ck-content">
                    <h1 style={{textAlign: "center"}}>
                        <strong>
                            <span className="text-[22px] font-semibold text-orange sm:text-[42px] sm:leading-[50px]" style={{color: "rgb(241, 90, 36)"}}>LetGo5</span>
                        </strong>
                    </h1>
                    <h3 style={{textAlign: "center"}}>
                        <strong>“Chất lượng là danh dự”</strong>
                    </h3>
                    <p style={{columnCount: 1}}>Tập đoàn Phương Trang – FUTA Group được thành lập năm 2001. Với hoạt động kinh 
                    doanh chính trong lĩnh vực mua bán xe ô tô, vận tải hành khách, bất động sản và kinh doanh dịch vụ. Phương 
                    Trang dần trở thành cái tên quen thuộc đồng hành cùng người Việt trên mọi lĩnh vực.</p>
                    <p style={{columnCount: 1}}>Trải qua hơn 20 năm hình thành và phát triển đặt khách hàng là trọng tâm, chúng 
                    tôi tự hào trở thành doanh nghiệp vận tải nòng cốt đóng góp tích cực vào sự phát triển chung của ngành vận 
                    tải nói riêng và nền kinh tế đất nước nói chung. Luôn cải tiến mang đến chất lượng dịch vụ tối ưu nhất dành 
                    cho khách hàng, Công ty Phương Trang được ghi nhận qua nhiều giải thưởng danh giá như “Thương hiệu số 1 
                    Việt Nam, “Top 10 Thương hiệu nổi tiếng Việt Nam”, “Top 10 Dịch vụ hoàn hảo vì quyền lợi người tiêu dùng 
                    năm 2022”, “Top 10 Doanh nghiệp tiêu biểu Việt Nam”, “Top 10 thương hiệu, sản phẩm dịch vụ uy tín Việt 
                    Nam – ASEAN 2022” …</p>
                </div>
                <div className="mx-auto mt-8 flex w-28 cursor-pointer items-center justify-center gap-2 text-[18px] text-[#A2ABB3]">Xem thêm
                    <img src="/images/icons/arrow_right.svg" alt="" 
                    className="rotate-90" width="9" />
                </div>
                <div className="mt-8 flex w-full flex-col items-start gap-6 sm:flex-row">
                    <div className="aspect-[3/2] w-full sm:flex-1">
                        <div className="relative rounded-[10px]">
                            <img alt="alt" loading="lazy" decoding="async" data-nimg="fill" 
                            className="transition-all duration-200 relative rounded-[10px]" 
                            src="https://storage.googleapis.com/futa-busline-web-cms-prod/Artboard_3_3x_fb31ff2c98/Artboard_3_3x_fb31ff2c98.png" 
                            style={{height: '100%', width: '100%', inset: '0px', color: 'transparent'}}/>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="mb-6 text-[22px] font-semibold text-orange sm:text-[42px] sm:leading-[50px]">TẦM NHÌN VÀ SỨ MỆNH</div>
                        <div className="content-editor ck-content">
                            <p style={{columnCount: 1}}>
                                <strong>
                                    <span style={{color: 'rgb(230, 77, 77)'}}>BÁO ĐÁP TỔ QUỐC VÌ MỘT VIỆT NAM HÙNG CƯỜNG.</span>
                                </strong><br/>Trở thành Tập Đoàn uy tín và chất lượng hàng đầu Việt Nam với cam kết:
                            </p>
                            <ul>
                                <li><p style={{columnCount: 1}}>Tạo môi trường làm việc năng động, thân thiện.</p></li>
                                <li><p style={{columnCount: 1}}>Phát triển từ lòng tin của khách hàng.</p></li>
                                <li><p style={{columnCount: 1}}>Trở thành tập đoàn dẫn đầu chuyên nghiệp.</p></li>
                            </ul>
                            <p style={{columnCount: 1}}>
                                <strong>
                                    <span style={{color: 'rgb(230, 77, 77)'}}>Phương Trang </span>
                                </strong>luôn phấn đấu làm việc hiệu quả nhất, để luôn cống hiến, đóng góp hết sức mình vì một Việt 
                                Nam hùng cường.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex w-full flex-col items-start gap-6 sm:flex-row-reverse">
                    <div className="aspect-[3/2] w-full sm:flex-1">
                        <div className="relative rounded-[10px]">
                            <img alt="alt" loading="lazy" decoding="async" data-nimg="fill" 
                            className="transition-all duration-200 relative rounded-[10px]" 
                            src="https://storage.googleapis.com/futa-busline-web-cms-prod/Artboard_4_3x_44277bbc3b/Artboard_4_3x_44277bbc3b.png" 
                            style={{height: '100%', width: '100%', inset: '0px', color: 'transparent'}}/>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="mb-6 text-[22px] font-semibold text-orange sm:text-[42px] sm:leading-[50px]">GIÁ TRỊ CỐT LÕI</div>
                        <div className="content-editor ck-content">
                            <p style={{columnCount: 1}}>Giá trị cốt lõi – 
                                <strong>
                                    <span style={{color: 'rgb(230, 77, 77)'}}>Phương Trang</span>
                                </strong>
                            </p>
                            <ul>
                                <li><p style={{columnCount: 1}}>
                                    <strong>
                                        <span style={{color: 'rgb(230, 77, 77)'}}>Phương:</span>
                                    </strong> 
                                    chữ “Phương” trong tiếng Hán nghĩa là Vuông, vật gì hình thể ngay thẳng đều gọi là phương. 
                                    thể hiện sự chính trực, phẩm chất đạo đức tốt đẹp. Mọi hành động của Phương Trang luôn thể 
                                    hiện sự minh bạch, công bằng chính trực với đồng nghiệp, khách hàng, đối tác.</p>
                                </li>
                                <li><p style={{columnCount: 1}}>
                                    <strong>
                                        <span style={{color: 'rgb(230, 77, 77)'}}>Trang: </span>
                                    </strong>
                                    mang nghĩa To lớn, Tráng lệ. Hướng tới sự thành công vượt bậc, thể hiện ý chí, khát vọng 
                                    thực hiện những mục tiêu lớn, đem lại giá trị lớn cho cộng động, cho xã hội.&nbsp,</p>
                                </li>
                                <li><p style={{columnCount: 1}}>
                                    <strong>
                                        <span style={{color: 'rgb(230, 77, 77)'}}>Phương Trang </span>
                                    </strong>
                                    với hàm nghĩa càng phát triển, càng to lớn lại càng phải “CHÍNH TRỰC”. Luôn là biểu tượng 
                                    của sự phát triển dựa trên những giá trị đạo đức tốt đẹp nhất.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex w-full flex-col items-start gap-6 sm:flex-row">
                    <div className="aspect-[3/2] w-full sm:flex-1">
                        <div className="relative rounded-[10px]">
                            <img alt="alt" loading="lazy" decoding="async" data-nimg="fill" 
                            className="transition-all duration-200 relative rounded-[10px]" 
                            src="https://storage.googleapis.com/futa-busline-web-cms-prod/Artboard_5_3x_cf15563d46/Artboard_5_3x_cf15563d46.png" 
                            style={{height: '100%', width: '100%', inset: '0px', color: 'transparent'}}/>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="mb-6 text-[22px] font-semibold text-orange sm:text-[42px] sm:leading-[50px]">TRIẾT LÝ</div>
                        <div className="content-editor ck-content">
                            <p style={{columnCount: 1}}>Hội nhập và phát triển góp phần vào sự thịnh vượng của đất nước. Nguồn nhân lực chính 
                            là nhân tố then chốt, là tài sản lớn nhất của Công ty Phương Trang, chú trọng tạo ra môi trường làm việc hiện đại, 
                            năng động, thân thiện và trao cơ hội phát triển nghề nghiệp cho tất cả thành viên. Sự hài lòng của khách hàng là minh 
                            chứng cho chất lượng dịch vụ của Phương Trang. Không ngừng hoàn thiện và phát triển năng lực kinh doanh, Phương Trang 
                            thấu hiểu nhu cầu khách hàng, mang đến sản phẩm dịch vụ hoàn hảo, đáp ứng tối đa mong đợi của khách hàng.</p>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-b"></div>
            </div>
        </div>
    )
}

export default AboutComponent