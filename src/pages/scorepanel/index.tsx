import React from "react";
import AccountLayout from "../../layout/account";
import Match from "../match";
import Article from "../article";

const scorepanel: React.FC = () => {
  return (
    <>
      <AccountLayout />
      <Match />
      <Article />
    </>
  );
};

export default scorepanel;