import Link from "next/link";

export default function PostListElement({ post }) {
  return (
    <Link href="/posts/[id]" as={`/posts/${post.id}`}>
      <a class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <h3 class="mb-1">{post.full_name}</h3>
          <small>{post.last_place}</small>
        </div>
        <p class="mb-1">{post.description}</p>
        <p>
          <Link href="/user/[id]/" as={`/user/${post.owner_id}`}>
            <a>Сторінка</a>
          </Link>{" "}
          автора
        </p>
      </a>
    </Link>
  );
}
