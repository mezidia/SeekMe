import { useRef } from "react";
import { useRouter } from "next/router";

export default function Form() {
  const router = useRouter();
  const searchRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const search = searchRef.current.value;
    router.push(`/posts/search/${search}`);
  };

  return (
    <form className="d-flex">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Напишіть ім'я людини, місце або опис"
        aria-label="Search"
        ref={searchRef}
      />
      <button
        className="btn btn-outline-success"
        onClick={handleSubmit}
        type="submit"
      >
        Знайти
      </button>
    </form>
  );
}
