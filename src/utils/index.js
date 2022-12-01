export * from './constants';

// Incase of page refresh our app will reset the user to null so we need check for token and decode the user information and set the user back again
export const setItemInLocalStorage = (key, value) => {
  if (!key || !value) {
    return console.error('Can not store in localStorage');
  }
  const valueToStore =
    typeof value !== 'string' ? JSON.stringify(value) : value;

  localStorage.setItem(key, valueToStore);
};
export const getItemInLocalStorage = (key) => {
  if (!key) {
    return console.error('Can not get the value from localStorage');
  }
  return localStorage.getItem(key);
};
export const removeItemInLocalStorage = (key) => {
  if (!key) {
    return console.error('Can not find the value againest this key');
  }
  localStorage.removeItem(key);
};

// params will be an object {username: harsh, password: 123123}
export const getFormBody = (params) => {
  let formBody = [];

  // body is arr of user and password
  for (let property in params) {
    // javascript method
    let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); // harsh 123 => harsh%2020123

    formBody.push(encodedKey + '=' + encodedValue); // concatenate
  }
  return formBody.join('&'); // 'username=harsh&password=123123'
};
