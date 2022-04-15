import PostList from "../../components/PostList";

export default function Home({ user }) {
  return (
    <div>
      <h1>Posts from user with {user.name}</h1>
      <h2>His email - {user.email}</h2>
      <h2>His phone - {user.phone_number}</h2>
      <h3>His posts:</h3>
      <PostList posts={user.posts} />
    </div>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const response = await fetch(`http://127.0.0.1:8000/users/${id}`);
  const user = await response.json();
  return {
    props: { user },
  };
}
