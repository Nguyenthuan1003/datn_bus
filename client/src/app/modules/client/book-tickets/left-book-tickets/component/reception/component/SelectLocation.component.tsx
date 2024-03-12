import React, { FC, useState, useEffect } from 'react';
import { Popover, Radio } from 'antd'; // Đảm bảo bạn đã import Popover và Radio từ thư viện Ant Design
import { css } from '@emotion/react';
const { Group } = Radio;

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
    setSelectedValue(content && content[0]?.name); // Sử dụng giá trị mặc định từ content nếu có
  }, [content]);

  return (
    <Popover
      content={
        <Group onChange={handleChange} value={selectedValue}>
          {content && content.map((item: any) => (
            <div>
              <Radio key={item.id} value={item.name}>{item.name}</Radio>
            </div>
          ))}
        </Group>
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

const CssSelectTion = `
`
