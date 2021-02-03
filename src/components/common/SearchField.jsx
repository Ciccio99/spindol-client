import React, { useState, useEffect } from 'react';
import { InputAdornment, InputBase } from '@material-ui/core';
import { SearchIcon, CancelIcon } from 'components/common/Icons';

export default function SearchField({
  placeholder,
  onChange,
  fullWidth = false,
  initialValue = '',
  startIconSize,
  endIconSize,
  ...rest
}) {
  const placeholderText = placeholder || 'Filter';
  const [field, setField] = useState(initialValue);

  const onFieldEditHandle = (e) => setField(e.target.value);

  const onFieldClearHandle = () => setField('');

  useEffect(() => {
    setField(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (onChange) {
      onChange(field);
    }
  }, [field, onChange]);

  return (
    <InputBase
      onChange={onFieldEditHandle}
      value={field}
      placeholder={placeholderText}
      fullWidth={fullWidth}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon size={startIconSize} />
        </InputAdornment>
      }
      endAdornment={
        field ? (
          <InputAdornment
            position="start"
            onClick={onFieldClearHandle}
            style={{ cursor: 'pointer' }}
          >
            <CancelIcon size={endIconSize} />
          </InputAdornment>
        ) : null
      }
      {...rest}
    />
  );
}
