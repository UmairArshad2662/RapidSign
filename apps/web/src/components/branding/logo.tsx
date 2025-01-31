import type { ImgHTMLAttributes } from 'react';

export type LogoProps = ImgHTMLAttributes<HTMLImageElement>;

export const Logo = ({ ...props }: LogoProps) => {
  return (
    <img
  
      src="/logo.png" // Replace with the actual path to your PNG
      alt="Logo"
      width="1000" // Adjust as needed
      height="500" // Adjust as needed
      {...props}
    />
  );
};
