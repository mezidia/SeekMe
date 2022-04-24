import Head from "next/head";

import Error from "../../../components/Error";
import PostList from "../../../components/PostList";

export default function Search({ posts, query }) {
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
      <PostList posts={posts} key={query} />
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
      <Error error={`На жаль, немає об'яв із таким запитом: ${query}`} />
    </>
  );
}

export async function getServerSideProps({ params: { query } }) {
  const response = await fetch(`http://127.0.0.1:8000/posts/search/${query}`);
  const posts = await response.json();
  return {
    props: {
      posts,
      query,
    },
  };
}
