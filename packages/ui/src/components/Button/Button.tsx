import React, { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => (
  <button style={{ padding: '10px 20px', backgroundColor: 'red' }}>{children}</button>
);

export default Button;
