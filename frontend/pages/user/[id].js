export default function Home({ posts, id }) {
  return (
    <div>
      <h1>Posts from user with id: {id}</h1>
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

export async function getServerSideProps({ params: { id } }) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${id}`
  );
  const posts = await response.json();
  return {
    props: { posts, id },
  };
}
