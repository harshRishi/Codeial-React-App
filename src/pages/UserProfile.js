import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/settings.module.css';
import { useParams, Navigate } from 'react-router-dom';
import { Loader } from '../components';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import { useAuth } from '../hooks';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);
  let { userId } = useParams();
  const auth = useAuth();

  // check friendship
  // console.log(auth.user);
  // const checkFriendship = () => {
  //   const friendsArr = auth.user.friendships;
  //   for (let i in friendsArr) {
  //     if (i._id === userId) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetchUserProfile(userId);
      if (response.success) {
        setUser(response.data.user);
      } else {
        toast.error('Unable to fetch User details');
        return <Navigate to={'/'} />;
      }
      setLoading(false);
    };
    fetchUser();
  }, [userId]);

  if (loading) {
    return <Loader />;
  }

  // const checkIfUserIsAFriend = () => {
  //   const friends = auth.user.friends;

  //   const friendIds = friends.map((friend) => friend.to_user._id);
  //   const index = friendIds.indexOf(userId);

  //   if (index !== -1) {
  //     return true;
  //   }

  //   return false;
  // };

  const hanldeRemoveFriend = async () => {
    setRequestInProgress(true);
    const response = await removeFriend(userId);
    if (response.success) {
      // response will not going to have the removed freind info\
      const friendship = auth.user.friends.filter(
        (friend) => friend.to_user === userId
      );
      auth.updateUserFriends(false, friendship[0]);
      toast.success(response.message);
    } else {
      toast.error('Can not remove friend');
      console.error(response.message);
    }
    setRequestInProgress(false);
  };

  const hanldeFriendRequest = async () => {
    setRequestInProgress(true);
    const response = await addFriend(userId);
    if (response.success) {
      const { friendship } = response.data; // console.log the api for details
      auth.updateUserFriends(true, friendship);
      toast.success(response.message);
    } else {
      toast.error('Can not add friend');
      console.error(response.message);
    }
    setRequestInProgress(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {/* {checkIfUserIsAFriend() ? ( */}
        <button
          onClick={hanldeRemoveFriend}
          className={`button ${styles.saveBtn}`}
          disabled={requestInProgress}
        >
          {requestInProgress ? `Removing friend...` : `Remove Friend`}
        </button>
        {/* ) : ( */}
        <button
          onClick={hanldeFriendRequest}
          disabled={requestInProgress}
          className={`button ${styles.saveBtn}`}
        >
          {requestInProgress ? `Adding friend...` : `Add Friend`}
        </button>
        {/* )} */}
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

export default UserProfile;
