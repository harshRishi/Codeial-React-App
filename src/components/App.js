import { useEffect } from 'react';
import { getPosts } from '../api/index';

function App() {
  const fetchPosts = async () => {
    try {
      return await getPosts();
    } catch (error) {
      console.log('Error in fetch 1', error);
    }
  };
  useEffect(() => {
    const postsData = fetchPosts();
    console.log('response', postsData);
  }, []);
  return (
    <div className="App">
      <h1>Hello world</h1>
    </div>
  );
}

export default App;
