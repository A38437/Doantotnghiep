import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import InvoiceComponent from "../components/Invoice/InvoiceComponent";

const TestPage2 = () => {
  const componentRef = useRef();

  return (
    <div>
      <h1>In Hóa Đơn</h1>
      <ReactToPrint
        trigger={() => <button>In Hóa Đơn</button>}
        content={() => componentRef.current}
      />
      <div className="">
        <InvoiceComponent ref={componentRef} />
      </div>
    </div>
  );
};

export default TestPage2;
