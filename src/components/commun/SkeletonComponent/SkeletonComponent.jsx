import React from "react";
import {
  Skeleton,
  Space,
  Divider,
  Switch,
  Form,
  Radio,
  Button,
  Input,
} from "antd";
import "./SkeletonComponent.scss";
const SkeletonComponent = ({ rows, size, square }) => {
  return (
    <Skeleton
      active
      avatar={{ shape: square, size: size }}
      paragraph={{ rows: "4" }}
    />
  );
};

export default SkeletonComponent;
