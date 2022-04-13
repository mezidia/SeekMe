import Link from "next/link";

export default function Home({ posts }) {
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.id}. {post.title}, Author:{" "}
            <Link href={`/user/${post.userId}`}>
              <a>Author posts</a>
            </Link>
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
