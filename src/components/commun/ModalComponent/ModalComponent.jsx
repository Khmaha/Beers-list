import React from "react";
import "./ModalComponent.scss";
import { Modal } from "antd";
const ModalComponent = ({
  visible,
  handleOk,
  handleCancel,
  children,
  title,
}) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      wrapClassName="modal-content"
      getContainer={() => document.getElementById("root")}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
