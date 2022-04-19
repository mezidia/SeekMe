import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";

import Error from "../components/Error";
import PostList from "../components/PostList";

export default function Search() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const text = router.query.search;

  const getPosts = async () => {
    const response = await fetch(`http://127.0.0.1:8000/posts/search/${text}`);
    const posts = await response.json();
    setPosts(posts);
  };

  useEffect(() => {
    getPosts();
  }, [text]);

  return posts.length ? (
    <>
      <Head>
        <title>Пошук постів</title>
      </Head>
      <PostList posts={posts} />
    </>
  ) : (
    <>
      <Head>
        <title>Помилка пошуку</title>
      </Head>
      <Error error={`No posts with query: ${text}`} />
    </>
  );
}
