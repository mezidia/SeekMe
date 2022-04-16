const checkUser = async () => {
  const token = localStorage.getItem("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  const response = await fetch(
    "http://127.0.0.1:8000/users/me",
    requestOptions
  );
  if (!response.ok) {
    return false;
  }
  const user = await response.json();
  return user;
};

export default checkUser;
