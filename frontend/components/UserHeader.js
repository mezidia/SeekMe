import Link from "next/link";
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
      localStorage.removeItem("token");
    } else {
      const user = await response.json();
      setUserName(user.name);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <li className="nav-item">
        <span className="nav-link fw-bold">Hello, {userName}</span>
      </li>
      <li className="nav-item">
        <Link href="/posts/new">
          <a className="btn btn-outline-success" role="button">
            Створити пост
          </a>
        </Link>
      </li>
      <li className="nav-item">
        <button className="btn btn-outline-secondary ms-2" onClick={logout}>
          Вийти
        </button>
      </li>
    </>
  );
}
