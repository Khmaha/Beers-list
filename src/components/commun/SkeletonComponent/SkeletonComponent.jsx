import React from "react";
import { Skeleton } from "antd";
import "./SkeletonComponent.scss";
const SkeletonComponent = ({ size, square }) => {
  return (
    <Skeleton
      className="skeleton-comp"
      active
      avatar={{ shape: square, size: size }}
      paragraph={{ rows: "4" }}
    />
  );
};

export default SkeletonComponent;
