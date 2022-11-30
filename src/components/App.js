import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { getPosts } from '../api';
import { Home, Login } from '../pages';
import { Loader, Navbar } from './';

// dummy component
const About = () => {
  return <h1>About</h1>;
};
const UserInfo = () => {
  return <h1>UserInfo</h1>;
};
const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // this will fetch the data from the API call
  const fetchPosts = async () => {
    const response = await getPosts();

    if (response.success) {
      setPosts(response.data.posts);
    }

    setLoading(false);
  };
  // set the data
  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Navbar />
      <Routes> {/*New version of switch*/}
        <Route path="/" element={<Home posts={posts} />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/user/:userID" element={<UserInfo />} />
        <Route path="/about" element={<About />} />
        {/* Incase no route matches render the below route */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
