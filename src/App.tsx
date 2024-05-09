import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./app/pages/Home";
import Cart from "./app/pages/Cart";
import { UseAppSelector, useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { cartTotal } from "../features/shopSlice";

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

export default function App() {
  const { cartItems } = UseAppSelector((state) => state.shop);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cartTotal());
  }, [cartItems, dispatch]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
