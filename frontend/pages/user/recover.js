import { useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";

import Error from "../../components/Error";

export default function Recover() {
  const emailRef = useRef();
  const codeRef = useRef();
  const passwordRef = useRef();

  const [showCode, setShowCode] = useState(false);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendCode = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const response = await fetch(
      `http://127.0.0.1:8000/recover?email=${email}`,
      {
        method: "POST",
      }
    );
    const data = await response.json();
    if (!response.ok) {
      setError(data.detail);
    } else {
      setShowCode(true);
    }
  };

  const checkCode = async (e) => {
    e.preventDefault();
    const code = codeRef.current.value;
    const response = await fetch(
      `http://127.0.0.1:8000/recover/check?code=${code}`,
      {
        method: "POST",
      }
    );
    const data = await response.json();
    if (!response.ok) {
      setError(data.detail);
    } else {
      setToken(data.access_token);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    const email = emailRef.current.value;
    const response = await fetch(
      `http://127.0.0.1:8000/recover/update?email=${email}&password=${password}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      setError(data.detail);
    } else {
      setError(null);
      setSuccess(true);
    }
  };

  return (
    <>
      <Head>
        <title>Recover</title>
      </Head>
      {success ? (
        <div className="alert alert-success mt-2" role="alert">
          Ваш пароль успішно змінено! Увійдіть за допомогою нього{" "}
          <Link href="/login">
            <a>тут</a>
          </Link>
        </div>
      ) : null}
      {error ? <Error error={error} /> : ""}
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1">Введіть вашу пошту</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            ref={emailRef}
          />
          <div id="emailHelp" className="form-text">
            Ваша адреса не буде поширюватись третім особам.
          </div>
          <button
            type="submit"
            onClick={sendCode}
            className="btn btn-primary btn-lg mt-3"
          >
            Надіслати код на пошту
          </button>
        </div>
        {showCode ? (
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1">Введіть отриманий код</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              ref={codeRef}
            />
            <button
              type="submit"
              onClick={checkCode}
              className="btn btn-primary btn-lg mt-3"
            >
              Перевірити код
            </button>
          </div>
        ) : null}
        {token ? (
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1">Введіть новий пароль</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              ref={passwordRef}
            />
            <button
              type="submit"
              onClick={updateUser}
              className="btn btn-primary btn-lg mt-3"
            >
              Оновити пароль
            </button>
          </div>
        ) : null}
      </form>
    </>
  );
}
