import { useLocation } from "react-router-dom";
import IconStarGray from "../app/components/Icon/IconStarGray";
import IconStarYellow from "../app/components/Icon/IconStarYellow";
import { useEffect } from "react";

// check ảnh
export function checkImageExtension(fileNameOrUrl) {
  // Tạo một mảng chứa các đuôi tệp ảnh được chấp nhận
  const imageExtensions = ["jpg", "jpeg", "png", "gif"];

  // Biểu thức chính quy để kiểm tra xem chuỗi có phải là một URL hợp lệ không
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  // Kiểm tra xem fileNameOrUrl có tồn tại không
  if (!fileNameOrUrl) {
    return false; // Trả về false nếu fileNameOrUrl không tồn tại
  }

  // Nếu fileNameOrUrl là một URL
  if (urlRegex.test(fileNameOrUrl)) {
    // Kiểm tra xem URL có chứa phần mở rộng của tệp ảnh không
    const extension = (fileNameOrUrl.split(".").pop() || "").toLowerCase();
    if (imageExtensions.includes(extension)) {
      return true; // Trả về true nếu đuôi tệp ảnh hợp lệ
    } else {
      return false; // Trả về false nếu đuôi tệp ảnh không hợp lệ
    }
  } else {
    // Nếu fileNameOrUrl không phải là một URL, kiểm tra đuôi tệp trực tiếp
    const extension = (fileNameOrUrl.split(".").pop() || "").toLowerCase();
    if (imageExtensions.includes(extension)) {
      return true; // Trả về true nếu đuôi tệp ảnh hợp lệ
    } else {
      return false; // Trả về false nếu đuôi tệp ảnh không hợp lệ
    }
  }
}

export const isImage = (url) => {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
};

// convertDate
export const convertDate = (data) => {
  const dateTimeString = data;
  const date = new Date(dateTimeString);
  const options = { year: "numeric" };
  const options2 = { month: "long" };
  const options3 = { day: "numeric" };
  // as const là không thể thay đổi sau khi đã khai báo.
  return (
    date.toLocaleDateString("en-US", options2).slice(0, 3) +
    " " +
    date.toLocaleDateString("en-US", options3) +
    ", " +
    date.toLocaleDateString("en-US", options)
  );
};

export const convertDateNumeric = (data) => {
  const dateTimeString = data;
  const date = new Date(dateTimeString);
  const Year = { year: "numeric" };
  const Month = { month: "numeric" };
  const Day = { day: "numeric" };
  // as const là không thể thay đổi sau khi đã khai báo.
  return (
    date.toLocaleDateString("en-US", Day) +
    "/" +
    date.toLocaleDateString("en-US", Month) +
    "/" +
    date.toLocaleDateString("en-US", Year)
  );
};

// export const generateStars = (starCount) => {
//   const stars = Array.from({ length: 5 }, (_, index) => (
//     <IconStarYellow key={index}></IconStarYellow>
//   ));
//   // Đánh dấu các sao sau starCount bằng màu xám
//   stars.fill(<IconStarGray></IconStarGray>, starCount);

//   return stars;
// };

export const generateStars = (starCount) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <IconStarYellow key={`yellow_${index}`}></IconStarYellow>
  ));

  // Đánh dấu các sao sau starCount bằng màu xám
  for (let i = starCount; i < 5; i++) {
    stars[i] = <IconStarGray key={`gray_${i}`}></IconStarGray>;
  }

  return stars;
};

// format định dạng giá
export const formatPrice = (price) => {
  if (!price) return "";
  // Làm tròn số đến hàng nghìn gần nhất
  const roundedPrice = Math.round(price / 1000) * 1000;

  // Định dạng lại số đã được làm tròn
  return roundedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const sortByQuantityProduct = (array, acs) => {
  const arraySort = [...array].sort((a, b) =>
    acs
      ? b?.TotalproductCount - a?.TotalproductCount
      : a?.TotalproductCount - b?.TotalproductCount
  );
  return arraySort;
};
