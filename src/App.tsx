import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { EventsProvider } from "./context/match/context";
import { ArticleProvider } from "./context/article/context";
import { FavProvider } from "./context/fav/context";
import { UserPreferencesProvider } from "./context/preference/context";
const App = () => {
  return (
    <div>
       <UserPreferencesProvider>
      <ArticleProvider>
      <FavProvider>
      <EventsProvider> 
        <RouterProvider router={router} />
      </EventsProvider>
      </FavProvider>
      </ArticleProvider>
      </UserPreferencesProvider>
    </div>
  );
};
export default App;