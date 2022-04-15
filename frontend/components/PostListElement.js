import Link from "next/link";

export default function PostListElement({ post }) {
  return (
    <li>
      {post.description}.{" "}
      <Link href={`/user/${post.owner_id}`}>
        <a>Author</a>
      </Link>
    </li>
  );
}
