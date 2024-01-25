import React from "react";
import AccountLayout from "../../layout/account";
import Match from "../match";
import Article from "../article";
import Fav from "../favourite";


const scorepanel: React.FC = () => {
  return (
    <>
      <AccountLayout />
      <Match />
      <div className="grid grid-cols-4 gap-1">
      <Article />
      <Fav />
      </div>

    </>
  );
};

export default scorepanel;