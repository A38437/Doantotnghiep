import React from "react";
import { useEffect, useRef, useState } from "react";

const Tabs = ({
  title1 = "",
  title2 = "",
  title3 = "",
  activeTabs = 1,
  onChange,
  className = "",
}) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const tab1Ref = useRef(null);
  const tab2Ref = useRef(null);
  const tab3Ref = useRef(null);

  useEffect(() => {
    if (activeTabs === 1 && tab1Ref.current) {
      setSliderPosition(tab1Ref.current.offsetLeft);
    } else if (activeTabs === 2 && tab2Ref.current) {
      setSliderPosition(tab2Ref.current.offsetLeft); //offsetLeft : khoảng cách từ cạnh trái của tab2 đến  bên trái
    } else if (activeTabs === 3 && tab3Ref.current) {
      setSliderPosition(tab3Ref.current.offsetLeft); //offsetLeft : khoảng cách từ cạnh trái của tab3 đến hết bên trái
    }
  }, [activeTabs]);

  const handleClick = (id) => {
    if (onChange) {
      onChange(id);
    }
  };

  return (
    <div
      className={`relative mt-[80px] flex items-center gap-x-10 ${className}`}
    >
      {title1 && (
        <h1
          ref={tab1Ref}
          onClick={() => handleClick(1)}
          className={`text-[18px]  font-medium cursor-pointer uppercase `}
        >
          {title1}
        </h1>
      )}
      {title2 && (
        <h1
          ref={tab2Ref}
          onClick={() => handleClick(2)}
          className={`text-[18px]  font-medium cursor-pointer uppercase`}
        >
          {title2}
        </h1>
      )}
      {title3 && (
        <h1
          ref={tab3Ref}
          onClick={() => handleClick(3)}
          className={`text-[18px]  font-medium cursor-pointer uppercase`}
        >
          {title3}
        </h1>
      )}
      <div
        className="absolute bottom-0 h-[3px] bg-primary transition-transform duration-300"
        style={{
          width:
            activeTabs === 1
              ? `${tab1Ref?.current?.offsetWidth || 150}px`
              : activeTabs === 2
              ? `${tab2Ref?.current?.offsetWidth}px`
              : activeTabs === 3
              ? `${tab3Ref?.current?.offsetWidth}px`
              : "0px",
          transform: `translateX(${sliderPosition}px)`,
        }}
      ></div>
    </div>
  );
};

export default Tabs;
