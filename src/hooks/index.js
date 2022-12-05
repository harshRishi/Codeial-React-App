import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { editProfile, login as userLogin, register } from '../api';
import jwt from 'jwt-decode';
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
    const userToken = getItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    if (userToken) {
      const user = jwt(userToken);
      setUser(user);
    }
    setLoading(false);
  }, []);
  //
  const updateUser = async (userId, name, password, confirmPassword) => {
    const response = await editProfile(userId, name, password, confirmPassword);
    console.log('Response : ', response);
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
  return {
    user,
    login,
    logout,
    loading,
    signup,
    updateUser,
  };
};
