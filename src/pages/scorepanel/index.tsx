import React, { Suspense } from "react";
import AccountLayout from "../../layout/account";
import Match from "../match";
import Article from "../article";
import Fav from "../favourite";
import ErrorBoundary from "../../components/Errorboundary";

const scorepanel: React.FC = () => {
  const isSmallScreen = window.innerWidth >= 320 && window.innerWidth <= 767;
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading..</div>}>
          <AccountLayout />
          <Match />
          <div className="grid grid-cols-4 gap-1">
            {isSmallScreen ? (
              <div className="col-span-4">
                <Article />
              </div>
            ) : (
              <div className="col-span-3">
                <Article />
              </div>
            )}

            {isSmallScreen ? (
              <div className="col-span-4">
                <Fav />
              </div>
            ) : (
              <div className="col-span-1">
                <Fav />
              </div>
            )}
          </div>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default scorepanel;
