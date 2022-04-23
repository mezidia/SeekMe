import Head from "next/head";

import PostList from "../../components/PostList";

export default function Home({ user }) {
  return (
    <>
      <Head>
        <title>Усі об'яви користувача: {user.name}</title>
        <meta
          name="title"
          content={`Усі об'яви користувача: ${user.name}`}
          key="title"
        />
        <meta
          name="description"
          content={`Об'яви користувача: ${user.name}`}
          key="description"
        />
        <meta
          name="keywords"
          content={`об'яви автора, ${user.name}, ${user.email}, ${user.phone_number}`}
          key="keywords"
        />
      </Head>
      <div>
        <h1>
          Усі пости від користувача: <u>{user.name}</u>
        </h1>
        <h2>
          Електронний адрес:{" "}
          <a href={`mailto:${user.email}`} title="Написати">
            {user.email}
          </a>
        </h2>
        <h2>Телефон - {user.phone_number}</h2>
        <h3>Усі пости:</h3>
        <PostList posts={user.posts} />
      </div>
    </>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const response = await fetch(`http://127.0.0.1:8000/users/${id}`);
  const user = await response.json();
  return {
    props: { user },
  };
}
