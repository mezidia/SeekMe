import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Error from "../../components/Error";
import EditPost from "../../components/EditPost";

export default function Post({ post }) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const newNameRef = useRef();
  const newPlaceRef = useRef();
  const newDescriptionRef = useRef();
  const newWayRef = useRef();

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

  const handleUpdate = async (id) => {
    setIsUpdating(!isUpdating);
    if (isUpdating) {
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
          image: newWayRef.current.value,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.detail);
      } else {
        router.push(`/post/${id}`);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <>
      {error ? <Error error={error} /> : null}
      {!isUpdating ? (
        <>
          <h1>Post name {post.full_name}</h1>
          <h2>Post last place - {post.last_place}</h2>
          <h2>Post description - {post.description}</h2>
          {/* <image src={post.image} alt="image" /> */}
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
          newWayRef={newWayRef}
        />
      )}
      {token ? (
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
