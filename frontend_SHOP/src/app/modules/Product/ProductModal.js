import { Modal } from "antd";
import React, { useState } from "react";
import ProductDetails from "./ProductDetails";

const ProductModal = ({ open, setOpen, idProductModal }) => {
  //   const [open, setOpen] = useState(false);
  return (
    <>
      {/* <Button type="primary" onClick={() => setOpen(true)}>
          Open Modal of 1000px width
        </Button> */}
      <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1200}
        footer={null}
      >
        <ProductDetails></ProductDetails>
      </Modal>
    </>
  );
};

export default ProductModal;
