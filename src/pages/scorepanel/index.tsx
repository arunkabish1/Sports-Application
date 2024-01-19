import React from "react";

import AccountLayout from "../../layout/account";
import Match from "../match";

const scorepanel: React.FC = () => {
  return (
    <div>
      <AccountLayout />
      <Match />
    </div>
  );
};

export default scorepanel;