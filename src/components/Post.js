import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createComment, toggleLike } from '../api';
import { useAuth, usePosts } from '../hooks';
import styles from '../styles/home.module.css';
import { Comment } from './';

const Post = ({ post }) => {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);
  console.log(creatingComment);
  const posts = usePosts(),
    auth = useAuth();
  const Navigate = useNavigate();

  const handleAddComment = async (e) => {
    if (!auth.user) {
      Navigate('/Login');
      return;
    }
    if (e.key === 'Enter') {
      setCreatingComment(true);

      const response = await createComment(comment, post._id);

      if (response.success) {
        setComment('');
        posts.addComment(response.data.comment, post._id);
        // toast
        toast.success('Comment created successfully!');
      } else {
        // toast
        toast.error(response.message);
      }
      setCreatingComment(false);
    }
  };

  const handlePostLikeClick = async () => {
    if (!auth.user) {
      Navigate('/Login');
      return;
    }
    const response = await toggleLike(post._id, 'Post');
    if (response.success) {
      if (response.data.deleted) {
        toast.success('UnLiked');
      }
      toast.success('Liked');
    } else {
      toast.error(response.error);
    }
  };

  return (
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
            {/* <button> */}
            <img
              onClick={handlePostLikeClick}
              src="https://cdn-icons-png.flaticon.com/512/3237/3237429.png"
              alt="likes-icon"
            />
            {/* </button> */}
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
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>
        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={`post-comment-${comment._id}`} />
          ))}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

Post.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default Post;
