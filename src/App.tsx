import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { EventsProvider } from "./context/match/context";
import { ArticleProvider } from "./context/article/context";
import { FavProvider } from "./context/fav/fav-context";
const App = () => {
  return (
    <div>
    
      <ArticleProvider>
      <FavProvider>
      <EventsProvider> 
        <RouterProvider router={router} />
      </EventsProvider>
      </FavProvider>
      </ArticleProvider>
      
    </div>
  );
};
export default App;