import 'antd/dist/antd.css';
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import routes from '../Router/routes';
import UserState from '../context/UserState';
import Error from './Error';
import PageWrapper from './Home';
export default function App(): JSX.Element {
  return (
      <UserState>
        <Router>
          <Routes>
          {routes.map(({ Component, path }) => {
            return (
              <Route
              key={path}
              path={path}
              element={
                <PageWrapper>
                  <Component  />
                </PageWrapper>
              }
              />
            )
          })} 
            <Route path="*" element={<Error />}/>
          </Routes>
        </Router>
      </UserState>
  )
}
