import "antd/dist/antd.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Error from "../components/Error";
import PageWrapper from "../components/Home";
import UserState from "../context/UserState";
import routes from "./routes";
export default function AppRouter(): JSX.Element {
  return (
    <UserState>
      <Router>
        <Routes>
          {routes.map(({ Component, ...route }) => {
            return (
              <Route
                {...route}
                key={route.path}
                path={route.path}
                element={
                  <PageWrapper>
                    <Component />
                  </PageWrapper>
                }
              />
            );
          })}
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </UserState>
  );
}
