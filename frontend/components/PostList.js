import PostListElement from "./PostListElement";

export default function PostList({ posts }) {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 pt-2">
      {posts.map((post) => (
        <PostListElement post={post} key={post.id} />
      ))}
    </div>
  );
}
