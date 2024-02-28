import React from 'react';
import { Switch } from 'antd';

interface CustomSwitchProps {
  checked: any;
  onChange: any;
  value?: boolean;
}

const CustomSwitchs: React.FC<CustomSwitchProps> = ({ checked, onChange, value }) => {
  const checkedStyle = { color: 'green' };
  const uncheckedStyle = { color: 'red' };
  const switchStyle = {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '0px',
    backgroundColor: '#fff',
  };

  return (
    <Switch
      style={switchStyle}
      checked={checked}
      onChange={onChange}
      checkedChildren={<span style={checkedStyle}>Đang hoạt động</span>}
      unCheckedChildren={<span style={uncheckedStyle}>Ngừng hoạt động</span>}
      // value={value} 
    />
  );
};

export default CustomSwitchs;