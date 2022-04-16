import PostList from "../../components/PostList";

export default function Posts({ posts }) {
  return (
    <div>
      <PostList posts={posts} />
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
