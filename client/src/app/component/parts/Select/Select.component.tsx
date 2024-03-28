import React from 'react';

interface Option {
  id: number;
  name: string;
  image?: string;
  description?: string;
  parent_location_id?: number;
}

interface SelectSearchProps {
  placeholder: string;
  options: Option[];
  searchable?: boolean;
  filterOption?: boolean;
  getOptionLabel: (option: Option) => string;
  getOptionValue: (option: Option) => string;
  value?: Option | null;
  onChange: (option: Option) => void;
}

const SelectSearch: React.FC<SelectSearchProps> = ({
  placeholder,
  options,
  searchable = false,
  filterOption = true,
  getOptionLabel,
  getOptionValue,
  value,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = options[selectedIndex];
    onChange(selectedOption);
  };

  return (
    <select
      className="select-search w-[280px] "
      onChange={handleChange}
      value={value ? getOptionValue(value) : ''}
    >
    
      {placeholder && <option value="">{placeholder}</option>}
      {options?.map((option:any,index:any) => (
        <option key={getOptionValue(option)} value={getOptionValue(option)}>
          {getOptionLabel(option)}
        </option>
      ))}
    </select>
  );
};

export default SelectSearch;