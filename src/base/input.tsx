import React from 'react';

interface IInputProps {
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  min?: number;
  max?: number;
}

const Input = ({ className = '', type,  onChange, placeholder = '',  min, max , value }: IInputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-400 ${className}`}
      min={min}
      max={max}
    />
  );
};

export default Input;
