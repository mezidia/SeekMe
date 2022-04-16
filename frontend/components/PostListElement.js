import Link from "next/link";

export default function PostListElement({ post }) {
  return (
    <li>
      <Link href={`/posts/${post.id}`}>
        <a>{post.full_name}</a>
      </Link>
      .{" "}
      <Link href={`/user/${post.owner_id}`}>
        <a>Author</a>
      </Link>
    </li>
  );
}
