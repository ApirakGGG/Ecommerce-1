import React from "react";
import Banner from "./Banner";
import Cart from "./cart";

const page = () => {
  return (
    <div>
      <Banner />
      <hr />
      <div>
        <Cart />
      </div>
    </div>
  );
};

export default page;
