export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  return token;
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return null;
  }
  return JSON.parse(user);
};

export const getUserName = () => {
  const user = getUser();
  if (!user) {
    return null;
  }
  return user.name;
};

export const getUserProfile = () => {
  const user = getUser();
  if (!user) {
    return null;
  }
  return user.profile;
};
