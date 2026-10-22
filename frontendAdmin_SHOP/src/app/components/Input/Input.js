import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../Commom/ErrorComponent";
const Input = (props) => {
  const {
    control,
    name,
    type = "text",
    error = "",
    placeholder = "",
    children,
    className,
    kind = "",
    cssEye = "",
    onChange = () => {},
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const { field } = useController({
    control,
    name,
    defaultValue: "",
    mode: "onChange",
  });

  // Hàm handleChange chỉ gọi prop onChange nếu nó tồn tại
  const handleChange = (event) => {
    field.onChange(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div>
      <div className="relative">
        <input
          type={isPassword && showPassword ? "text" : type}
          id={name}
          className={`py-3 px-4 w-full border font-medium  rounded-md  outline-none  ${className}   ${
            error ? "border-error " : "border-[#D0D1D3]  "
          } ${
            isPassword || (children && kind === "eye")
              ? "pr-16"
              : children && kind === "search"
              ? "pl-12"
              : ""
          } dark:bg-darkSecondary`}
          placeholder={error.length > 0 ? "" : placeholder}
          {...rest}
          {...field}
          onChange={handleChange}
        />

        {isPassword && (
          <button
            type="button"
            className={`absolute top-1/2 right-2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-md text-gray-500 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 ${cssEye}`}
            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            aria-pressed={showPassword}
            aria-controls={name}
            disabled={rest.disabled || field.disabled}
            onClick={() => setShowPassword((visible) => !visible)}
          >
            {showPassword ? (
              <EyeOff size={20} aria-hidden="true" />
            ) : (
              <Eye size={20} aria-hidden="true" />
            )}
          </button>
        )}

        {!isPassword && children && kind === "eye" && (
          <span
            className={`absolute top-2/4 right-6 -translate-y-3/4   select-none cursor-pointer ${cssEye}`}
          >
            {children}
          </span>
        )}

        {!isPassword && kind === "search" && children && (
          <span className="absolute top-2/4 left-4 -translate-y-2/4 select-none cursor-pointer ">
            {children}
          </span>
        )}
      </div>

      {error.length > 0 && (
        <span className=" block mt-4 text-[14px] font-medium text-error top-2/4 left-6 -translate-y-2/4 pointer-events-none  ">
          {error}
        </span>
      )}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  control: PropTypes.any.isRequired,
};
export default withErrorBoundary(Input, {
  FallbackComponent: ErrorComponent,
});
