import { Route, Routes, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';
// import { getPosts } from '../api';
import { Home, Login, Signup, Settings, UserProfile } from '../pages';
import { Loader, Navbar } from './';

// making private route
const PrivateRoute = ({ children, redirectTo }) => {
  const auth = useAuth(),
    location = useLocation();
  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/Login" state={{ from: location }} />;
  }
  return <Outlet />;
};

// dummy component
const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  const auth = useAuth();
  // console.log('auth', auth);
  if (auth.loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/*New version of switch is Route*/}
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        {/* Private routes  */}
        <Route element={<PrivateRoute />}>
          <Route path="/settings" element=<Settings /> />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/user/:userId" element=<UserProfile /> />
        </Route>

        {/* Global Route */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
