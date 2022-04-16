import { useRef, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import checkUser from "../../utils/checkUser";
import Error from "../../components/Error";

export default function NewPost() {
  const router = useRouter();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const placeRef = useRef();
  const imageRef = useRef();

  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const createPost = async (data) => {
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const place = placeRef.current.value;
    const token = localStorage.getItem("token");
    const response = await fetch("http://127.0.0.1:8000/posts/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        full_name: name,
        description,
        last_place: place,
        image: data.file_path,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.detail);
    } else {
      router.push(`/posts${data.id}`);
    }
  };

  const postImage = async () => {
    const formData = new FormData();
    const image = imageRef.current.files[0];
    formData.append("file", image);

    const response = await fetch("http://127.0.0.1:8000/posts/add/image/", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.detail);
    } else {
      createPost(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    postImage();
  };

  useEffect(() => {
    if (checkUser()) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Створити пост</title>
      </Head>
      {error ? <Error error={error} /> : null}
      {!isAuthenticated ? (
        <Error error={"You need to be authenticated"} />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
              Повне ім'я
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              aria-describedby="emailHelp"
              placeholder="Ім'я"
              ref={nameRef}
              required
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPlace" className="form-label">
              Місце проживання
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPlace"
              placeholder="Місце проживання"
              ref={placeRef}
              required
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputDescription" className="form-label">
              Опис
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputDescription"
              placeholder="Опис"
              ref={descriptionRef}
              required
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputWay" className="form-label">
              Зображення
            </label>
            <input
              type="file"
              className="form-control"
              id="exampleInputWay"
              placeholder="Зображення"
              ref={imageRef}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Створити
          </button>
        </form>
      )}
    </>
  );
}
