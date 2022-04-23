import Link from "next/link";

export default function RegLogin() {
  return (
    <>
      <li className="nav-item">
        <Link href="/login">
          <a className="btn btn-outline-success" role="button">
            Створити об'яву
          </a>
        </Link>
      </li>
    </>
  );
}
