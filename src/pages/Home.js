import { Post, Loader, FriendsList, CreatePost } from '../components';
import styles from '../styles/home.module.css';
import { useAuth, usePosts } from '../hooks';

const Home = () => {
  const auth = useAuth();
  const posts = usePosts();

  // While fetching the data
  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        {auth.user && <CreatePost />}
        {/* mapping the array of post which we have recieve as props so we also need key and we have passed that as post._id*/}
        {posts.data.map((post) => (
          <Post post={post} key={`post-${post._id}`} />
        ))}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};

// // this will check if the props is array or not
// Home.propTypes = {
//   posts: PropsTypes.array.isRequired,
// };

export default Home;
