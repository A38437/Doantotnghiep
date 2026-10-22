import React from "react";

const SuspenseFallback = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <img src="/loadingP2.gif" alt="loading" />
    </div>
  );
};

export default SuspenseFallback;
