import React from 'react';

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button = ({ onClick, children, className = '', disabled = false }: ButtonProps) => {
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
