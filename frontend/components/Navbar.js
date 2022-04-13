import { useEffect, useState } from "react";
import RegLogin from "./RegLogin";
import UserHeader from "./UserHeader";

export default function Navbar() {
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    setToken(localStorage.token);
  }, [token]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          SeekMe
        </a>
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
            {!token ? <RegLogin /> : <UserHeader />}
          </ul>
        </div>
      </div>
    </nav>
  );
}
