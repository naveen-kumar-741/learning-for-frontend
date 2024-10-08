import React, { useState } from "react";
import styles from "./CustomInput.module.scss";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

const CustomInput: React.FC<CustomInputProps> = React.forwardRef<
  HTMLInputElement,
  CustomInputProps
>(({ label, errorMessage, ...rest }, ref) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className={styles.customInput}>
      {label && <label>{label}</label>}
      {rest.type === "password" ? (
        <div className={styles.passwordWrapper}>
          <input
            ref={ref}
            {...rest}
            type={showPassword ? "text" : "password"}
          />
          <span
            className={styles.passwordIcon}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                role="presentation"
              >
                <g fill="#030456" fillRule="evenodd">
                  <path d="M11.983 15.984a4.005 4.005 0 01-4.002-4c0-2.206 1.795-4 4.002-4a4.005 4.005 0 014.002 4c0 2.206-1.795 4-4.002 4M12 4C6.48 4 2 8.84 2 12c0 3.086 4.577 8 10 8s10-4.914 10-8c0-3.16-4.481-8-10-8"></path>
                  <circle cx="12" cy="12" r="2"></circle>
                </g>
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                role="presentation"
              >
                <g fill="#030456" fillRule="evenodd">
                  <path d="M12 18c-4.536 0-7.999-4.26-7.999-6 0-2.001 3.459-6 8-6 4.376 0 7.998 3.973 7.998 6 0 1.74-3.462 6-7.998 6m0-14C6.48 4 2 8.841 2 12c0 3.086 4.576 8 10 8 5.423 0 10-4.914 10-8 0-3.159-4.48-8-10-8"></path>
                  <path d="M11.977 13.984c-1.103 0-2-.897-2-2s.897-2 2-2c1.104 0 2 .897 2 2s-.896 2-2 2m0-6c-2.206 0-4 1.794-4 4s1.794 4 4 4c2.207 0 4-1.794 4-4s-1.793-4-4-4"></path>
                </g>
              </svg>
            )}
          </span>
          {/* <img
            className={styles.passwordIcon}
            onClick={() => setShowPassword((prev) => !prev)}
            src={`/assets/icons/${
              showPassword ? "openEye.svg" : "closeEye.svg"
            }`}
          /> */}
        </div>
      ) : (
        <input ref={ref} {...rest} />
      )}
      <div
        className={`formError d-flex align-items-center  ${
          errorMessage && "show"
        }`}
      >
        <span className="ic-form-invalid" />{" "}
        <span className="ms-1">{errorMessage}</span>
      </div>
    </div>
  );
});

export default CustomInput;
