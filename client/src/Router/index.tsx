import "antd/dist/antd.css";
import NotFoundPage from "pages/NotFound/Error";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </UserState>
  );
}
