import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import BrowseTips from "../pages/BrowseTips";
import ShareTip from "../pages/ShareTip";
import MyTips from "../pages/MyTips";
import TipDetails from "../pages/TipDetails";
import UpdateTip from "../pages/UpdateTip";
import ExploreGardeners from "../pages/ExploreGardeners";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "../routes/PrivateRoute";
import Index from "../pages/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Index /> },
      { path: "home", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "browse-tips",
        element: (
          <PrivateRoute>
            <BrowseTips />
          </PrivateRoute>
        ),
      },
      {
        path: "share-tip",
        element: (
          <PrivateRoute>
            <ShareTip />
          </PrivateRoute>
        ),
      },
      {
        path: "my-tips",
        element: (
          <PrivateRoute>
            <MyTips />
          </PrivateRoute>
        ),
      },
      {
        path: "tip-details/:id",
        element: (
          <PrivateRoute>
            <TipDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "update-tip/:id",
        element: (
          <PrivateRoute>
            <UpdateTip />
          </PrivateRoute>
        ),
      },
      {
        path: "explore-gardeners",
        element: (
          <PrivateRoute>
            <ExploreGardeners />
          </PrivateRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
