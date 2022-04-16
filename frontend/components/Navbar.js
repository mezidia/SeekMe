import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import RegLogin from "./RegLogin";
import UserHeader from "./UserHeader";
import Form from "./SearchForm";

export default function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState(undefined);

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
      localStorage.removeItem("token");
      setToken(undefined);
    }
  };

  useEffect(() => {
    setToken(localStorage.token);
    checkUser();
  }, [token, router.asPath]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">ЗнайдиМене</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!token ? <RegLogin /> : <UserHeader setToken={setToken} />}
          </ul>
          <>
            <Link href="/posts">
              <a className="nav-link">Усі пости</a>
            </Link>
            <Form />
          </>
        </div>
      </div>
    </nav>
  );
}
