import { useRef, useState } from "react";
import { useRouter } from "next/router";

import Error from "../components/Error";

export default function Register() {
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();
  const nameRef = useRef();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const phone_number = phoneRef.current.value;
    const name = nameRef.current.value;

    const response = await fetch("http://127.0.0.1:8000/users/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        phone_number,
        name,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.detail);
    } else {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(
          `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
        ),
      });
      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        router.push("/");
      } else {
        setError(data.detail);
      }
    }
  };

  return (
    <>
      {error ? <Error error={error} /> : ""}
      <form>
        <div className="mb-3">
          <label for="exampleInputName1" className="form-label">
            Ім'я
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            aria-describedby="emailHelp"
            ref={nameRef}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Пошта
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            ref={emailRef}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Пароль
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            ref={passwordRef}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPhone1" className="form-label">
            Мобільний номер телефону
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPhone1"
            ref={phoneRef}
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Зареєструватись
        </button>
      </form>
    </>
  );
}
