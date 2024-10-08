import React from "react";
import styles from "./CustomButton.module.scss";

interface CustomInputProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CustomButton: React.FC<CustomInputProps> = ({
  children,
  ...buttonProps
}) => {
  const { className, ...rest } = buttonProps;
  return (
    <button className={`${styles.customButton} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default CustomButton;
