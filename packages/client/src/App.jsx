import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DetailPage,
  EditPage,
  ErrorPage,
  LandingPage,
  PageLayout,
} from "./pages";
import AppProvider from "./AppContext";
import { CalorieRecord } from "./components";

const router = createBrowserRouter([
  {
    path: "./",
    element: <PageLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "track",
        children: [
          {
            index: true,
            element: <CalorieRecord />,
          },
          {
            path: ":idRecord",
            element: <DetailPage />,
          },
          {
            path: "create",
            element: <EditPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />;
    </AppProvider>
  );
}

export default App;
