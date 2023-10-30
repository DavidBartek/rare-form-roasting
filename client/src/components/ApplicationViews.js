import { Link, Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./home/Home";
import CoffeeList from "./coffees/CoffeeList";
import CoffeeDetails from "./coffees/CoffeeDetails";
import InventoryManagerList from "./inventorymanager/InventoryManagerList";
import OrderManagerList from "./ordermanager/OrderManagerList";
import Profile from "./profile/Profile";
import UserOrdersList from "./userOrders/UserOrdersList";
import Checkout from "./checkout/Checkout";
import CheckoutConfirm from "./checkout/CheckoutConfirm";
import CreateCoffee from "./inventorymanager/CreateCoffee";

// note on auth...
// should each component that is viewable by logged in and non logged in user contain a ternary in the "element" prop?

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route index element={ 
            <Home />
        } />

        <Route path="profile">
          <Route index element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Profile loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          } />
        </Route>

        <Route path="orders">
          <Route index element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <UserOrdersList loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          } />
        </Route>

        <Route path="coffees">
          <Route index element={
            <CoffeeList />
          } />
            <Route path=":id" element={
              <CoffeeDetails loggedInUser={loggedInUser}/>
          } />
        </Route>
        
        <Route path="checkout">
          <Route index element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Checkout loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          } />
            <Route path="confirm" element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <CheckoutConfirm loggedInUser={loggedInUser}/>
              </AuthorizedRoute>
            } />
        </Route>


        {/* Admin views */}
        <Route path="inventorymanager">
          <Route index element={
            <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
              <InventoryManagerList loggedInUser={loggedInUser} roles={["Admin"]}/>
            </AuthorizedRoute>
          } />
            <Route path="create" element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <CreateCoffee loggedInUser={loggedInUser} roles={["Admin"]}/>
              </AuthorizedRoute>
            } />
        </Route>

        <Route path="ordermanager">
          <Route index element={
            <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
              <OrderManagerList />
            </AuthorizedRoute>
          } />
        </Route>
        
        {/* <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        /> */}
        <Route
          path="login"
          element={<Login loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={
      <>
        <h1>404: Page not found</h1>
        <Link to="/">Return home...</Link>
      </>} />
    </Routes>
  );
}
