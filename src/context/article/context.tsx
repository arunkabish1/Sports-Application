import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialArticleState, ArticleState, ArticleActions } from "./reducer";

const ArticleStateContext = createContext<ArticleState | undefined>(undefined);
type ArticleDispatch = React.Dispatch<ArticleActions>;
const ArticleDispatchContext = createContext<ArticleDispatch | undefined>(undefined);

export const ArticleProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialArticleState);

  return (
    <ArticleStateContext.Provider value={state}>
      <ArticleDispatchContext.Provider value={dispatch}>
        {children}
      </ArticleDispatchContext.Provider>
    </ArticleStateContext.Provider>
  );
};

export const useArticleState = () => {
  const context = useContext(ArticleStateContext);
  if (!context) {
    throw new Error("useArticleState must be used within an ArticleProvider");
    
  }
  return context;
};

export const useArticleDispatch = () => {
  const context = useContext(ArticleDispatchContext);
  if (!context) {
    throw new Error("useArticleDispatch must be used within an ArticleProvider");
  }
  return context;
};
