import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import RegLogin from "./RegLogin";
import UserHeader from "./UserHeader";
import Form from "./SearchForm";

export default function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    setToken(localStorage.token);
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
