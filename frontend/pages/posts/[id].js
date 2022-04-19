import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import Error from "../../components/Error";
import EditPost from "../../components/EditPost";
import { storage } from "../../firebase";
import checkUser from "../../utils/checkUser";

export default function Post({ post }) {
  const router = useRouter();

  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);

  const [newName, setNewName] = useState(post.full_name);
  const [newPlace, setNewPlace] = useState(post.last_place);
  const [newDescription, setNewDescription] = useState(post.description);
  const [newImage, setNewImage] = useState(null);

  const handleDelete = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/posts/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const data = await response.json();
      setError(data.detail);
    } else {
      router.push("/");
    }
  };

  const postImage = (id) => {
    const image = newImage;
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
        updatePost(`images/${image.name}`, id);
      }
    );
  };

  const deleteImage = (id) => {
    const desertRef = ref(storage, post.image);
    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        postImage(id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updatePost = async (imagePath, id) => {
    const response = await fetch(`http://127.0.0.1:8000/posts/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        full_name: newName,
        last_place: newPlace,
        description: newDescription,
        image: imagePath,
      }),
    });
    if (!response.ok) {
      const data = await response.json();
      setError(data.detail);
    } else {
      setIsUpdating(false);
      router.push("/posts/[id]", `/posts/${post.id}`);
    }
  };

  const handleUpdate = async (id) => {
    if (isUpdating) {
      if (newImage) {
        deleteImage(id);
      } else {
        updatePost(post.image, id);
      }
    } else setIsUpdating(!isUpdating);
  };

  const getImage = (imagePath) => {
    getDownloadURL(ref(storage, imagePath))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        setPhotoUrl(url);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const checkAuthor = async () => {
    const user = await checkUser();
    if (user.id === post.owner_id) {
      setIsAuthor(true);
    } else setIsAuthor(false);
  };

  useEffect(() => {
    checkAuthor();
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
    getImage(post.image);
  });

  return (
    <>
      <Head>
        <title>{post.full_name}</title>
      </Head>
      {error ? <Error error={error} /> : null}
      {!isUpdating ? (
        <>
          <h1>
            Ім'я посту: <u>{post.full_name}</u>
          </h1>
          <h2>Останнє місце: {post.last_place}</h2>
          <h2>Опис: {post.description}</h2>
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="image"
              className="img-fluid"
              width={300}
              height={300}
            />
          ) : (
            <h3>Фото немає!</h3>
          )}
          <h2>
            <Link href={`/user/${post.owner_id}`}>
              <a>Сторінка автора</a>
            </Link>
          </h2>
        </>
      ) : (
        <EditPost
          post={post}
          setNewName={setNewName}
          setNewPlace={setNewPlace}
          setNewDescription={setNewDescription}
          setNewImage={setNewImage}
        />
      )}
      {token && isAuthor ? (
        <div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDelete(post.id)}
          >
            Видалити
          </button>
          <button
            type="button"
            className="btn btn-warning ms-2"
            onClick={() => handleUpdate(post.id)}
          >
            {isUpdating ? "Зберегти" : "Оновити"}
          </button>
        </div>
      ) : null}
    </>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const response = await fetch(`http://127.0.0.1:8000/posts/${id}`);
  const post = await response.json();
  return {
    props: { post },
  };
}
