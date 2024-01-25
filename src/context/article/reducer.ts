interface ArticleData {
  [x: string]: any;
  id: number;
  title: string;
  description: string;
  event: {
    name: string;
    id: number;
  };
  date: string;
  image: string;
  teams:{
    some(arg0: (team: any) => boolean): unknown;
    id: number
    name: string
  }
}
export const initialArticleState: ArticleState = {
  articlesData: [],
  loading: false,
  error: false,
  errorMsg: "",
};

export type ArticleActions =
  | { type: "REQUEST_ARTICLES" }
  | { type: "RECEIVE_ARTICLES"; payload: ArticleData[] }
  | { type: "FAILURE_ARTICLES"; payload: string };

export interface ArticleState {
  articlesData: ArticleData[];
  loading: boolean;
  error: boolean;
  errorMsg: string;
}

export const reducer = (
  state: ArticleState = initialArticleState,
  action: ArticleActions
): ArticleState => {
  switch (action.type) {
    case "REQUEST_ARTICLES":
      return {
        ...state,
        loading: true,
      };
    case "RECEIVE_ARTICLES":
      return {
        ...state,
        loading: false,
        articlesData: action.payload,
      };
    case "FAILURE_ARTICLES":
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};
