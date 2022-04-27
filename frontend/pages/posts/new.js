import { useRef, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import Error from "../../components/Error";
import { storage } from "../../firebase";
import checkUser from "../../utils/checkUser";

export default function NewPost() {
  const router = useRouter();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const placeRef = useRef();
  const imageRef = useRef();

  const [error, setError] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const createPost = async (imagePath) => {
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
        image: imagePath,
      }),
    });

    const response_data = await response.json();
    if (!response.ok) {
      console.error("Post create error");
      setError(response_data.detail);
    } else {
      router.push(`/posts/${response_data.id}`);
    }
  };

  const postImage = async () => {
    const image = imageRef.current.files[0];
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.error(error);
        setError(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          createPost(`images/${image.name}`);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    postImage();
  };

  const checkAuth = async () => {
    const token = await checkUser();
    if (token) {
      setIsAuthorized(true);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Head>
        <title>Створити об'яву</title>
        <meta name="title" content="Створити об'яву" key="title" />
        <meta
          name="description"
          content="Створити об'яву про знайдену людину."
          key="description"
        />
        <meta
          name="keywords"
          content="створення, створити об'яву, створити об'яву про людину, створити об'яву на ЗнайдиМене, створити об'яву на сайті ЗнайдиМене"
          key="keywords"
        />
      </Head>
      {error ? <Error error={error} /> : null}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
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
            disabled={isAuthorized ? false : true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPlace" className="form-label">
            Останнє місце перебування
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPlace"
            placeholder="Останнє місце перебування"
            ref={placeRef}
            required
            disabled={isAuthorized ? false : true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputDescription" className="form-label">
            Опис
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputDescription"
            placeholder="Опис"
            ref={descriptionRef}
            required
            disabled={isAuthorized ? false : true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputWay" className="form-label">
            Зображення
          </label>
          <input
            type="file"
            className="form-control"
            id="exampleInputWay"
            placeholder="Зображення"
            ref={imageRef}
            required
            disabled={isAuthorized ? false : true}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Створити
        </button>
      </form>
    </>
  );
}
