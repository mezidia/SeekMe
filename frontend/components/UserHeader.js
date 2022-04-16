import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import checkUser from "../utils/checkUser";

export default function UserHeader({ setToken }) {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    setToken(undefined);
    router.push("/");
  };

  const fetchUser = async () => {
    const user = await checkUser();
    setUserName(user.name);
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
