import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UserHeader({ setToken }) {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    setToken(undefined);
    router.push("/");
  };

  const fetchUser = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await data.json();
    const user = users[Math.floor(Math.random() * users.length)];
    setUserName(user.name);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <li className="nav-item">Hello, {userName}</li>
      <li className="nav-item">
        <p className="nav-link" onClick={logout}>
          Вихід
        </p>
      </li>
    </>
  );
}
