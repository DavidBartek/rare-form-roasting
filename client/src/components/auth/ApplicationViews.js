import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              {/* <Bikes /> */}
            </AuthorizedRoute>
          }
        />
        <Route
          path="home"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              {/* <Bikes /> */}
            </AuthorizedRoute>
          }
        />
        {/* Route group: creates 2 routes for workorders. */}
        {/* Route marked "index": will match to workorders with no extra url segments */}
        {/* create route: /workorders/create */}
        <Route path="tbd">
          <Route
          index
          element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                  {/* <WorkOrderList /> */}
              </AuthorizedRoute>
          }
          />
          <Route
          path="tbd"
          element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                  {/* <CreateWorkOrder /> */}
              </AuthorizedRoute>
          }
          />
        </Route>
        <Route
          path="tbd"
          element={
            // viewing this route requires admin privileges
            <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
              {/* <UserProfileList /> */}
            </AuthorizedRoute>
          }
        />
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
