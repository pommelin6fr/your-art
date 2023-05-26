import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ArtWorkComponentContainer } from "./components";


const router = createBrowserRouter([
  {
    path: "/artwork/:id",
    element: <ArtWorkComponentContainer />
  }
])


const App = () => <RouterProvider router={router} />;

export default App;
