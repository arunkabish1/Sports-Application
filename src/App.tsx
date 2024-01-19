import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { EventsProvider } from "./context/match/context";
import { ArticleProvider } from "./context/article/context";

const App = () => {
  return (
    <div>
      <ArticleProvider>
      <EventsProvider>
        <RouterProvider router={router} />
      </EventsProvider>
      </ArticleProvider>
    </div>
  );
};
export default App;