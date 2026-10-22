import React from "react";

const ContentNews = ({ children, className = "" }) => {
  return (
    <div className={`text-text1 font-normal multiline-ellipsis ${className}`}>
      {children ||
        "Xem ngay các phong cách thời trang đang được ưa chuộng và dẫn đầu xu hướng trong năm 2026 và một số gợi ý, hướng dẫn chọn style phù hợp"}
    </div>
  );
};

export default ContentNews;
