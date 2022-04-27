import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import Error from "../components/Error";

export default function Login() {
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

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
  };

  return (
    <>
      <Head>
        <meta name="title" content="Увійти до кабінету" key="title" />
        <meta
          name="description"
          content="Увійти до кабінету на порталі ЗнайдиМене."
          key="description"
        />
        <meta
          name="keywords"
          content="вхід, логін, кабінет, автентифікація, увійти до кабінету, увійти на ЗнайдиМене"
          key="keywords"
        />
        <title>Увійти до кабінету</title>
      </Head>
      {error ? <Error error={error} /> : ""}
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">Увійдіть до кабінету</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Електронна пошта
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            ref={emailRef}
            required
          />
          <div id="emailHelp" className="form-text">
            Ваша адреса не буде поширюватись третім особам.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Пароль
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            ref={passwordRef}
            aria-describedby="forgotPassword"
            required
          />
          <Link href="/user/recover">
            <a id="forgotPassword" title="Натисніть, щоб відновити">
              Забули пароль?
            </a>
          </Link>
        </div>
        <div className="md-3">
          <Link href="/register">
            <a id="forgotPassword" title="Натисніть, щоб зареєструватись">
              Немає акаунту? Створіть кабінет тут
            </a>
          </Link>
        </div>
        <button type="submit" className="btn btn-primary btn-lg mt-3">
          Увійти до кабінету
        </button>
      </form>
    </>
  );
}
