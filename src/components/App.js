import { Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks';

// import { getPosts } from '../api';
import { Home, Login, Signup } from '../pages';
import { Loader, Navbar } from './';

// dummy component
const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  const auth = useAuth();
  if (auth.loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/*New version of switch*/}
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        {/* Incase no route matches render the below route */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
