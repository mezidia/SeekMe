import { useRef } from "react";

import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();

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
    console.log(data);
    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      router.push("/");
    } else {
      alert(data.message);
    }
  };

  return (
    <form>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          ref={emailRef}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          ref={passwordRef}
        />
      </div>
      <button type="submit" onClick={handleSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
