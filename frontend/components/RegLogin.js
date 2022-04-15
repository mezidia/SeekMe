import Link from "next/link";

export default function RegLogin() {
  return (
    <>
      <li className="nav-item">
        <Link href="/register">
          <a className="nav-link" aria-current="page">
            Реєстрація
          </a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/login">
          <a className="nav-link" aria-current="page">
            Вхід
          </a>
        </Link>
      </li>
    </>
  );
}
