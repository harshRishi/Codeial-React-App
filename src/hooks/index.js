import { useContext, useEffect, useState } from 'react';
import jwt from 'jwt-decode';

import { AuthContext, PostsContext } from '../providers';
import {
  editProfile,
  fetchUserFriends,
  login as userLogin,
  register,
  getPosts,
} from '../api';
import {
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  removeItemInLocalStorage,
  getItemInLocalStorage,
} from '../utils';

export const useAuth = () => {
  // we're making this so that we don't have useContext instead we'll call
  // useAuth hook
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserDetails = async () => {
      const userToken = getItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY);
      if (userToken) {
        const user = jwt(userToken);
        // not only the user info but we also want friends of that user
        const response = await fetchUserFriends();
        let friends = [];
        if (response.success) {
          friends = response.data.friends;
        }
        setUser({
          ...user,
          friends,
        });
      }
      setLoading(false);
    };
    getUserDetails();
  }, []);

  const updateUser = async (userId, name, password, confirmPassword) => {
    const response = await editProfile(userId, name, password, confirmPassword);
    if (response.success) {
      setUser(response.data.user);
      // first delete the old token
      removeItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY);
      // set the updated token to update data in localStorage as well
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const login = async (email, password) => {
    const response = await userLogin(email, password);
    if (response.success) {
      // set the user data
      setUser(response.data.user);
      // also store this data in localStorage(keu, value) key we have defined in the constants file in utils
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  // Sign up logic
  const signup = async (name, email, password, confirmPassword) => {
    const response = await register(name, email, password, confirmPassword);
    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    // unset the user and alos delete userinfo from localStorage
    setUser(null);
    removeItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  // function to show updated user friends' list
  const updateUserFriends = (addFriend, friend) => {
    // all user data with prev friends list and the new friend added to it
    if (addFriend) {
      setUser({
        ...user,
        friends: [...user.friends, friend],
      });
      return;
    }
    // In case false we we'll implement the Unfriend logic
    // That friend from the friend's array
    const newFriends = user.friends.filter(
      (f) => f.to_user._id !== friend.to_user._id
    );

    setUser({
      ...user,
      friends: newFriends,
    });
  };

  return {
    user,
    login,
    logout,
    loading,
    signup,
    updateUser,
    updateUserFriends,
  };
};

export const usePosts = () => {
  return useContext(PostsContext);
};

export const useProvidePosts = () => {
  const [posts, setPosts] = useState(null);
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

  const addPostToState = (post) => {
    const newPost = [post, ...posts];
    setPosts(newPost);
  };

  const addComment = (comment, postId) => {
    const newPosts = posts.map((post) => {
      if (post._id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    });

    setPosts(newPosts);
  };

  return {
    data: posts,
    loading,
    addPostToState,
    addComment,
  };
};
