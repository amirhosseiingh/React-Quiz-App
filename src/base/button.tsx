import React from 'react';

interface IButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button = ({ onClick, children, className = '', disabled = false }: IButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded-lg transition-all ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
