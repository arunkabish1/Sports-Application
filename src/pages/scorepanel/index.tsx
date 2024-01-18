import React from "react";

import AccountLayout from "../../layout/account";
import Match from "../match";

const scorepanel: React.FC = () => {
  return (
    <div className=" static min-h-screen flex-row justify-center bg-gray-100">
      <AccountLayout />
      <Match />
    </div>
  );
};

export default scorepanel;