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
        <title>Пошук об'яв</title>
        <meta name="title" content="Пошук об'яв" key="title" />
        <meta
          name="description"
          content="Пошук об'яв на ЗнайдиМене."
          key="description"
        />
        <meta
          name="keywords"
          content="пошук, пошук об'яв, пошук об'яв про зниклих людей, результат пошуку, пошук на ЗнайдиМене, пошук зниклих людей на ЗнайдиМене"
          key="keywords"
        />
      </Head>
      <PostList posts={posts} />
    </>
  ) : (
    <>
      <Head>
        <title>Помилка пошуку</title>
        <meta name="title" content="Помилка пошуку" key="title" />
        <meta
          name="description"
          content="Невдалий пошук об'яв на ЗнайдиМене."
          key="description"
        />
        <meta
          name="keywords"
          content="невдалий пошук, немає результату, невдалий пошук на ЗнайдиМене, немає об'яв на ЗнайдиМене"
          key="keywords"
        />
      </Head>
      <Error error={`На жаль, немає об'яв із таким запитом: ${text}`} />
    </>
  );
}
