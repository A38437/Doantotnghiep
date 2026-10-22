import React from "react";
import { useEffect } from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../Commom/ErrorComponent";
const TextArea = (props) => {
  const {
    control,
    name,
    placeholder = "",
    children,
    className = "",
    onChange = () => {},
    ...rest
  } = props;

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
    <textarea
      className={`py-4 px-6 w-full min-h-[141px] outline-none resize-none border font-medium  rounded-xl ${className}`}
      placeholder={placeholder}
      id={name}
      {...rest}
      {...field}
      onChange={handleChange}
    ></textarea>
  );
};

// export default TextArea;

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  control: PropTypes.any.isRequired,
};
export default withErrorBoundary(TextArea, {
  FallbackComponent: ErrorComponent,
});
