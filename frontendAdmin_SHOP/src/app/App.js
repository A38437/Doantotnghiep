import { toast } from "react-toastify";
import "../App.scss";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import useClickOutSide from "../utils/customHook/useClickOutSide";
import { useDispatch, useSelector } from "react-redux";
import { handleGetCurrentUser, handleGetUser } from "../store/user/handleUser";
import { Outlet, Route, Router, Routes } from "react-router-dom";
import SuspenseFallback from "./components/Commom/SuspenseFallback";
import Layout2 from "./components/Layout/Layout2";
import { Epath } from "./routes/routerConfig";
import AuthRoute from "./routes/AuthRoute";
import { getTokenFromLocalStorage } from "../utils/localStorage";
import UsersPage from "./pages/User/UsersPage";
import ActionUserPage from "./pages/User/ActionUserPage";
import SettingsUserPage from "./pages/User/SettingsUserPage";
import NewsPage from "./pages/News/NewsPage";
import ActionNews from "./pages/News/ActionNews";

const TestPage2 = lazy(() => import("./pages/TestPage2"));
const TestPage = lazy(() => import("./pages/TestPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const LoginPage = lazy(() => import("./pages/AuthPage/LoginPage"));
const DashboardPage = lazy(() => import("./pages/Dashboard/DashboardPage"));
const CategoriesPage = lazy(() => import("./pages/Category/CategoriesPage"));
const Layout = lazy(() => import("./components/Layout/Layout"));
const AddProductPage = lazy(() => import("./pages/Product/AddProductPage"));
const ProductsPage = lazy(() => import("./pages/Product/ProductsPage"));
const OrderPage = lazy(() => import("./pages/Order/OrderPage"));
const ProductDetailsPage = lazy(() =>
  import("./pages/Product/ProductDetailsPage")
);
const UpdateProductPage = lazy(() =>
  import("./pages/Product/UpdateProductPage")
);
const ActionCategoryPage = lazy(() =>
  import("./pages/Category/ActionCategoryPage")
);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleGetCurrentUser());
  }, [getTokenFromLocalStorage()]);

  const { dataCurrentUser } = useSelector((state) => state.user);

  const isAuthenticated = !!(
    dataCurrentUser &&
    Object.keys(dataCurrentUser).length &&
    getTokenFromLocalStorage()
  );
  return (
    <Suspense fallback={<SuspenseFallback></SuspenseFallback>}>
      <Routes>
        <Route element={<Layout></Layout>}>
          <Route
            element={
              <AuthRoute auth={true} isAuthenticated={isAuthenticated} />
            }
          >
            <Route
              path={Epath.dashboard}
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path={Epath.categories}
              element={<CategoriesPage></CategoriesPage>}
            ></Route>
            <Route
              path={Epath.addCategory}
              element={<ActionCategoryPage></ActionCategoryPage>}
            ></Route>
            <Route
              path={Epath.updateCategory}
              element={<ActionCategoryPage></ActionCategoryPage>}
            ></Route>
            <Route
              path={Epath.products}
              element={<ProductsPage></ProductsPage>}
            ></Route>
            <Route
              path={Epath.addproduct}
              element={<AddProductPage></AddProductPage>}
            ></Route>
            <Route
              path={Epath.updateProduct}
              element={<UpdateProductPage></UpdateProductPage>}
            ></Route>

            <Route
              path={Epath.productDetails}
              element={<ProductDetailsPage></ProductDetailsPage>}
            ></Route>

            <Route
              path={Epath.orders}
              element={<OrderPage></OrderPage>}
            ></Route>

            <Route path={Epath.users} element={<UsersPage></UsersPage>}></Route>
            <Route
              path={Epath.addUser}
              element={<ActionUserPage></ActionUserPage>}
            ></Route>
            <Route
              path={Epath.updateUser}
              element={<ActionUserPage></ActionUserPage>}
            ></Route>
            <Route
              path={Epath.settingUser}
              element={<SettingsUserPage></SettingsUserPage>}
            ></Route>

            <Route path={Epath.news} element={<NewsPage></NewsPage>}></Route>
            <Route
              path={Epath.addNews}
              element={<ActionNews></ActionNews>}
            ></Route>
            <Route
              path={Epath.updateNews}
              element={<ActionNews></ActionNews>}
            ></Route>
          </Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Route>

        <Route path={Epath.loginPage} element={<LoginPage></LoginPage>}></Route>

        <Route element={<Layout2 />}>
          <Route path={Epath.testPage} element={<TestPage></TestPage>}></Route>

          <Route element={<AuthRoute auth={true} isAuthenticated={true} />}>
            <Route path={Epath.testPage2} element={<TestPage2 />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
