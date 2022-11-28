import { useEffect, useState } from 'react';

import { getPosts } from '../api';
import { Home } from '../pages';
import { Loader } from './';

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
  }, [posts]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Home posts={posts} />
    </div>
  );
}

export default App;
