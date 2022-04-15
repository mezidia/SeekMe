import Link from "next/link";

export default function Home({ posts }) {
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.id}. {post.full_name}, Author:{" "}
            <Link href={`/user/${post.owner_id}`}>
              <a>Author posts</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
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
