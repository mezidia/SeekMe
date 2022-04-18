import Link from "next/link";

export default function MainPage() {
  return (
    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light">ЗнайдиМене</h1>
          <p className="lead text-muted">
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks don’t simply skip over it entirely.
          </p>
          <p>
            <Link href="/register">
              <a className="btn btn-primary btn-lg my-2 me-2">
                Зареєструватись
              </a>
            </Link>
            <Link href="/login">
              <a className="btn btn-secondary btn-lg my-2">Увійти</a>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
