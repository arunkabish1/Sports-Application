import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { EventsProvider } from "./context/match/context";

const App = () => {
  return (
    <div>
      <EventsProvider>
        <RouterProvider router={router} />
      </EventsProvider>
    </div>
  );
};
export default App;