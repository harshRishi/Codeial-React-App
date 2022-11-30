import PropTypes from 'prop-types';
import styles from '../styles/home.module.css';

const Comment = ({ comment }) => {
  return (
    <div className={styles.postCommentsList}>
      <div className={styles.postCommentsItem}>
        <div className={styles.postCommentHeader}>
          <span className={styles.postCommentAuthor}>Bill</span>
          <span className={styles.postCommentTime}>a minute ago</span>
          <span className={styles.postCommentLikes}>22</span>
        </div>

        <div className={styles.postCommentContent}>Random comment</div>
      </div>
    </div>
  );
};

Comment.proptype = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
