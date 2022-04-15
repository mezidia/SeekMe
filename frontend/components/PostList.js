import PostListElement from "./PostListElement";

export default function PostList({ posts }) {
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <PostListElement post={post} key={post.id} />
        ))}
      </ul>
    </div>
  );
}
