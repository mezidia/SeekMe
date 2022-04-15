import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Error from "../../components/Error";

export default function Post({ post }) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <div>
      {error ? <Error error={error} /> : null}
      <h1>Post name {post.full_name}</h1>
      <h2>Post last place - {post.last_place}</h2>
      <h2>Post description - {post.description}</h2>
      {token ? (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDelete(post.id)}
        >
          Danger
        </button>
      ) : null}
      {/* <image src={post.image} alt="image" /> */}
      <h2>
        <Link href={`/user/${post.owner_id}`}>
          <a>Author</a>
        </Link>
      </h2>
    </div>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const response = await fetch(`http://127.0.0.1:8000/posts/${id}`);
  const post = await response.json();
  return {
    props: { post },
  };
}
