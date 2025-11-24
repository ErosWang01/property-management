// src/components/TextField.tsx
import React from 'react';
import {
  TextField as MuiTextField,
  type TextFieldProps as MuiTextFieldProps,
} from '@mui/material';

interface TextFieldProps extends Omit<MuiTextFieldProps, 'onChange'> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  error = false,
  helperText,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  console.log('123');

  return (
    <MuiTextField
      fullWidth
      label={label}
      value={value}
      onChange={handleChange}
      error={error}
      helperText={helperText}
      {...props}
    />
  );
};
