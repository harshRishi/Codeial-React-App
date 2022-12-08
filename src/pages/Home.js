import { Link } from 'react-router-dom';
import { Comment, Loader, FriendsList, CreatePost } from '../components';
import { useAuth, usePosts } from '../hooks';
// import PropsTypes from 'prop-types'; // this lib just chech which type of prop is been passed
import styles from '../styles/home.module.css';

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
          <div className={styles.postWrapper} key={`post-${post._id}`}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/9042/9042167.png"
                  alt="user-pic"
                />
                <div>
                  {/* Pass the current state to the redirecting page in state as a prop to Link component */}
                  {/* Also we can access this state using useLocation hook */}
                  <Link
                    to={{
                      pathname: `/user/${post.user._id}`,
                      state: {
                        user: post.user,
                      },
                    }}
                    className={styles.postAuthor}
                  >
                    {post.user.name}
                  </Link>
                  <span className={styles.postTime}>a minute ago</span>
                </div>
              </div>
              <div className={styles.postContent}>{post.content}</div>

              <div className={styles.postActions}>
                <div className={styles.postLike}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3237/3237429.png"
                    alt="likes-icon"
                  />
                  <span>{post.likes.length}</span>
                </div>

                <div className={styles.postCommentsIcon}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/8679/8679644.png"
                    alt="comments-icon"
                  />
                  <span>{post.comments.length}</span>
                </div>
              </div>
              <div className={styles.postCommentBox}>
                <input placeholder="Start typing a comment" />
              </div>
              <div className={styles.postCommentsList}>
                {post.comments.map((comment) => (
                  <Comment comment={comment} />
                ))}
              </div>
            </div>
          </div>
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
