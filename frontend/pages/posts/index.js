import Head from "next/head";

import PostList from "../../components/PostList";

export default function Posts({ posts }) {
  return (
    <>
      <Head>
        <title>Усі об'яви</title>
        <meta name="title" content="Усі об'яви" key="title" />
        <meta
          name="description"
          content="Перелік усіх об'яв на сайті ЗнайдиМене."
          key="description"
        />
        <meta
          name="keywords"
          content="усі об'яви, об'яви, усі об'яви про зниклих людей, усі об'яви про знайдених людей, усі об'яви на ЗнайдиМене"
          key="keywords"
        />
      </Head>
      <div>
        {posts.length > 0 ? <PostList posts={posts} /> : <p>Немає постів</p>}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const data = await fetch("http://127.0.0.1:8000/posts/");
  const posts = await data.json();
  return {
    props: {
      posts,
    },
  };
}
