import { useRouter } from "next/router";
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
    console.log(posts);
  }, [text]);

  return posts.length ? (
    <PostList posts={posts} />
  ) : (
    <Error error={`No posts with query: ${text}`} />
  );
}
