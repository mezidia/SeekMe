import Head from "next/head";
import Image from "next/image";

export default function Home({ posts }) {
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.id}. {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await data.json();
  return {
    props: {
      posts,
    },
  };
}
