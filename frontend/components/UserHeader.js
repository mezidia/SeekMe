import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import checkUser from "../utils/checkUser";

export default function UserHeader({ setToken }) {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    setToken(undefined);
    router.push("/");
  };

  const fetchUser = async () => {
    const user = await checkUser();
    if (user) {
      setUserName(user.name);
      setUserId(user.id);
    } else {
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <li className="nav-item">
        <span className="nav-link fw-bold">Здраствуйте, {userName}</span>
      </li>
      <li className="nav-item">
        <Link href="/posts/new">
          <a className="btn btn-outline-success" role="button">
            Створити об'яву
          </a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href={`/user/${userId}`}>
          <a className="btn btn-outline-primary ms-2" role="button">
            Мої об'яви
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
