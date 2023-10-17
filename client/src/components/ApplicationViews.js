import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./home/Home";
import CoffeeList from "./coffees/CoffeeList";
import CoffeeDetails from "./coffees/CoffeeDetails";
import InventoryManagerList from "./inventorymanager/InventoryManagerList";
import OrderManagerList from "./ordermanager/OrderManagerList";

// note on auth...
// should each component that is viewable by logged in and non logged in user contain a ternary in the "element" prop?

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route index element={ 
            <Home />
        } />

        <Route path="coffees">
          <Route index element={
            <CoffeeList />
          } />
            <Route path=":id" element={
              <CoffeeDetails />
          } />
        </Route>
          
        <Route path="inventorymanager">
          <Route index element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <InventoryManagerList roles={["Admin"]} loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          } />
        </Route>

        <Route path="ordermanager">
          <Route index element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <OrderManagerList roles={["Admin"]} loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          } />
        </Route>
        
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  );
}
