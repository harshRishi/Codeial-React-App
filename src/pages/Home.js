import PropsTypes from 'prop-types'; // this lib just chech which type of prop is been passed
import styles from '../styles/home.module.css';
import PostComment from '../components/comments';

const Home = ({ posts }) => {
  console.log(posts);
  return (
    <div className={styles.postsList}>
      {/* mapping the array of post which we have recieve as props so we also need key and we have passed that as post._id*/}
      {posts.map((post) => (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/9042/9042167.png"
                alt="user-pic"
              />
              <div>
                <span className={styles.postAuthor}>{post.user.name}</span>
                <span className={styles.postTime}>a minute ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.conent}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3237/3237429.png"
                  alt="likes-icon"
                />
                <span>5</span>
              </div>

              <div className={styles.postCommentsIcon}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/8679/8679644.png"
                  alt="comments-icon"
                />
                <span>2</span>
              </div>
            </div>
            <div className={styles.postCommentBox}>
              <input placeholder="Start typing a comment" />
            </div>
            <div className={styles.postCommentsList}>
              {post.comments.map((comment) => {
                return <PostComment key={post._id} comment={comment} />;
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// this will check if the props is array or not
Home.propTypes = {
  posts: PropsTypes.array.isRequired,
};

export default Home;
