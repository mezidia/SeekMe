import { useEffect, useState } from "react";

import PostListElement from "./PostListElement";

export default function PostList({ posts }) {
  const [paginatedPosts, setPaginatedPosts] = useState(posts);
  const [page, setPage] = useState(1);

  const postsPerPage = 10;

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    const handlePagination = () => {
      const indexOfLastPost = page * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
      setPaginatedPosts(currentPosts);
    };
    handlePagination();
  }, [page]);

  return (
    <>
      <p className="pt-3 fw-bold">
        <span>
          Усього відображено{" "}
          {postsPerPage * page <= posts.length
            ? postsPerPage * page
            : posts.length}
          {" об'яв(а)"} з {posts.length}
        </span>
        <span className="ps-4">
          {page > 1 ? (
            <button
              className="btn btn-primary me-2"
              onClick={() => handlePageChange(page - 1)}
            >
              &larr; Попередня сторінка
            </button>
          ) : null}
          {postsPerPage * page <= posts.length ? (
            <button
              className="btn btn-primary"
              onClick={() => handlePageChange(page + 1)}
            >
              Наступна сторінка &rarr;
            </button>
          ) : null}
        </span>
      </p>
      <div className="list-group list-group-flush">
        {paginatedPosts.map((post) => (
          <PostListElement post={post} key={post.id} />
        ))}
      </div>
    </>
  );
}
