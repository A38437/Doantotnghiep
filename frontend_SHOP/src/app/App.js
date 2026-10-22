import "../App.scss";
import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import SuspenseFallback from "./components/Commom/SuspenseFallback";
import { Epath } from "./routes/routerConfig";
import AuthRoute from "./routes/AuthRoute";
import { useDispatch, useSelector } from "react-redux";
import { getTokenFromLocalStorage } from "../utils/localStorage";
import { handleGetCurrentUser } from "../store/user/handleUser";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const TestPage2 = lazy(() => import("./pages/TestPage2"));
const TestPage = lazy(() => import("./pages/TestPage"));
const Layout2 = lazy(() => import("./components/Layout/Layout2"));
const LoginPage = lazy(() => import("./pages/AuthPage/LoginPage"));
const RegisterPage = lazy(() => import("./pages/AuthPage/RegisterPage"));
const ForgotPassPage = lazy(() => import("./pages/AuthPage/ForgotPassPage"));
const ResetPassPage = lazy(() => import("./pages/AuthPage/ResetPassPage"));
const CombineProductsPage = lazy(() =>
  import("./pages/Product/CombineProductsPage")
);
const ProductDetailsPage = lazy(() =>
  import("./pages/Product/ProductDetailsPage")
);
const LayoutDetails = lazy(() => import("./components/Layout/LayoutDetails"));
const LayoutPrimary = lazy(() => import("./components/Layout/LayoutPrimary"));
const ShoppingPage = lazy(() => import("./pages/ShoppingPage"));
const UserDashboard = lazy(() => import("./pages/UserDashboardPage"));
const LayoutUser = lazy(() => import("./components/Layout/LayoutUser"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CheckOutPage = lazy(() => import("./pages/CheckOutPage"));
const NewsDetailsPage = lazy(() => import("./pages/News/NewsDetailsPage"));
const NewsPage = lazy(() => import("./pages/News/NewsPage"));
const MyOrdersPage = lazy(() => import("./pages/MyOrdersPage"));
const OrderDetailsPage = lazy(() => import("./pages/OrderDetailsPage"));
const PaymentErrorPage = lazy(() => import("./pages/PaymentErrorPage"));
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage"));
const SettingsUserPage = lazy(() => import("./pages/SettingsUserPage"));

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(handleGetUser());
  // }, []);

  // const res = useSelector((state) => state.user.dataUser);
  // console.log("🚀 ~ App ~ res:", res);
  // const dispatch = useDispatch();

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
        <Route element={<LayoutPrimary></LayoutPrimary>}>
          <Route path={Epath.homePage} element={<HomePage></HomePage>}></Route>
          <Route
            path={Epath.register}
            element={<RegisterPage></RegisterPage>}
          ></Route>
          <Route
            path={Epath.loginPage}
            element={<LoginPage></LoginPage>}
          ></Route>
          <Route
            path={Epath.forgotPass}
            element={<ForgotPassPage></ForgotPassPage>}
          ></Route>
          <Route
            path={Epath.contact}
            element={<ContactPage></ContactPage>}
          ></Route>
        </Route>

        {/* Not found */}
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>

        {/* -------------Không Layout------------------------------- */}

        <Route
          path={Epath.resetPass}
          element={<ResetPassPage></ResetPassPage>}
        ></Route>

        {/* <Route
          element={<AuthRoute auth={true} isAuthenticated={isAuthenticated} />}
        >
        </Route> */}
        <Route
          path={Epath.paymentSuccess}
          element={<PaymentSuccessPage></PaymentSuccessPage>}
        ></Route>

        <Route
          path={Epath.paymentError}
          element={<PaymentErrorPage></PaymentErrorPage>}
        ></Route>

        {/* ----------------Layout Details---------------------------- */}

        <Route element={<LayoutDetails />}>
          <Route
            path={Epath.productDetails}
            element={<ProductDetailsPage></ProductDetailsPage>}
          ></Route>
          <Route
            path={Epath.productsCombine}
            element={<CombineProductsPage></CombineProductsPage>}
          ></Route>
          <Route
            path={Epath.shopping}
            element={<ShoppingPage></ShoppingPage>}
          ></Route>

          <Route path={Epath.news} element={<NewsPage></NewsPage>}></Route>
          <Route
            path={Epath.newsDetail}
            element={<NewsDetailsPage></NewsDetailsPage>}
          ></Route>

          <Route
            element={
              <AuthRoute auth={true} isAuthenticated={isAuthenticated} />
            }
          >
            <Route
              path={Epath.checkout}
              element={<CheckOutPage></CheckOutPage>}
            ></Route>
          </Route>
        </Route>

        {/* LayoutUser */}
        <Route element={<LayoutUser />}>
          <Route
            element={
              <AuthRoute auth={true} isAuthenticated={isAuthenticated} />
            }
          >
            <Route
              path={Epath.userDashboard}
              element={<UserDashboard></UserDashboard>}
            ></Route>
            <Route
              path={Epath.myOrders}
              element={<MyOrdersPage></MyOrdersPage>}
            ></Route>
            <Route
              path={Epath.orderDetail}
              element={<OrderDetailsPage></OrderDetailsPage>}
            ></Route>
            <Route
              path={Epath.settingUser}
              element={<SettingsUserPage></SettingsUserPage>}
            ></Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
