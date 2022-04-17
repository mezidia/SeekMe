import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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

  const newNameRef = useRef();
  const newPlaceRef = useRef();
  const newDescriptionRef = useRef();
  const imageRef = useRef();

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

  const postImage = async (id) => {
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
      updatePost(data, id);
    }
  };

  const updatePost = async (data, id) => {
    const response = await fetch(`http://127.0.0.1:8000/posts/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        full_name: newNameRef.current.value,
        last_place: newPlaceRef.current.value,
        description: newDescriptionRef.current.value,
        image: data.file_path,
      }),
    });
    if (!response.ok) {
      const data = await response.json();
      setError(data.detail);
    } else {
      router.push(`/post/${id}`);
    }
  };

  const handleUpdate = async (id) => {
    setIsUpdating(!isUpdating);
    if (isUpdating) {
      postImage(id);
    }
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
  }, []);

  return (
    <>
      <Head>
        <title>{post.full_name}</title>
      </Head>
      {error ? <Error error={error} /> : null}
      {!isUpdating ? (
        <>
          <h1>Post name {post.full_name}</h1>
          <h2>Post last place - {post.last_place}</h2>
          <h2>Post description - {post.description}</h2>
          <img
            src={photoUrl}
            alt="image"
            className="img-fluid"
            width={300}
            height={300}
          />
          <h2>
            <Link href={`/user/${post.owner_id}`}>
              <a>Author</a>
            </Link>
          </h2>
        </>
      ) : (
        <EditPost
          post={post}
          newNameRef={newNameRef}
          newPlaceRef={newPlaceRef}
          newDescriptionRef={newDescriptionRef}
          imageRef={imageRef}
        />
      )}
      {token && isAuthor ? (
        <>
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
        </>
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
