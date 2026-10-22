import IconStarGray from "../app/components/Icon/IconStarGray";
import IconStarYellow from "../app/components/Icon/IconStarYellow";

export const defaultImage =
  "https://s3.cloud.cmctelecom.vn/tinhte2/2020/02/4912205_1.jpg";

export const defaultImage2 =
  "https://topcomshop.com/uploads/.thumbs/images/a-athudong/9/11955385302-104616149.jpg";

export const LIMIT_HIGH = 999999;

export const dataRating = [
  {
    id: 1,
    stars: [
      <IconStarYellow></IconStarYellow>,
      <IconStarGray></IconStarGray>,
      <IconStarGray></IconStarGray>,
      <IconStarGray></IconStarGray>,
      <IconStarGray></IconStarGray>,
    ],
  },
  {
    id: 2,
    stars: [
      <IconStarYellow></IconStarYellow>,
      <IconStarYellow></IconStarYellow>,
      <IconStarGray></IconStarGray>,
      <IconStarGray></IconStarGray>,
      <IconStarGray></IconStarGray>,
    ],
  },
  {
    id: 3,
    stars: [
      <IconStarYellow></IconStarYellow>,
      <IconStarYellow></IconStarYellow>,
      <IconStarYellow></IconStarYellow>,
      <IconStarGray></IconStarGray>,
      <IconStarGray></IconStarGray>,
    ],
  },
  {
    id: 4,
    stars: [
      <IconStarYellow></IconStarYellow>,
      <IconStarYellow></IconStarYellow>,
      <IconStarYellow></IconStarYellow>,
      <IconStarYellow></IconStarYellow>,
      <IconStarGray></IconStarGray>,
    ],
  },
  {
    id: 5,
    stars: [
      <IconStarYellow></IconStarYellow>,
      <IconStarYellow></IconStarYellow>,
      <IconStarYellow></IconStarYellow>,
      <IconStarYellow></IconStarYellow>,
      <IconStarYellow></IconStarYellow>,
    ],
  },
];

export const statusPayment = {
  CANCELLED: "CANCELLED",
  PROCESSING: "PROCESSING",
  PENDING: "PENDING",
  PAID: "PAID",
};
