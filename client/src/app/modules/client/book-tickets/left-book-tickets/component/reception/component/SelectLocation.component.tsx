import React, { FC, useState, useEffect } from 'react';
import { Divider, Popover, Radio } from 'antd';
import { css } from '@emotion/react';

interface ISelect {
  content?: any[];
  title?: string;
}

const SelectLocationComponent: FC<ISelect> = ({ content, title }) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>();

  const handleChange = (e: any) => {
    setSelectedValue(e.target.value);
  };

  useEffect(() => {
    setSelectedValue(content && content[0]?.name);
  }, [content]);

  return (
    <Popover

      content={
        <div className='ant-popover popover-custom popover-on-otp ant-popover-placement-bottom '>

      
        <div className="ant-popover-inner-content">

        <div className=' flex w-[100vw] flex-col rounded-xl bg-white 2lg:max-w-[420px]'>
        <Radio.Group onChange={handleChange} value={selectedValue}>
          {content && content.map((item: any) => (
            <div className='select-location' key={item.id}>
              <Radio key={item.id} value={item.name}>{item.name}</Radio>
              <div className="flex items-center">
                <div className="flex flex-col sm:flex-row items-center">
                  <div className="flex justify-between text-black">
                    <span className="text-[15px] font-medium">18:80</span>
                    {/* {item.time} */}
                  </div>
                  <span className="text-gray text-[13px]">aaaaaaaaaaa</span>
                  {/* {item.address} */}
                </div>
                <a className="ml-3 w-16 text-[13px] font-medium text-orange" href={item.mapLink} target="_blank" rel="noopener noreferrer">Xem vị trí</a>
              </div>
            </div>
          ))}
        </Radio.Group>
        </div>
        </div>
        </div>
      }
      placement="bottom"
      title={title || "Title"}
      trigger="click"
    >
      <div className='input-form flex w-full cursor-pointer items-center justify-between border text-[15px] '>
        <span>{selectedValue || 'chọn chuyến'}</span>
        <div className="icon-gray">
          <img src="https://futabus.vn/images/icons/icon_form_droplist.svg" alt="dropdown" />
        </div>
      </div>
    </Popover>
  );
};

export default SelectLocationComponent;